import { supabase } from '../lib/supabase';

// Progress data service
export const progressService = {
  async getProgress(userId, subjectId) {
    const { data, error } = await supabase
      .from('subject_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('subject_id', subjectId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error getting progress:', error);
      return null;
    }

    // Return default progress structure
    const defaultProgress = {
      subject_id: subjectId,
      completed_chapters: [],
      completed_lessons: {},
      unlocked_chapters: subjectId === 'history' ? ['chapter1'] : [],
      unlocked_skills: subjectId === 'math' ? ['algebra-basics'] : [],
      completed_skills: [],
      practice_problems: {},
    };
    
    // If no data exists, ensure we have the default structure
    if (!data) {
      return defaultProgress;
    }
    
    // Ensure unlocked_chapters exists and includes chapter1 for history
    if (subjectId === 'history' && (!data.unlocked_chapters || data.unlocked_chapters.length === 0)) {
      data.unlocked_chapters = ['chapter1'];
    }
    
    return data;
  },

  async getAllProgress(userId) {
    try {
      const { data, error } = await supabase
        .from('subject_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        // If table doesn't exist, return empty object
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          console.warn('subject_progress table may not exist. Please run database migrations.');
          return {};
        }
        console.error('Error getting all progress:', error);
        return {};
      }

      const progressMap = {};
      if (data) {
        data.forEach((item) => {
          // Ensure unlocked_chapters is properly initialized for history
          let unlockedChapters = item.unlocked_chapters || [];
          if (item.subject_id === 'history') {
            if (unlockedChapters.length === 0) {
              unlockedChapters = ['chapter1'];
            } else if (!unlockedChapters.includes('chapter1')) {
              unlockedChapters = ['chapter1', ...unlockedChapters.filter(c => c !== 'chapter1')];
            }
          }
          
          progressMap[item.subject_id] = {
            completedChapters: item.completed_chapters || [],
            completedLessons: item.completed_lessons || {},
            unlockedChapters: unlockedChapters,
            unlockedSkills: item.unlocked_skills || [],
            completedSkills: item.completed_skills || [],
            practiceProblems: item.practice_problems || {},
          };
        });
      }

      return progressMap;
    } catch (error) {
      console.error('Error in getAllProgress:', error);
      return {};
    }
  },

  async updateProgress(userId, subjectId, updates) {
    // Prepare the data - don't include updated_at as trigger handles it
    const progressData = {
      user_id: userId,
      subject_id: subjectId,
      ...updates,
    };
    
    // Remove updated_at from progressData if it exists (trigger will handle it)
    delete progressData.updated_at;
    
    // Try to update first (most common case)
    const { data: updateData, error: updateError } = await supabase
      .from('subject_progress')
      .update(progressData)
      .eq('user_id', userId)
      .eq('subject_id', subjectId)
      .select()
      .single();

    // If update succeeded, return the data
    if (updateData && !updateError) {
      return updateData;
    }

    // If update failed because record doesn't exist (PGRST116), try insert
    if (updateError && updateError.code === 'PGRST116') {
      const { data: insertData, error: insertError } = await supabase
        .from('subject_progress')
        .insert(progressData)
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting progress:', insertError);
        throw insertError;
      }

      return insertData;
    }

    // If update failed for another reason, throw the error
    if (updateError) {
      console.error('Error updating progress:', updateError);
      throw updateError;
    }

    return updateData;
  },

  async completeChapter(userId, subjectId, chapterId) {
    const progress = await this.getProgress(userId, subjectId);
    
    // Ensure we don't duplicate completed chapters
    const completedChapters = progress.completed_chapters || [];
    if (completedChapters.includes(chapterId)) {
      // Already completed, return current progress
      return progress;
    }
    
    const newCompletedChapters = [...completedChapters, chapterId];
    
    // Unlock the next chapter
    const chapterOrder = ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'];
    const currentIndex = chapterOrder.indexOf(chapterId);
    const nextChapterId = currentIndex >= 0 && currentIndex < chapterOrder.length - 1 
      ? chapterOrder[currentIndex + 1] 
      : null;
    
    // Initialize unlocked_chapters properly
    let unlockedChapters = progress.unlocked_chapters || [];
    
    // For history, ensure chapter1 is always unlocked if no progress exists
    if (subjectId === 'history' && unlockedChapters.length === 0) {
      unlockedChapters = ['chapter1'];
    }
    
    // Add next chapter if it exists and isn't already unlocked
    if (nextChapterId && !unlockedChapters.includes(nextChapterId)) {
      unlockedChapters = [...unlockedChapters, nextChapterId];
    }

    const updated = await this.updateProgress(userId, subjectId, {
      completed_chapters: newCompletedChapters,
      unlocked_chapters: unlockedChapters,
    });
    
    return updated;
  },

  async completeLesson(userId, subjectId, lessonId) {
    const progress = await this.getProgress(userId, subjectId);
    const completedLessons = {
      ...(progress.completed_lessons || {}),
      [lessonId]: true,
    };

    return await this.updateProgress(userId, subjectId, {
      completed_lessons: completedLessons,
    });
  },

  async unlockSkill(userId, subjectId, skillId) {
    const progress = await this.getProgress(userId, subjectId);
    const unlockedSkills = [...(progress.unlocked_skills || []), skillId];

    return await this.updateProgress(userId, subjectId, {
      unlocked_skills: unlockedSkills,
    });
  },
};

