import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Load data when user changes
  useEffect(() => {
    if (user && profile) {
      loadAllData();
    } else {
      setProgress({});
      setAchievements([]);
      setDailyQuests([]);
      setLoading(false);
    }
  }, [user, profile]);

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
    if (!user) return;

    try {
      setLoading(true);

      // Load progress for all subjects
      const allProgress = await progressService.getAllProgress(user.id);
      setProgress(allProgress);

      // Load achievements
      const userAchievements = await achievementService.getAchievements(user.id);
      setAchievements(userAchievements);

      // Load daily quests
      const quests = await questService.getDailyQuests(user.id);
      setDailyQuests(quests);
    } catch (error) {
      console.error('Error loading data:', error);
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
      setProgress((prev) => ({
        ...prev,
        [subject]: {
          ...prev[subject],
          completedChapters: [...(prev[subject]?.completedChapters || []), chapterId],
          unlockedChapters: updatedProgress?.unlocked_chapters || prev[subject]?.unlockedChapters || [],
        },
      }));
    } catch (error) {
      console.error('Error completing chapter:', error);
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
