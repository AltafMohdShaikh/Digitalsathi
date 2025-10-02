import { supabase } from '../config/supabase'

// Videos operations
export const addVideo = async (videoData) => {
  const { data, error } = await supabase
    .from('videos')
    .insert([videoData])
    .select()
  
  return { data, error }
}

export const getVideos = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const deleteVideo = async (id) => {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id)
  
  return { error }
}

// Blog operations
export const addBlog = async (blogData) => {
  const { data, error } = await supabase
    .from('blogs')
    .insert([blogData])
    .select()
  
  return { data, error }
}

export const getBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Pending blog operations
export const addPendingBlog = async (blogData) => {
  const { data, error } = await supabase
    .from('pending_blogs')
    .insert([blogData])
    .select()
  
  return { data, error }
}

export const getPendingBlogs = async () => {
  const { data, error } = await supabase
    .from('pending_blogs')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const approveBlog = async (pendingBlogId) => {
  // Get pending blog
  const { data: pendingBlog, error: fetchError } = await supabase
    .from('pending_blogs')
    .select('*')
    .eq('id', pendingBlogId)
    .single()
  
  if (fetchError) return { error: fetchError }
  
  // Add to blogs table
  const { data: newBlog, error: insertError } = await supabase
    .from('blogs')
    .insert([{
      title: pendingBlog.title,
      excerpt: pendingBlog.excerpt,
      content: pendingBlog.content,
      category: pendingBlog.category,
      author_id: pendingBlog.author_id,
      author_name: pendingBlog.author_name
    }])
    .select()
  
  if (insertError) return { error: insertError }
  
  // Delete from pending_blogs
  const { error: deleteError } = await supabase
    .from('pending_blogs')
    .delete()
    .eq('id', pendingBlogId)
  
  return { data: newBlog, error: deleteError }
}

export const rejectBlog = async (pendingBlogId) => {
  const { error } = await supabase
    .from('pending_blogs')
    .delete()
    .eq('id', pendingBlogId)
  
  return { error }
}

// Event operations
export const addEvent = async (eventData) => {
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select()
  
  return { data, error }
}

export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
  
  return { data, error }
}

export const deleteEvent = async (id) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  
  return { error }
}

// Scheme operations
export const addScheme = async (schemeData) => {
  const { data, error } = await supabase
    .from('schemes')
    .insert([schemeData])
    .select()
  
  return { data, error }
}

export const getSchemes = async () => {
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const deleteScheme = async (id) => {
  const { error } = await supabase
    .from('schemes')
    .delete()
    .eq('id', id)
  
  return { error }
}

// User management operations
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const updateUserRole = async (userId, newRole) => {
  // Check if user is super admin
  const { data: user } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId)
    .single()
  
  if (user?.email === 'altafmohdshaikh@gmail.com') {
    return { error: { message: 'Cannot change super admin role' } }
  }
  
  const { data, error } = await supabase
    .from('users')
    .update({ role: newRole })
    .eq('id', userId)
    .select()
  
  return { data, error }
}

export const deleteUser = async (userId) => {
  // Check if user is super admin
  const { data: user } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId)
    .single()
  
  if (user?.email === 'altafmohdshaikh@gmail.com') {
    return { error: { message: 'Cannot delete super admin' } }
  }
  
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)
  
  return { error }
}

// Storage operations
export const uploadImage = async (file, bucket = 'images') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)
  
  if (error) return { error }
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)
  
  return { data: { ...data, publicUrl }, error: null }
}