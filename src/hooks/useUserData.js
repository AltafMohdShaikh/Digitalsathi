import { useState, useEffect } from 'react';
import { useUserRole } from './useUserRole';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useUserData = () => {
  const { user, userRole, isAdmin, loading } = useUserRole();
  const [userData, setUserData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'Users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
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
    return userData?.UserName || user?.displayName || user?.email?.split('@')[0] || 'User';
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