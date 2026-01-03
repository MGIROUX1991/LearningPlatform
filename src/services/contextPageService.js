import { supabase } from '../lib/supabase';

export const contextPageService = {
  // Get all context pages (with optional filters)
  async getAll(filters = {}) {
    try {
      let query = supabase
        .from('context_pages')
        .select('*')
        .order('title', { ascending: true });

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.subject_id) {
        query = query.eq('subject_id', filters.subject_id);
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.contains('tags', filters.tags);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        // If table doesn't exist, return empty array
        if (error.code === '42P01') {
          console.warn('context_pages table does not exist');
          return [];
        }
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching context pages:', error);
      return [];
    }
  },

  // Get a single context page by slug
  async getBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('context_pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        if (error.code === '42P01') {
          console.warn('context_pages table does not exist');
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching context page:', error);
      return null;
    }
  },

  // Get a single context page by ID
  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('context_pages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        if (error.code === '42P01') {
          console.warn('context_pages table does not exist');
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching context page:', error);
      return null;
    }
  },

  // Get related pages
  async getRelated(pageId) {
    try {
      const page = await this.getById(pageId);
      if (!page || !page.related_pages || page.related_pages.length === 0) {
        return [];
      }

      const { data, error } = await supabase
        .from('context_pages')
        .select('id, title, slug, category, summary')
        .in('id', page.related_pages);

      if (error) {
        if (error.code === '42P01') {
          return [];
        }
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching related pages:', error);
      return [];
    }
  },

  // Create a new context page (admin only)
  async create(pageData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('context_pages')
      .insert({
        ...pageData,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a context page (admin only)
  async update(id, updates) {
    const { data, error } = await supabase
      .from('context_pages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a context page (admin only)
  async delete(id) {
    const { error } = await supabase
      .from('context_pages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

