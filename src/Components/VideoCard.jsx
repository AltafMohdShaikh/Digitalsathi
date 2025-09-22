import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/colors.css";

const VideoCard = ({ video, thumbnail }) => {
  const navigate = useNavigate();
  
  const handleVideoClick = (e) => {
    e.preventDefault();
    // Navigate to video player with video data
    navigate('/video', { 
      state: { 
        videoData: video,
        videoUrl: video.videoUrl,
        title: video.title,
        channel: video.channel,
        views: video.views,
        duration: video.duration,
        timeAgo: video.timeAgo,
        thumbnail: thumbnail
      } 
    });
  };

  return (
    <div className="group cursor-pointer" onClick={handleVideoClick}>
      <div className="relative w-full aspect-video">
        <img
          src={thumbnail}
          alt={video.title}
          className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
          onError={(e) => {
            e.target.src = '/src/assets/images/thumbnail8.png';
          }}
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </span>
      </div>
      <div className="mt-3">
        <h4 className="text-base font-semibold line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors text-[var(--color-text)]">
          {video.title}
        </h4>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{video.channel}</p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {video.views} views • {video.timeAgo}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;