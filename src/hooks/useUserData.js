import { useState, useEffect } from 'react';
import { useUserRole } from './useUserRole';
import { supabase } from '../config/supabase';

export const useUserData = () => {
  const { user, userRole, isAdmin, loading } = useUserRole();
  const [userData, setUserData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setDataLoading(false);
    };

    if (!loading && user) {
      fetchUserData();
    } else if (!loading) {
      setDataLoading(false);
    }
  }, [user, loading]);

  const getDisplayName = () => {
    return userData?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return {
    user,
    userData,
    userRole,
    isAdmin,
    loading: loading || dataLoading,
    getDisplayName,
    getInitials
  };
};