import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Add user to Firestore when they register
export const createUserDocument = async (user, customUsername = null) => {
  if (!user) {
    console.log('No user provided to createUserDocument');
    return;
  }
  
  try {
    console.log('Creating user document for:', user.email);
    const userRef = doc(db, 'Users', user.uid);
    const userSnap = await getDoc(userRef);
    
    // Only create if user doesn't exist
    if (!userSnap.exists()) {
      const userData = {
        Email: user.email,
        UserName: customUsername || user.displayName || user.email?.split('@')[0] || 'User',
        Role: user.email === 'altafmohdshaikh@gmail.com' ? 'Admin' : 'Visitor',
        createdAt: new Date().toISOString(),
        uid: user.uid
      };
      
      console.log('Creating new user document:', userData);
      await setDoc(userRef, userData);
      console.log('User document created successfully');
      return userData;
    } else {
      console.log('User document already exists:', userSnap.data());
    }
    
    return userSnap.data();
  } catch (error) {
    console.error('Error in createUserDocument:', error);
    throw error;
  }
};

// Get user role from Firestore
export const getUserRole = async (userId) => {
  if (!userId) {
    console.log('No userId provided to getUserRole');
    return 'Visitor';
  }
  
  try {
    console.log('Getting user role for:', userId);
    const userRef = doc(db, 'Users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log('User data found:', userData);
      return userData.Role || 'Visitor';
    } else {
      console.log('No user document found for:', userId);
    }
    return 'Visitor';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'Visitor';
  }
};