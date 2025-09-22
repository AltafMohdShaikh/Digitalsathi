import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/colors.css";
import VideoCard from "../Components/VideoCard";
import thumbnail8 from "../assets/images/thumbnail8.png";

export default function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (searchQuery) {
      searchVideos(searchQuery);
    }
  }, [searchQuery]);

  const searchVideos = async (query, pageToken = '') => {
    try {
      setLoading(true);
      const API_KEY = 'AIzaSyAL6t0diHpbGRoKDE21amjR4ft4d6MUISc';
      
      // Add educational context to search query
      const educationalQuery = `${query} tutorial education learning hindi`;
      
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(educationalQuery)}&type=video&relevanceLanguage=hi&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
      
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data.items) {
        const videoIds = data.items.map(item => item.id.videoId).join(',');
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`;
        
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        
        const videosList = detailsData.items
          .filter(video => {
            const duration = video.contentDetails.duration;
            const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
            if (!match) return false;
            
            const hours = parseInt(match[1]) || 0;
            const minutes = parseInt(match[2]) || 0;
            const seconds = parseInt(match[3]) || 0;
            
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            return totalSeconds > 60; // Filter out shorts
          })
          .map(video => ({
            id: video.id,
            title: video.snippet.title,
            videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
            category: 'Educational',
            duration: formatDuration(video.contentDetails.duration),
            views: formatViews(video.statistics.viewCount),
            timeAgo: getTimeAgo(video.snippet.publishedAt),
            uploadDate: video.snippet.publishedAt,
            thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
            channel: video.snippet.channelTitle,
            description: video.snippet.description || 'No description available.'
          }));
        
        if (pageToken) {
          setVideos(prev => [...prev, ...videosList]);
        } else {
          setVideos(videosList);
        }
        
        setNextPageToken(data.nextPageToken || '');
      }
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    if (nextPageToken && searchQuery) {
      searchVideos(searchQuery, nextPageToken);
    }
  };

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '--:--';
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (viewCount) => {
    if (!viewCount) return '--';
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return 'Today';
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