import React, { useState, useEffect } from "react";
import "../styles/colors.css";
import { PenTool, Calendar, User, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogs } from '../services/databaseService';

const BlogCard = ({ blog }) => {
  return (
    <div className="relative bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[var(--color-border)] group cursor-pointer">
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] to-purple-500"></div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-[var(--color-primary)]" />
            <span>{blog.date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <User size={14} className="text-[var(--color-primary)]" />
            <span>{blog.author}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-xl mb-4 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-tight">
          {blog.title}
        </h3>
        
        <p className="text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
            <Eye size={14} />
            <span>{blog.views} views</span>
          </div>
          
        </div>
        
        <Link to={`/blog/${blog.id}`}>
          <button className="w-full bg-gradient-to-r from-[var(--color-primary)] to-purple-500 hover:from-[var(--color-primary-dark)] hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg transform hover:scale-105">
            Read More
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await getBlogs();
      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <section className="py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Blog</h1>
            <p className="text-[var(--color-text-secondary)]">
              Latest articles and guides on digital literacy
            </p>
          </div>
          
          <Link to="/write-blog">
            <button className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
              <PenTool size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Write Blog</span>
              <span className="sm:hidden">Write</span>
            </button>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-[var(--color-text-secondary)]">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[var(--color-text-secondary)]">No blogs available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={{
                ...blog,
                date: new Date(blog.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                }),
                author: blog.author_name,
                views: '0'
              }} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}