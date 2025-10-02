import { supabase } from '../config/supabase';

// Add user to Firestore when they register
export const createUserDocument = async (user, customUsername = null) => {
  if (!user) return;
  
  try {
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    // If user doesn't exist, create them
    if (selectError && selectError.code === 'PGRST116') {
      const adminEmails = ['altafmohdshaikh@gmail.com', 'admin@digitalsathi.com'];
      const userData = {
        id: user.id,
        email: user.email,
        username: customUsername || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        role: adminEmails.includes(user.email) ? 'Admin' : 'Visitor',
        created_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase.from('users').insert([userData]).select();
      if (error) throw error;
      console.log('User created:', data[0]);
      return data[0];
    }
    
    if (selectError) throw selectError;
    return existingUser;
  } catch (error) {
    console.error('Error in createUserDocument:', error);
    throw error;
  }
};

// Get user role from Firestore
export const getUserRole = async (userId) => {
  if (!userId) return 'Visitor';
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data?.role || 'Visitor';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'Visitor';
  }
};