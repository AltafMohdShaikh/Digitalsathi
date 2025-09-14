import React from "react";
import "../styles/colors.css";
import { PenTool, Calendar, User, Eye } from "lucide-react";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[var(--color-border)] group cursor-pointer">
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-3">
        <Calendar size={14} />
        <span>{blog.date}</span>
        <span>•</span>
        <User size={14} />
        <span>{blog.author}</span>
      </div>
      
      <h3 className="font-bold text-xl mb-3 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
        {blog.title}
      </h3>
      
      <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-3">
        {blog.excerpt}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
          <Eye size={14} />
          <span>{blog.views} views</span>
        </div>
        <span className="text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10 px-3 py-1 rounded-full">
          {blog.category}
        </span>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Blog</h1>
            <p className="text-[var(--color-text-secondary)]">
              Latest articles and guides on digital literacy
            </p>
          </div>
          
          <button className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            <PenTool size={18} />
            Write Blog
          </button>
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