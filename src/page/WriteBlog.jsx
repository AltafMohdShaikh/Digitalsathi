import React, { useState } from "react";
import "../styles/colors.css";
import { Save, Eye, ArrowLeft, Image, Bold, Italic, List } from "lucide-react";
import { Link } from "react-router-dom";

export default function WriteBlog() {
  const [blogData, setBlogData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Digital Literacy"
  });

  const categories = [
    "Digital Literacy",
    "Digital Payments", 
    "Government Services",
    "Digital Safety",
    "Government Schemes",
    "Technology"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle blog submission
    console.log("Blog submitted:", blogData);
  };

  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/blog"
              className="p-2 hover:bg-[var(--color-hover-light)] rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-[var(--color-text)]" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">Write New Blog</h1>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">Share your knowledge with the community</p>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <button className="flex items-center gap-2 px-3 py-2 sm:px-4 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-hover-light)] transition-colors text-[var(--color-text)] text-sm sm:text-base">
              <Eye size={16} />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 sm:px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              <Save size={16} />
              <span className="hidden sm:inline">Publish</span>
            </button>
          </div>
        </div>

        {/* Blog Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="pb-4 border-b border-[var(--color-border)]">
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleInputChange}
              placeholder="Enter your blog title..."
              className="w-full text-2xl sm:text-4xl font-bold bg-transparent border-none outline-none text-[var(--color-text)] placeholder-[var(--color-text-secondary)] py-4 min-h-[60px]"
              required
            />
          </div>

          {/* Category and Excerpt */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Category</label>
              <select
                name="category"
                value={blogData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Excerpt</label>
              <input
                type="text"
                name="excerpt"
                value={blogData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description..."
                className="w-full px-4 py-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
                required
              />
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2 p-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg">
            <button type="button" className="p-2 hover:bg-[var(--color-hover-light)] rounded transition-colors">
              <Bold size={16} className="text-[var(--color-text)]" />
            </button>
            <button type="button" className="p-2 hover:bg-[var(--color-hover-light)] rounded transition-colors">
              <Italic size={16} className="text-[var(--color-text)]" />
            </button>
            <button type="button" className="p-2 hover:bg-[var(--color-hover-light)] rounded transition-colors">
              <List size={16} className="text-[var(--color-text)]" />
            </button>
            <div className="w-px h-6 bg-[var(--color-border)] mx-2"></div>
            <button type="button" className="p-2 hover:bg-[var(--color-hover-light)] rounded transition-colors">
              <Image size={16} className="text-[var(--color-text)]" />
            </button>
          </div>

          {/* Content */}
          <div>
            <textarea
              name="content"
              value={blogData.content}
              onChange={handleInputChange}
              placeholder="Start writing your blog content here..."
              rows={20}
              className="w-full px-4 py-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)] resize-none leading-relaxed"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}