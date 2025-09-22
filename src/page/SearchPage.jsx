import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/colors.css";
import VideoCard from "../Components/VideoCard";
import thumbnail8 from "../assets/images/thumbnail8.png";
import { searchVideos } from "../services/youtubeService";

export default function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (searchQuery) {
      handleSearchVideos(searchQuery);
    }
  }, [searchQuery]);

  const handleSearchVideos = async (query, pageToken = '') => {
    try {
      setLoading(true);
      const educationalQuery = `${query} tutorial education learning hindi`;
      const result = await searchVideos(educationalQuery, pageToken);
      
      if (pageToken) {
        setVideos(prev => [...prev, ...result.videos]);
      } else {
        setVideos(result.videos);
      }
      
      setNextPageToken(result.nextPageToken);
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    if (nextPageToken && searchQuery) {
      handleSearchVideos(searchQuery, nextPageToken);
    }
  };



  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <section className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Educational videos and tutorials related to your search
          </p>
        </div>
        
        {loading && videos.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-[var(--color-text-secondary)]">Searching for educational videos...</div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-secondary)] text-lg">No educational videos found for "{searchQuery}".</p>
            <p className="text-[var(--color-text-secondary)] text-sm mt-2">Try different keywords or browse our video collection.</p>
            <button 
              onClick={() => navigate('/videos')}
              className="mt-4 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Browse All Videos
            </button>
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
                  {loading ? 'Loading...' : 'Show More Results'}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}