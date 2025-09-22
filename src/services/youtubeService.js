import { formatDuration, formatViews, getTimeAgo } from '../utils/videoUtils';

const API_KEY = 'AIzaSyAL6t0diHpbGRoKDE21amjR4ft4d6MUISc';

export const searchVideos = async (query, pageToken = '', maxResults = 25) => {
  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&relevanceLanguage=hi&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
    
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
          return totalSeconds > 60;
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
      
      return {
        videos: videosList,
        nextPageToken: data.nextPageToken || ''
      };
    }
    return { videos: [], nextPageToken: '' };
  } catch (error) {
    console.error('Error searching videos:', error);
    return { videos: [], nextPageToken: '' };
  }
};

export const getDigitalLiteracyVideos = async (pageToken = '') => {
  const searchQueries = [
    'आत्मविश्वास कैसे बढ़ाएं public speaking hindi',
    'communication skills hindi tutorial',
    'programming सीखें beginners के लिए hindi',
    'coding कैसे शुरू करें hindi tutorial',
    'personality development tips hindi',
    'interview skills training hindi',
    'english बोलना सीखें hindi',
    'coding basics hindi tutorial',
    'soft skills development hindi',
    'career guidance students hindi'
  ];
  
  const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];
  return await searchVideos(randomQuery, pageToken);
};