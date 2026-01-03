import { supabase } from '../lib/supabase';

export const adminService = {
  async checkIsAdmin(userId) {
    try {
      console.log('Checking admin status for user:', userId);
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, role')
        .eq('id', userId)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors

      if (error) {
        console.error('Error checking admin status:', error);
        // If table doesn't exist, return false
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          console.warn('admin_users table does not exist. Please run migration 003_admin_and_content.sql');
          return false;
        }
        return false;
      }

      const isAdmin = !!data;
      console.log('Admin check result:', isAdmin, data);
      return isAdmin;
    } catch (error) {
      console.error('Error in checkIsAdmin:', error);
      return false;
    }
  },

  async addAdmin(userId, email) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          id: userId,
          email: email,
          role: 'admin',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding admin:', error);
      throw error;
    }
  },
};

export const lessonService = {
  async getLessons(subjectId, chapterId = null, filters = {}) {
    try {
      let query = supabase
        .from('lessons')
        .select('*')
        .eq('subject_id', subjectId)
        .order('lesson_number', { ascending: true });

      if (chapterId) {
        query = query.eq('chapter_id', chapterId);
      }

      // Filter by school year if provided
      if (filters.school_year) {
        query = query.eq('school_year', filters.school_year);
      }

      // Filter by competencies if provided
      if (filters.competencies && filters.competencies.length > 0) {
        query = query.overlaps('competencies', filters.competencies);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error getting lessons:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getLessons:', error);
      return [];
    }
  },

  async getLesson(lessonId) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error getting lesson:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getLesson:', error);
      return null;
    }
  },

  async createLesson(lessonData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('lessons')
        .insert({
          ...lessonData,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw error;
    }
  },

  async updateLesson(lessonId, updates) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', lessonId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  },

  async deleteLesson(lessonId) {
    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  },
};

