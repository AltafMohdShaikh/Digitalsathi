import React, { useState, useEffect } from 'react';
import { Shield, Users, Video, Calendar, FileText, Settings, Database, BarChart3, Award, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/colors.css';

const MasterPage = () => {
  const { isAdmin, user } = useUserRole();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [videoForm, setVideoForm] = useState({ videoUrl: '', category: 'Tech Tutorials' });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch videos when videos tab is active
  useEffect(() => {
    if (activeTab === 'videos') {
      fetchVideos();
    }
  }, [activeTab]);

  const fetchVideos = async () => {
    try {
      console.log('Fetching videos from Firestore...');
      const videosCollection = collection(db, 'Videos');
      const videosSnapshot = await getDocs(videosCollection);
      const videosList = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched videos:', videosList);
      setVideos(videosList.sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn)));
    } catch (error) {
      console.error('Error fetching videos:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!videoForm.videoUrl.trim()) return;

    setLoading(true);
    try {
      console.log('Adding video with data:', {
        videoUrl: videoForm.videoUrl,
        category: videoForm.category,
        addedOn: new Date().toISOString()
      });
      
      const videoData = {
        videoUrl: videoForm.videoUrl,
        category: videoForm.category,
        addedOn: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'Videos'), videoData);
      console.log('Video added successfully with ID:', docRef.id);
      
      setVideoForm({ videoUrl: '', category: 'Tech Tutorials' });
      fetchVideos(); // Refresh the list
      alert('Video added successfully!');
    } catch (error) {
      console.error('Detailed error adding video:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      alert(`Error adding video: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      await deleteDoc(doc(db, 'Videos', videoId));
      fetchVideos(); // Refresh the list
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video. Please try again.');
    }
  };



  if (!isAdmin) {
    return (
      <div className="px-6 bg-[var(--color-background)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Access Denied</h2>
          <p className="text-[var(--color-text-secondary)]">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'schemes', label: 'Schemes', icon: Award },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-secondary)] text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-[var(--color-text)]">1,234</p>
                </div>
                <Users className="text-blue-500" size={32} />
              </div>
            </div>
            <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-secondary)] text-sm">Total Videos</p>
                  <p className="text-2xl font-bold text-[var(--color-text)]">89</p>
                </div>
                <Video className="text-green-500" size={32} />
              </div>
            </div>
            <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-secondary)] text-sm">Active Events</p>
                  <p className="text-2xl font-bold text-[var(--color-text)]">12</p>
                </div>
                <Calendar className="text-purple-500" size={32} />
              </div>
            </div>
            <div className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-secondary)] text-sm">Database Size</p>
                  <p className="text-2xl font-bold text-[var(--color-text)]">2.4GB</p>
                </div>
                <Database className="text-orange-500" size={32} />
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">User Management</h3>
            <p className="text-[var(--color-text-secondary)]">User management features will be implemented here.</p>
          </div>
        );
      case 'videos':
        return (
          <div className="space-y-6">
            {/* Add Video Form */}
            <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Add New Video</h3>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Video URL</label>
                  <input
                    type="url"
                    value={videoForm.videoUrl}
                    onChange={(e) => setVideoForm({...videoForm, videoUrl: e.target.value})}
                    className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Category</label>
                  <select
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({...videoForm, category: e.target.value})}
                    className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value="Tech Tutorials">Tech Tutorials</option>
                    <option value="Digital Literacy">Digital Literacy</option>
                    <option value="Government Schemes">Government Schemes</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <Plus size={18} />
                  {loading ? 'Adding...' : 'Add Video'}
                </button>
              </form>
            </div>

            {/* Videos List */}
            <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Added Videos ({videos.length})</h3>
              {videos.length === 0 ? (
                <p className="text-[var(--color-text-secondary)]">No videos added yet.</p>
              ) : (
                <div className="space-y-3">
                  {videos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Video size={16} className="text-[var(--color-primary)]" />
                          <span className="font-medium text-[var(--color-text)]">{video.category}</span>
                          <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-hover-light)] px-2 py-1 rounded">
                            {new Date(video.addedOn).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] truncate">{video.videoUrl}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(video.videoUrl, '_blank')}
                          className="p-2 text-[var(--color-primary)] hover:bg-[var(--color-hover-light)] rounded-lg transition-colors"
                          title="Open Video"
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Video"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Event Management</h3>
            <p className="text-[var(--color-text-secondary)]">Event management features will be implemented here.</p>
          </div>
        );
      case 'schemes':
        return (
          <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Government Schemes Management</h3>
            <p className="text-[var(--color-text-secondary)]">Government schemes management features will be implemented here.</p>
          </div>
        );
      case 'content':
        return (
          <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Content Management</h3>
            <p className="text-[var(--color-text-secondary)]">Content management features will be implemented here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">System Settings</h3>
            <p className="text-[var(--color-text-secondary)]">System settings will be implemented here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="py-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={32} className="text-yellow-500" />
            <h1 className="text-3xl font-bold text-[var(--color-text)]">Master Panel</h1>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Admin'}! Manage your Digital Sathi platform.
          </p>
        </div>

        {/* Tabs */}
        <div className="py-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[var(--color-primary)] text-white shadow-lg'
                      : 'bg-[var(--color-card)] text-[var(--color-text)] hover:bg-[var(--color-hover-light)]'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterPage;