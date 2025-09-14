import React from "react";
import "../styles/colors.css";
import VideoCard from "../Components/VideoCard";
import { videos } from "../Components/homeData";
import thumbnail8 from "../assets/images/thumbnail8.png";

export default function VideosListPage() {
  const allVideos = [
    ...videos,
    {
      id: 5,
      title: "Python for Beginners: Complete Tutorial",
      duration: "45:12",
      views: "320K",
      timeAgo: "5 days ago"
    },
    {
      id: 6,
      title: "Web Development Roadmap 2024",
      duration: "32:45",
      views: "245K",
      timeAgo: "1 week ago"
    },
    {
      id: 7,
      title: "Digital Marketing Fundamentals",
      duration: "28:30",
      views: "189K",
      timeAgo: "3 days ago"
    },
    {
      id: 8,
      title: "Mobile App Development Guide",
      duration: "52:18",
      views: "412K",
      timeAgo: "2 weeks ago"
    }
  ];

  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <section className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">All Videos</h1>
          <p className="text-[var(--color-text-secondary)]">
            Explore our complete collection of educational videos
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allVideos.map((video) => (
            <VideoCard key={video.id} video={video} thumbnail={thumbnail8} />
          ))}
        </div>
      </section>
    </div>
  );
}