import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSupabase } from './SupabaseContext';
import { progressService, achievementService, questService } from '../services/dataService';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const XP_PER_LEVEL = 500;

export const AppProvider = ({ children }) => {
  const { user, profile, addXP: supabaseAddXP, updateStreak: supabaseUpdateStreak, XP_PER_LEVEL: supabaseXPPerLevel } = useSupabase();
  const [progress, setProgress] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [dailyQuests, setDailyQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastLoadedUserIdRef = useRef(null);

  // Load data when user changes (but only if user ID actually changed)
  useEffect(() => {
    const currentUserId = user?.id || (user && typeof user === 'string' ? user : null);
    const profileId = profile?.id || null;
    
    if (user && profile && currentUserId) {
      // Only reload if this is a different user or we don't have data yet
      const hasData = Object.keys(progress).length > 0 || achievements.length > 0 || dailyQuests.length > 0;
      const userIdChanged = lastLoadedUserIdRef.current !== currentUserId;
      
      // Only reload if we don't have data or if the user ID changed
      if (!hasData || userIdChanged) {
        lastLoadedUserIdRef.current = currentUserId;
        loadAllData();
      } else {
        // We already have data for this user, just ensure loading is false
        setLoading(false);
      }
    } else if (!user) {
      // User logged out - clear data
      lastLoadedUserIdRef.current = null;
      setProgress({});
      setAchievements([]);
      setDailyQuests([]);
      setLoading(false);
    }
    // Note: We intentionally don't include progress, achievements, dailyQuests in deps
    // to avoid infinite loops. We only want to reload when user/profile changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, profile?.id]);

  // Fallback: if loading takes too long, stop loading anyway
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('AppContext loading timeout - stopping load state');
        setLoading(false);
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  const loadAllData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Get user ID from Supabase auth user object
    const userId = user.id;
    if (!userId) {
      console.warn('Cannot load data: no user ID', user);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Load all data in parallel for better performance
      const [allProgress, userAchievements, quests] = await Promise.allSettled([
        progressService.getAllProgress(userId),
        achievementService.getAchievements(userId),
        questService.getDailyQuests(userId),
      ]);

      // Set progress
      if (allProgress.status === 'fulfilled') {
        setProgress(allProgress.value);
      } else {
        console.error('Error loading progress:', allProgress.reason);
        setProgress({});
      }

      // Set achievements
      if (userAchievements.status === 'fulfilled') {
        setAchievements(userAchievements.value);
      } else {
        console.error('Error loading achievements:', userAchievements.reason);
        setAchievements([]);
      }

      // Set daily quests
      if (quests.status === 'fulfilled') {
        setDailyQuests(quests.value);
      } else {
        console.error('Error loading quests:', quests.reason);
        setDailyQuests([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Don't clear existing data on error - keep what we have
    } finally {
      setLoading(false);
    }
  };

  const addXP = async (amount) => {
    if (supabaseAddXP) {
      await supabaseAddXP(amount);
    }
  };

  const updateStreak = async () => {
    if (supabaseUpdateStreak) {
      await supabaseUpdateStreak();
    }
  };

  const completeQuest = async (questId) => {
    if (!user) return;

    try {
      const quest = dailyQuests.find((q) => q.id === questId);
      if (quest && !quest.completed) {
        await questService.completeQuest(user.id, questId);
        setDailyQuests((prev) =>
          prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
        );
        // Award XP
        await addXP(quest.xp);
      }
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  };

  const unlockAchievement = async (achievement) => {
    if (!user) return;

    try {
      // Check if already unlocked
      if (achievements.find((a) => a.id === achievement.id)) {
        return;
      }

      await achievementService.unlockAchievement(user.id, achievement);
      setAchievements((prev) => [...prev, achievement]);
      await addXP(achievement.xp || 100);
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  const completeChapter = async (subject, chapterId) => {
    if (!user) return;

    try {
      const updatedProgress = await progressService.completeChapter(user.id, subject, chapterId);
      
      // Reload all progress to ensure we have the latest data
      const allProgress = await progressService.getAllProgress(user.id);
      setProgress(allProgress);
      
      return updatedProgress;
    } catch (error) {
      console.error('Error completing chapter:', error);
      throw error;
    }
  };

  const completeLesson = async (subject, lessonId) => {
    if (!user) return;

    try {
      await progressService.completeLesson(user.id, subject, lessonId);
      setProgress((prev) => ({
        ...prev,
        [subject]: {
          ...prev[subject],
          completedLessons: {
            ...(prev[subject]?.completedLessons || {}),
            [lessonId]: true,
          },
        },
      }));
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const unlockSkill = async (subject, skillId) => {
    if (!user) return;

    try {
      await progressService.unlockSkill(user.id, subject, skillId);
      setProgress((prev) => ({
        ...prev,
        [subject]: {
          ...prev[subject],
          unlockedSkills: [...(prev[subject]?.unlockedSkills || []), skillId],
        },
      }));
    } catch (error) {
      console.error('Error unlocking skill:', error);
    }
  };

  // Format user data for components
  const userData = profile
    ? {
        name: profile.name,
        level: profile.level,
        xp: profile.xp,
        streak: profile.streak,
        lastActivityDate: profile.last_activity_date,
        achievements: achievements,
      }
    : null;

  const value = {
    user: userData,
    profile,
    progress,
    dailyQuests,
    addXP,
    updateStreak,
    completeQuest,
    unlockAchievement,
    completeChapter,
    completeLesson,
    unlockSkill,
    XP_PER_LEVEL: supabaseXPPerLevel || XP_PER_LEVEL,
    loading,
    isAuthenticated: !!user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
