-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE,
  username TEXT,
  role TEXT DEFAULT 'Visitor',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create videos table
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  video_url TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Digital Literacy',
  author_id UUID REFERENCES users(id),
  author_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create pending_blogs table for admin approval
CREATE TABLE pending_blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Digital Literacy',
  author_id UUID REFERENCES users(id),
  author_name TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location TEXT,
  category TEXT DEFAULT 'Digital Literacy',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create schemes table
CREATE TABLE schemes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  eligibility TEXT,
  benefits TEXT,
  application_url TEXT,
  category TEXT DEFAULT 'Government Scheme',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own data" ON users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users 
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for videos table
CREATE POLICY "Videos are viewable by everyone" ON videos 
  FOR SELECT TO authenticated;

CREATE POLICY "Only admins can insert videos" ON videos 
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
  );

CREATE POLICY "Only admins can delete videos" ON videos 
  FOR DELETE TO authenticated USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
  );

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Create policy for storage
CREATE POLICY "Anyone can view images" ON storage.objects 
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Create policies for blogs table
CREATE POLICY "Blogs are viewable by everyone" ON blogs 
  FOR SELECT TO anon, authenticated;

CREATE POLICY "Authenticated users can create blogs" ON blogs 
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authors can update own blogs" ON blogs 
  FOR UPDATE TO authenticated USING (auth.uid() = author_id);