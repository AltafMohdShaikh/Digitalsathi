import React from "react";
import "../styles/colors.css";
import { Clock, X, LogIn } from "lucide-react";
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import thumbnail8 from "../assets/images/thumbnail8.png";

const HistoryItem = ({ item }) => {
  return (
    <div className="bg-[var(--color-card)] flex gap-4 p-4 hover:bg-[var(--color-hover-light)] rounded-lg group shadow-sm border border-[var(--color-border)]">
      <div className="relative flex-shrink-0">
        <img
          src={thumbnail8}
          alt={item.title}
          className="w-40 h-24 object-cover rounded-lg"
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
          {item.duration}
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-[var(--color-text)] line-clamp-2 mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-1">Digital Sathi</p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {item.views} views • {item.watchedTime}
        </p>
      </div>
      
      <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-200 rounded-full transition-all">
        <X size={16} className="text-[var(--color-text-secondary)]" />
      </button>
    </div>
  );
};

export default function HistoryPage() {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="px-6 bg-[var(--color-background)] min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-text)]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="px-6 bg-[var(--color-background)] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between py-6 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <Clock size={24} className="text-[var(--color-text)]" />
              <h1 className="text-2xl font-bold text-[var(--color-text)]">Watch History</h1>
            </div>
          </div>
          <div className="py-20 text-center">
            <LogIn size={64} className="text-[var(--color-text-secondary)] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Login Required</h2>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Please login to view your watch history. Your viewing history helps you keep track of videos you've watched.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Use the login button in the navbar to sign in to your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const historyData = [
    {
      id: 1,
      title: "Tech Tutorial 1: Learn Modern Development",
      duration: "29:29",
      views: "187K",
      watchedTime: "Watched 2 hours ago"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts for Beginners",
      duration: "15:42",
      views: "92K",
      watchedTime: "Watched yesterday"
    },
    {
      id: 3,
      title: "React Hooks Deep Dive: useState & useEffect",
      duration: "22:15",
      views: "156K",
      watchedTime: "Watched 2 days ago"
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to Use Which",
      duration: "18:33",
      views: "78K",
      watchedTime: "Watched 3 days ago"
    },
    {
      id: 5,
      title: "Python for Beginners: Complete Tutorial",
      duration: "45:12",
      views: "320K",
      watchedTime: "Watched 1 week ago"
    }
  ];

  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between py-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-[var(--color-text)]" />
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Watch History</h1>
          </div>
          <button className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium">
            Clear all watch history
          </button>
        </div>

        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {historyData.map((item) => (
              <HistoryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}