import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSupabase } from './SupabaseContext';
import { adminService } from '../services/adminService';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const { user } = useSupabase();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log('AdminContext: Checking admin status for user:', user.id, user.email);
        const adminStatus = await adminService.checkIsAdmin(user.id);
        console.log('AdminContext: Admin status result:', adminStatus);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Add a refresh function that can be called manually
  const refreshAdminStatus = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const adminStatus = await adminService.checkIsAdmin(user.id);
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error('Error refreshing admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAdmin,
    loading,
    refreshAdminStatus: async () => {
      if (!user) return;
      setLoading(true);
      try {
        const adminStatus = await adminService.checkIsAdmin(user.id);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Error refreshing admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    },
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

