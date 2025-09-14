import React from "react";
import { Link } from "react-router-dom";
import "../styles/colors.css";

const VideoCard = ({ video, thumbnail }) => {
  return (
    <Link to="/video" className="group">
      <div className="relative w-full aspect-video">
        <img
          src={thumbnail}
          alt={video.title}
          className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </span>
      </div>
      <div className="mt-3">
        <h4 className="text-base font-semibold line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors text-[var(--color-text)]">
          {video.title}
        </h4>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Digital Sathi</p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {video.views} views • {video.timeAgo}
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;