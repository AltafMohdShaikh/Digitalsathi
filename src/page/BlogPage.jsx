import React from "react";
import "../styles/colors.css";
import { PenTool, Calendar, User, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
        
        <button className="w-full bg-gradient-to-r from-[var(--color-primary)] to-purple-500 hover:from-[var(--color-primary-dark)] hover:to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg transform hover:scale-105">
          Read More
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Digital Payments in India",
      excerpt: "Learn how to safely use UPI, digital wallets, and online banking for your daily transactions. A comprehensive guide for beginners.",
      author: "Digital Sathi Team",
      date: "Dec 15, 2024",
      views: "2.3K",
      category: "Digital Payments"
    },
    {
      id: 2,
      title: "Understanding Aadhaar Services Online",
      excerpt: "Complete guide to accessing Aadhaar services online, updating information, and downloading your Aadhaar card digitally.",
      author: "Admin",
      date: "Dec 12, 2024",
      views: "1.8K",
      category: "Government Services"
    },
    {
      id: 3,
      title: "Social Media Safety Tips for Everyone",
      excerpt: "Essential tips to stay safe on social media platforms, protect your privacy, and avoid common online scams.",
      author: "Security Expert",
      date: "Dec 10, 2024",
      views: "3.1K",
      category: "Digital Safety"
    },
    {
      id: 4,
      title: "How to Apply for Government Schemes Online",
      excerpt: "Step-by-step process to apply for various government schemes and benefits through official online portals.",
      author: "Policy Guide",
      date: "Dec 8, 2024",
      views: "2.7K",
      category: "Government Schemes"
    }
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}