// Achievements service
export const achievementService = {
  async getAchievements(userId) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userId)
        .order('unlocked_at', { ascending: false });

      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          console.warn('achievements table may not exist. Please run database migrations.');
          return [];
        }
        console.error('Error getting achievements:', error);
        return [];
      }

      return data ? data.map((a) => ({
        id: a.achievement_id,
        name: a.name,
        description: a.description,
        xp: a.xp_awarded,
        unlockedAt: a.unlocked_at,
      })) : [];
    } catch (error) {
      console.error('Error in getAchievements:', error);
      return [];
    }
  },

  async unlockAchievement(userId, achievement) {
    const { data, error } = await supabase
      .from('achievements')
      .insert({
        user_id: userId,
        achievement_id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        xp_awarded: achievement.xp || 100,
      })
      .select()
      .single();

    if (error && error.code !== '23505') {
      // 23505 = unique violation, achievement already unlocked
      console.error('Error unlocking achievement:', error);
      throw error;
    }

    return data;
  },
};

// Daily quests service
export const questService = {
  async getDailyQuests(userId, date = null) {
    try {
      const questDate = date || new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('daily_quests')
        .select('*')
        .eq('user_id', userId)
        .eq('quest_date', questDate)
        .order('quest_id', { ascending: true });

      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          console.warn('daily_quests table may not exist. Please run database migrations.');
          // Return default quests so app can continue
          return [
            { id: 1, title: 'Compléter une leçon', description: 'Terminez n\'importe quelle leçon', xp: 50, completed: false },
            { id: 2, title: 'Maintenir votre série', description: 'Connectez-vous aujourd\'hui', xp: 25, completed: false },
            { id: 3, title: 'Explorer l\'histoire', description: 'Lisez un chapitre d\'histoire', xp: 75, completed: false },
          ];
        }
        console.error('Error getting daily quests:', error);
        return [];
      }

      if (data && data.length === 0) {
        // Initialize quests for today
        try {
          await this.initializeQuests(userId, questDate);
          return await this.getDailyQuests(userId, questDate);
        } catch (initError) {
          console.error('Error initializing quests:', initError);
          // Return default quests
          return [
            { id: 1, title: 'Compléter une leçon', description: 'Terminez n\'importe quelle leçon', xp: 50, completed: false },
            { id: 2, title: 'Maintenir votre série', description: 'Connectez-vous aujourd\'hui', xp: 25, completed: false },
            { id: 3, title: 'Explorer l\'histoire', description: 'Lisez un chapitre d\'histoire', xp: 75, completed: false },
          ];
        }
      }

      return data ? data.map((q) => ({
        id: q.quest_id,
        title: q.title,
        description: q.description,
        xp: q.xp,
        completed: q.completed,
      })) : [];
    } catch (error) {
      console.error('Error in getDailyQuests:', error);
      // Return default quests so app can continue
      return [
        { id: 1, title: 'Compléter une leçon', description: 'Terminez n\'importe quelle leçon', xp: 50, completed: false },
        { id: 2, title: 'Maintenir votre série', description: 'Connectez-vous aujourd\'hui', xp: 25, completed: false },
        { id: 3, title: 'Explorer l\'histoire', description: 'Lisez un chapitre d\'histoire', xp: 75, completed: false },
      ];
    }
  },

  async initializeQuests(userId, date) {
    const defaultQuests = [
      { quest_id: 1, title: 'Compléter une leçon', description: 'Terminez n\'importe quelle leçon', xp: 50 },
      { quest_id: 2, title: 'Maintenir votre série', description: 'Connectez-vous aujourd\'hui', xp: 25 },
      { quest_id: 3, title: 'Explorer l\'histoire', description: 'Lisez un chapitre d\'histoire', xp: 75 },
    ];

    const quests = defaultQuests.map((q) => ({
      user_id: userId,
      quest_id: q.quest_id,
      title: q.title,
      description: q.description,
      xp: q.xp,
      completed: false,
      quest_date: date,
    }));

    const { error } = await supabase
      .from('daily_quests')
      .insert(quests);

    if (error) {
      console.error('Error initializing quests:', error);
      throw error;
    }
  },

  async completeQuest(userId, questId, date = null) {
    const questDate = date || new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_quests')
      .update({ completed: true })
      .eq('user_id', userId)
      .eq('quest_id', questId)
      .eq('quest_date', questDate)
      .select()
      .single();

    if (error) {
      console.error('Error completing quest:', error);
      throw error;
    }

    return data;
  },
};

