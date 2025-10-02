import { createClient } from '@supabase/supabase-js'
import { GoogleGenerativeAI } from '@google/generative-ai'

const supabaseUrl = 'https://pbnjejkadubucjbrlizz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBibmplamthZHVidWNqYnJsaXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MzY3MDAsImV4cCI6MjA3NDUxMjcwMH0.lGgyJ8UOOe-2hsUKTeIdueNkD2BklD1ZOSgGLNUX-mI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// AI model for chatbot
const genAI = new GoogleGenerativeAI('AIzaSyAL6t0diHpbGRoKDE21amjR4ft4d6MUISc')
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' })