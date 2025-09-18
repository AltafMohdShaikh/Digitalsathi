import React, { useState } from "react";
import { Play, ThumbsUp, ThumbsDown, Share2, Download, Bell, Eye, Clock } from "lucide-react";

const VideoPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setLikes] = useState(1247);
  const [isLiked, setIsLiked] = useState(false);

  const suggestions = [
    { title: "Complete React Tutorial 2025", channel: "CodeMaster", views: "234K", time: "3 days ago", duration: "15:30" },
    { title: "JavaScript Advanced Concepts", channel: "WebDev Pro", views: "189K", time: "1 week ago", duration: "22:15" },
    { title: "CSS Grid Layout Masterclass", channel: "DesignHub", views: "95K", time: "4 days ago", duration: "18:45" },
    { title: "Node.js Backend Development", channel: "ServerSide", views: "167K", time: "2 days ago", duration: "28:20" },
    { title: "Python Data Science Basics", channel: "DataLearn", views: "312K", time: "1 day ago", duration: "35:10" },
    { title: "MongoDB Database Tutorial", channel: "DatabasePro", views: "78K", time: "5 days ago", duration: "25:40" }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--color-background)]">
      {/* Left Side - Video Section */}
      <div className="w-full lg:flex-1 p-4 lg:p-6">
        {/* Video Player */}
        <div className="w-full max-w-full rounded-xl lg:rounded-2xl overflow-hidden shadow-lg mb-6" style={{ backgroundColor: '#111827' }}>
          <video
            src="src/assets/images/video.mp4"
            controls
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23374151'/%3E%3C/svg%3E"
          />
        </div>

        {/* Video Title */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[var(--color-text)] leading-tight">
          Complete Guide to Modern Web Development
        </h1>

        {/* Channel Info & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b border-[var(--color-border)] gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              TC
            </div>
            <div>
              <h2 className="font-semibold text-[var(--color-text)]">TechChannel Pro</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">1.2M subscribers</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                isSubscribed ? 'bg-gray-200 text-gray-700' : 'text-white'
              }`}
              style={{ 
                backgroundColor: isSubscribed ? '#E5E7EB' : '#2563EB',
                color: isSubscribed ? '#111827' : 'white'
              }}
            >
              <Bell size={16} className="inline mr-2" />
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>

        {/* Video Stats & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <Eye size={16} />
              <span className="text-sm">45,782 views</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <Clock size={16} />
              <span className="text-sm">2 days ago</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {setIsLiked(!isLiked); setLikes(isLiked ? likes-1 : likes+1)}}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                isLiked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp size={16} />
              <span className="hidden sm:inline">{likes.toLocaleString()}</span>
            </button>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[var(--color-hover-light)] hover:bg-[var(--color-border)] transition-all duration-300 text-[var(--color-text)]">
              <Share2 size={16} />
            </button>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[var(--color-hover-light)] hover:bg-[var(--color-border)] transition-all duration-300 text-[var(--color-text)]">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[var(--color-card)] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-[var(--color-border)]">
          <h3 className="font-semibold mb-3 text-[var(--color-text)] text-sm sm:text-base">About this video</h3>
          <p className="leading-relaxed text-[var(--color-text-secondary)] text-sm sm:text-base">
            Learn modern web development from scratch! This comprehensive tutorial covers React, Node.js, 
            and database integration. Perfect for beginners and intermediate developers looking to enhance 
            their skills. We'll build a complete application step by step.
          </p>
        </div>
      </div>

      {/* Right Side - Suggestions */}
      <div className="w-full lg:w-96 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-[var(--color-border)]">
        <h3 className="text-lg font-semibold mb-6 text-[var(--color-text)]">Up Next</h3>
        
        <div className="space-y-4">
          {suggestions.map((video, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:shadow-md group">
              <div className="relative">
                <div className="w-28 sm:w-36 h-16 sm:h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                  <Play size={20} className="text-white opacity-70" />
                </div>
                <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black bg-opacity-70 text-white text-xs rounded">
                  {video.duration}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors text-[var(--color-text)]">
                  {video.title}
                </h4>
                <p className="text-xs mb-1 text-[var(--color-text-secondary)]">{video.channel}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {video.views} views • {video.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;