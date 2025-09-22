import React, { useState, useEffect } from "react";
import "../styles/colors.css";
import VideoCard from "../Components/VideoCard";
import thumbnail8 from "../assets/images/thumbnail8.png";
import { getDigitalLiteracyVideos } from "../services/youtubeService";

export default function VideosListPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState('');

  useEffect(() => {
    fetchDigitalLiteracyVideos();
  }, []);

  const fetchDigitalLiteracyVideos = async (pageToken = '') => {
    try {
      setLoading(true);
      const result = await getDigitalLiteracyVideos(pageToken);
      
      if (pageToken) {
        setVideos(prev => [...prev, ...result.videos]);
      } else {
        setVideos(result.videos);
      }
      
      setNextPageToken(result.nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    if (nextPageToken) {
      fetchDigitalLiteracyVideos(nextPageToken);
    }
  };



  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <section className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">All Videos</h1>
          <p className="text-[var(--color-text-secondary)]">
            Discover curated digital literacy and computer skills videos
          </p>
        </div>
        
        {loading && videos.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-[var(--color-text-secondary)]">Loading digital literacy videos...</div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-secondary)] text-lg">No videos found.</p>
            <p className="text-[var(--color-text-secondary)] text-sm mt-2">Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} thumbnail={video.thumbnail || thumbnail8} />
              ))}
            </div>
            
            {videos.length > 0 && nextPageToken && (
              <div className="text-center mt-8">
                <button
                  onClick={handleShowMore}
                  disabled={loading}
                  className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Show More Videos'}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}