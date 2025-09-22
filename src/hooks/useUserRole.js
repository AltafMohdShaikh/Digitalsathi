import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { createUserDocument, getUserRole } from '../services/userService';

export const useUserRole = () => {
  const [user, loading] = useAuthState(auth);
  const [userRole, setUserRole] = useState('Visitor');
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const handleUserRole = async () => {
      console.log('handleUserRole called, user:', user?.email, 'loading:', loading);
      
      if (user) {
        try {
          console.log('User authenticated:', user.email);
          
          // Check for pending username from registration
          const pendingUsername = localStorage.getItem('pendingUsername');
          console.log('Pending username:', pendingUsername);
          
          // Create user document if doesn't exist
          await createUserDocument(user, pendingUsername);
          
          // Clear pending username
          if (pendingUsername) {
            localStorage.removeItem('pendingUsername');
          }
          
          // Get user role
          const role = await getUserRole(user.uid);
          console.log('User role determined:', role);
          setUserRole(role);
        } catch (error) {
          console.error('Error handling user role:', error);
          setUserRole('Visitor');
        }
      } else {
        console.log('No user authenticated');
        setUserRole('Visitor');
      }
      setRoleLoading(false);
    };

    if (!loading) {
      handleUserRole();
    }
  }, [user, loading]);

  return {
    user,
    userRole,
    loading: loading || roleLoading,
    isAdmin: userRole === 'Admin',
    isVisitor: userRole === 'Visitor'
  };
};