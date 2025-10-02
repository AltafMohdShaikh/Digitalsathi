import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { getBlogs } from '../services/databaseService';
import '../styles/colors.css';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await getBlogs();
      if (error) throw error;
      const foundBlog = data?.find(b => b.id === parseInt(id));
      setBlog(foundBlog);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="px-6 bg-[var(--color-background)] min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="px-6 bg-[var(--color-background)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-text-secondary)] mb-4">Blog not found</p>
          <Link to="/blog" className="text-[var(--color-primary)] hover:underline">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        {/* Back Button */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Blogs
        </Link>

        {/* Blog Header */}
        <article className="bg-[var(--color-card)] rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-secondary)] mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[var(--color-primary)]" />
                <span>
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-[var(--color-primary)]" />
                <span>{blog.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-[var(--color-primary)]" />
                <span className="bg-[var(--color-primary)] text-white px-2 py-1 rounded-full text-xs">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed border-l-4 border-[var(--color-primary)] pl-4 italic">
                {blog.excerpt}
              </p>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-[var(--color-text)] leading-relaxed whitespace-pre-wrap"
                style={{ 
                  lineHeight: '1.8',
                  fontSize: '16px'
                }}
              >
                {blog.content}
              </div>
            </div>
          </div>
        </article>

        {/* Author Info */}
        <div className="mt-8 bg-[var(--color-card)] rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-semibold text-lg">
              {blog.author_name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">{blog.author_name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}