import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Play, ThumbsUp, ThumbsDown, Share2, Download, Bell, Eye, Clock, ArrowLeft } from "lucide-react";
import { formatDuration, formatViews, getTimeAgo, extractVideoId, getEmbedUrl } from "../utils/videoUtils";
import { searchVideos } from "../services/youtubeService";

const VideoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setLikes] = useState(1247);
  const [isLiked, setIsLiked] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);
  
  useEffect(() => {
    if (location.state?.videoData) {
      setVideoData(location.state.videoData);
      fetchRelatedVideos(location.state.videoData.channel);
    }
  }, [location.state]);
  
  const fetchRelatedVideos = async (channelName) => {
    try {
      const result = await searchVideos(channelName, '', 6);
      setRelatedVideos(result.videos.slice(0, 6));
    } catch (error) {
      console.error('Error fetching related videos:', error);
    }
  };
  




  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--color-background)]">
      {/* Left Side - Video Section */}
      <div className="w-full lg:flex-1 p-4 lg:p-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/videos')}
          className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-[var(--color-hover-light)] hover:bg-[var(--color-border)] transition-all duration-300 text-[var(--color-text)]"
        >
          <ArrowLeft size={16} />
          <span>Back to Videos</span>
        </button>
        
        {/* Video Player */}
        <div className="w-full max-w-4xl mx-auto rounded-xl lg:rounded-2xl overflow-hidden shadow-lg mb-6" style={{ backgroundColor: '#111827' }}>
          {videoData && getEmbedUrl(videoData.videoUrl) ? (
            <iframe
              src={getEmbedUrl(videoData.videoUrl)}
              className="w-full aspect-video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={videoData.title}
            />
          ) : (
            <video
              src="src/assets/images/video.mp4"
              controls
              className="w-full aspect-video object-cover"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23374151'/%3E%3C/svg%3E"
            />
          )}
        </div>

        {/* Video Title */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[var(--color-text)] leading-tight">
          {videoData?.title || "Complete Guide to Modern Web Development"}
        </h1>

        {/* Channel Info & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b border-[var(--color-border)] gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              TC
            </div>
            <div>
              <h2 className="font-semibold text-[var(--color-text)]">{videoData?.channel || "TechChannel Pro"}</h2>
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
              <span className="text-sm">{videoData?.views || "45,782"} views</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <Clock size={16} />
              <span className="text-sm">{videoData?.timeAgo || "2 days ago"}</span>
            </div>
            {videoData?.duration && (
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Play size={16} />
                <span className="text-sm">{videoData.duration}</span>
              </div>
            )}
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
          </div>
        </div>

        {/* Description */}
        <div className="bg-[var(--color-card)] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-[var(--color-border)]">
          <h3 className="font-semibold mb-3 text-[var(--color-text)] text-sm sm:text-base">About this video</h3>
          <div className="leading-relaxed text-[var(--color-text-secondary)] text-sm sm:text-base">
            <p className={`whitespace-pre-line ${!showFullDescription ? 'line-clamp-3' : ''}`}>
              {videoData?.description || "Learn modern web development from scratch! This comprehensive tutorial covers React, Node.js, and database integration. Perfect for beginners and intermediate developers looking to enhance their skills. We'll build a complete application step by step."}
            </p>
            {videoData?.description && videoData.description.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-[var(--color-primary)] hover:underline mt-2 text-sm font-medium"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Suggestions */}
      <div className="w-full lg:w-96 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-[var(--color-border)]">
        <h3 className="text-lg font-semibold mb-6 text-[var(--color-text)]">Up Next</h3>
        
        <div className="space-y-4">
          {relatedVideos.map((video, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:shadow-md group" onClick={() => navigate('/video', { state: { videoData: video } })}>
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-28 sm:w-36 h-16 sm:h-20 rounded-lg object-cover"
                />
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
                  {video.views} views • {video.timeAgo}
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