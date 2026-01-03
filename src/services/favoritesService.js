import { supabase } from '../lib/supabase';

export const favoritesService = {
  // Get all favorites for the current user
  async getUserFavorites() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          console.warn('user_favorites table does not exist');
          return [];
        }
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },

  // Check if an item is favorited
  async isFavorited(itemType, itemId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return false; // Not favorited
        }
        if (error.code === '42P01') {
          return false;
        }
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  },

  // Add a favorite
  async addFavorite(itemType, itemId, itemName, itemPath, itemIcon = null) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          item_type: itemType,
          item_id: itemId,
          item_name: itemName,
          item_path: itemPath,
          item_icon: itemIcon,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  // Remove a favorite
  async removeFavorite(itemType, itemId) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  },

  // Toggle favorite (add if not favorited, remove if favorited)
  async toggleFavorite(itemType, itemId, itemName, itemPath, itemIcon = null) {
    const isFav = await this.isFavorited(itemType, itemId);
    if (isFav) {
      return await this.removeFavorite(itemType, itemId);
    } else {
      return await this.addFavorite(itemType, itemId, itemName, itemPath, itemIcon);
    }
  },
};

