import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseContext = createContext();

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider');
  }
  return context;
};

const XP_PER_LEVEL = 500;

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session with error handling
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (!mounted) return;
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        setUser(session?.user ?? null);
        if (session?.user) {
          loadUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error in getSession:', error);
        if (mounted) {
          setLoading(false);
        }
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    // Timeout fallback - if loading takes more than 8 seconds, stop loading
    const timeout = setTimeout(() => {
      if (mounted) {
        console.warn('Supabase initialization timeout - continuing anyway');
        setLoading(false);
        // If we have a user but no profile, set default profile
        if (user && !profile) {
          setProfile({
            id: user.id,
            name: 'Étudiant',
            level: 1,
            xp: 0,
            streak: 0,
            last_activity_date: null,
          });
        }
        // If no user after timeout, ensure we're in logged-out state
        if (!user) {
          setUser(null);
          setProfile(null);
        }
      }
    }, 8000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (userId) => {
    try {
      // Try to load profile with a shorter timeout
      const profilePromise = supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Profile load timeout')), 3000)
      );

      let data, error;
      try {
        const result = await Promise.race([profilePromise, timeoutPromise]);
        data = result.data;
        error = result.error;
      } catch (raceError) {
        // If timeout, check if table exists, otherwise use default profile
        if (raceError.message === 'Profile load timeout') {
          console.warn('Profile load timed out - using default profile. Database tables may not exist.');
          // Set default profile immediately so app can continue
          setProfile({
            id: userId,
            name: 'Étudiant',
            level: 1,
            xp: 0,
            streak: 0,
            last_activity_date: null,
          });
          setLoading(false);
          return;
        }
        throw raceError;
      }

      if (error) {
        // PGRST116 = no rows returned, which is fine for new users
        if (error.code === 'PGRST116') {
          // No profile exists yet - will create below
        } else if (error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('relation')) {
          // Table doesn't exist - use default profile
          console.warn('user_profiles table does not exist. Using default profile. Please run database migrations.');
          setProfile({
            id: userId,
            name: 'Étudiant',
            level: 1,
            xp: 0,
            streak: 0,
            last_activity_date: null,
          });
          setLoading(false);
          return;
        } else {
          console.error('Error loading profile:', error);
          // For other errors, still use default profile so app can continue
          setProfile({
            id: userId,
            name: 'Étudiant',
            level: 1,
            xp: 0,
            streak: 0,
            last_activity_date: null,
          });
          setLoading(false);
          return;
        }
      }

      if (data) {
        setProfile(data);
      } else {
        // No profile exists - try to create one, but don't wait if it fails
        const defaultProfile = {
          id: userId,
          name: 'Étudiant',
          level: 1,
          xp: 0,
          streak: 0,
          last_activity_date: null,
        };

        // Set default profile immediately so app can continue
        setProfile(defaultProfile);
        setLoading(false);

        // Try to create in database in background (don't block)
        supabase
          .from('user_profiles')
          .insert(defaultProfile)
          .select()
          .single()
          .then(({ data: newProfile, error: createError }) => {
            if (!createError && newProfile) {
              setProfile(newProfile);
            } else if (createError) {
              console.warn('Could not create profile in database (table may not exist):', createError.message);
            }
          })
          .catch((err) => {
            console.warn('Profile creation failed (non-blocking):', err.message);
          });
        
        return; // Exit early, profile is set
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      // Set default profile so app can continue even if database fails
      setProfile({
        id: userId,
        name: 'Étudiant',
        level: 1,
        xp: 0,
        streak: 0,
        last_activity_date: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || 'Étudiant',
          },
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        // Provide more user-friendly error messages
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          throw new Error('Cet email est déjà enregistré. Essayez de vous connecter.');
        } else if (error.message.includes('password')) {
          throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
        } else if (error.message.includes('email')) {
          throw new Error('Veuillez entrer une adresse email valide.');
        }
        throw error;
      }
      
      // Ensure data exists before accessing its properties
      if (!data) {
        throw new Error('Erreur lors de la création du compte. Veuillez réessayer.');
      }
      
      // If session exists (email confirmation disabled), load profile
      // The database trigger should create the profile automatically, but we'll wait a bit
      // and then try to load it
      if (data.session && data.user) {
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 500));
        await loadUserProfile(data.user.id);
      }
      
      return data;
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        // Provide more user-friendly error messages
        if (error.message.includes('Invalid login credentials') || error.message.includes('invalid')) {
          throw new Error('Email ou mot de passe incorrect.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Veuillez confirmer votre email avant de vous connecter.');
        }
        throw error;
      }
      
      // Load profile after sign in
      if (data && data.session && data.user) {
        await loadUserProfile(data.user.id);
      }
      
      return data;
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setProfile(null);
    // Navigation will be handled by ProtectedRoute in App.jsx
  };

  const updateProfile = async (updates) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    setProfile(data);
    return data;
  };

  const addXP = async (amount) => {
    if (!profile) return;

    const newXP = profile.xp + amount;
    const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

    await updateProfile({
      xp: newXP,
      level: newLevel,
    });
  };

  const updateStreak = async () => {
    if (!profile) return;

    const today = new Date().toISOString().split('T')[0];
    const lastActivity = profile.last_activity_date;

    if (lastActivity === today) {
      return; // Already counted today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    if (lastActivity === yesterdayStr) {
      newStreak = profile.streak + 1;
    }

    await updateProfile({
      streak: newStreak,
      last_activity_date: today,
    });
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    addXP,
    updateStreak,
    XP_PER_LEVEL,
    supabase, // Export supabase for password reset
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

