import React, { useState, useEffect } from 'react';
import { Shield, Users, Video, Calendar, FileText, Settings, Database, BarChart3, Award, Plus, Trash2, ExternalLink, Check, X } from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';
import { addVideo, getVideos, deleteVideo, getAllUsers, updateUserRole, deleteUser, getPendingBlogs, approveBlog, rejectBlog, addEvent, getEvents, deleteEvent, addScheme, getSchemes, deleteScheme, uploadImage } from '../services/databaseService';
import '../styles/colors.css';

const MasterPage = () => {
  const { isAdmin, user } = useUserRole();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [videoForm, setVideoForm] = useState({ videoUrl: '', category: 'Tech Tutorials' });
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Digital Literacy',
    image: null
  });
  const [schemeForm, setSchemeForm] = useState({
    title: '',
    description: '',
    eligibility: '',
    benefits: '',
    application_url: '',
    category: 'Government Scheme'
  });

  // Fetch data when tabs are active
  useEffect(() => {
    if (activeTab === 'videos') {
      fetchVideos();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'content') {
      fetchPendingBlogs();
    } else if (activeTab === 'events') {
      fetchEvents();
    } else if (activeTab === 'schemes') {
      fetchSchemes();
    }
  }, [activeTab]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await getVideos();
      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!videoForm.videoUrl.trim()) return;

    setLoading(true);
    try {
      const videoData = {
        video_url: videoForm.videoUrl,
        category: videoForm.category,
        created_at: new Date().toISOString()
      };

      const { error } = await addVideo(videoData);
      if (error) throw error;
      
      setVideoForm({ videoUrl: '', category: 'Tech Tutorials' });
      fetchVideos();
      alert('Video added successfully!');
    } catch (error) {
      console.error('Error adding video:', error);
      alert(`Error adding video: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await deleteVideo(videoId);
      if (error) throw error;
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video. Please try again.');
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await getAllUsers();
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { error } = await updateUserRole(userId, newRole);
      if (error) throw error;
      fetchUsers();
      alert('User role updated successfully!');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Error updating user role.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const { error } = await deleteUser(userId);
      if (error) throw error;
      fetchUsers();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user.');
    }
  };

  const fetchPendingBlogs = async () => {
    try {
      const { data, error } = await getPendingBlogs();
      if (error) throw error;
      setPendingBlogs(data || []);
    } catch (error) {
      console.error('Error fetching pending blogs:', error);
    }
  };

  const handleApproveBlog = async (blogId) => {
    try {
      const { error } = await approveBlog(blogId);
      if (error) throw error;
      fetchPendingBlogs();
      alert('Blog approved successfully!');
    } catch (error) {
      console.error('Error approving blog:', error);
      alert('Error approving blog.');
    }
  };

  const handleRejectBlog = async (blogId) => {
    if (!confirm('Are you sure you want to reject this blog?')) return;
    
    try {
      const { error } = await rejectBlog(blogId);
      if (error) throw error;
      fetchPendingBlogs();
      alert('Blog rejected successfully!');
    } catch (error) {
      console.error('Error rejecting blog:', error);
      alert('Error rejecting blog.');
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await getEvents();
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = null;
      
      // Upload image if provided
      if (eventForm.image) {
        const { data: imageData, error: imageError } = await uploadImage(eventForm.image);
        if (imageError) throw imageError;
        imageUrl = imageData.publicUrl;
      }
      
      const eventData = {
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        time: eventForm.time,
        location: eventForm.location,
        category: eventForm.category,
        image_url: imageUrl
      };
      
      const { error } = await addEvent(eventData);
      if (error) throw error;
      
      setEventForm({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'Digital Literacy',
        image: null
      });
      fetchEvents();
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const { error } = await deleteEvent(eventId);
      if (error) throw error;
      fetchEvents();
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event.');
    }
  };

  const fetchSchemes = async () => {
    try {
      const { data, error } = await getSchemes();
      if (error) throw error;
      setSchemes(data || []);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
  };

  const handleAddScheme = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await addScheme(schemeForm);
      if (error) throw error;
      setSchemeForm({
        title: '',
        description: '',
        eligibility: '',
        benefits: '',
        application_url: '',
        category: 'Government Scheme'
      });
      fetchSchemes();
      alert('Scheme added successfully!');
    } catch (error) {
      console.error('Error adding scheme:', error);
      alert('Error adding scheme.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScheme = async (schemeId) => {
    if (!confirm('Are you sure you want to delete this scheme?')) return;
    try {
      const { error } = await deleteScheme(schemeId);
      if (error) throw error;
      fetchSchemes();
      alert('Scheme deleted successfully!');
    } catch (error) {
      console.error('Error deleting scheme:', error);
      alert('Error deleting scheme.');
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
    { id: 'content', label: 'Pending Blogs', icon: FileText },
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
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">User Management ({users.length})</h3>
            {users.length === 0 ? (
              <p className="text-[var(--color-text-secondary)]">No users found.</p>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {user.username?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text)]">{user.username || 'Unknown'}</p>
                          <p className="text-sm text-[var(--color-text-secondary)]">{user.email}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          user.role === 'Admin' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.email === 'altafmohdshaikh@gmail.com' ? (
                        <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded font-medium">
                          Super Admin
                        </span>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="px-3 py-1 text-sm bg-[var(--color-card)] border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
                        >
                          <option value="Visitor">Visitor</option>
                          <option value="Admin">Admin</option>
                        </select>
                      )}
                      {user.email !== 'altafmohdshaikh@gmail.com' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
          <div className="space-y-6">
            {/* Add Event Form */}
            <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Add New Event</h3>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Event Title</label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                      className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Category</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({...eventForm, category: e.target.value})}
                      className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      <option value="Digital Literacy">Digital Literacy</option>
                      <option value="Government Schemes">Government Schemes</option>
                      <option value="Digital Payments">Digital Payments</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="Enter event description"
                    rows={3}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Date</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                      className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Time</label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                      className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Location</label>
                    <input
                      type="text"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                      className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      placeholder="Event location"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Event Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEventForm({...eventForm, image: e.target.files[0]})}
                    className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <Plus size={18} />
                  {loading ? 'Adding...' : 'Add Event'}
                </button>
              </form>
            </div>

            {/* Events List */}
            <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Events ({events.length})</h3>
              {events.length === 0 ? (
                <p className="text-[var(--color-text-secondary)]">No events added yet.</p>
              ) : (
                <div className="space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                      {event.image_url && (
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar size={16} className="text-[var(--color-primary)]" />
                          <span className="font-medium text-[var(--color-text)]">{event.title}</span>
                          <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-hover-light)] px-2 py-1 rounded">
                            {event.category}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-1">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                          <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                          {event.time && <span>🕒 {event.time}</span>}
                          {event.location && <span>📍 {event.location}</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title="Delete Event"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'schemes':
        return (
          <div className="space-y-6">
            {/* Add Scheme Form */}
            <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Add New Scheme</h3>
              <form onSubmit={handleAddScheme} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Scheme Title</label>
                    <input
                      type="text"
                      value={schemeForm.title}
                      onChange={(e) => setSchemeForm({...schemeForm, title: e.target.value})}
                      className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      placeholder="Enter scheme title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Category</label>
                    <select
                      value={schemeForm.category}
                      onChange={(e) => setSchemeForm({...schemeForm, category: e.target.value})}
                      className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      <option value="Government Scheme">Government Scheme</option>
                      <option value="Financial Aid">Financial Aid</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Employment">Employment</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Description</label>
                  <textarea
                    value={schemeForm.description}
                    onChange={(e) => setSchemeForm({...schemeForm, description: e.target.value})}
                    className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="Enter scheme description"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Eligibility</label>
                  <textarea
                    value={schemeForm.eligibility}
                    onChange={(e) => setSchemeForm({...schemeForm, eligibility: e.target.value})}
                    className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="Enter eligibility criteria"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Benefits</label>
                  <textarea
                    value={schemeForm.benefits}
                    onChange={(e) => setSchemeForm({...schemeForm, benefits: e.target.value})}
                    className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="Enter scheme benefits"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Application URL</label>
                  <input
                    type="url"
                    value={schemeForm.application_url}
                    onChange={(e) => setSchemeForm({...schemeForm, application_url: e.target.value})}
                    className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="https://example.com/apply"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <Plus size={18} />
                  {loading ? 'Adding...' : 'Add Scheme'}
                </button>
              </form>
            </div>

            {/* Schemes List */}
            <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Schemes ({schemes.length})</h3>
              {schemes.length === 0 ? (
                <p className="text-[var(--color-text-secondary)]">No schemes added yet.</p>
              ) : (
                <div className="space-y-3">
                  {schemes.map((scheme) => (
                    <div key={scheme.id} className="flex items-start justify-between p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Award size={16} className="text-[var(--color-primary)]" />
                          <span className="font-medium text-[var(--color-text)]">{scheme.title}</span>
                          <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-hover-light)] px-2 py-1 rounded">
                            {scheme.category}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-2">{scheme.description}</p>
                        {scheme.eligibility && (
                          <p className="text-xs text-[var(--color-text-secondary)] mb-1">
                            <strong>Eligibility:</strong> {scheme.eligibility}
                          </p>
                        )}
                        {scheme.benefits && (
                          <p className="text-xs text-[var(--color-text-secondary)] mb-1">
                            <strong>Benefits:</strong> {scheme.benefits}
                          </p>
                        )}
                        {scheme.application_url && (
                          <a 
                            href={scheme.application_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--color-primary)] hover:underline"
                          >
                            Apply Here →
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteScheme(scheme.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-4"
                        title="Delete Scheme"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="bg-[var(--color-card)] rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Pending Blogs ({pendingBlogs.length})</h3>
            {pendingBlogs.length === 0 ? (
              <p className="text-[var(--color-text-secondary)]">No pending blogs for approval.</p>
            ) : (
              <div className="space-y-4">
                {pendingBlogs.map((blog) => (
                  <div key={blog.id} className="p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-[var(--color-text)] mb-1">{blog.title}</h4>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-2">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                          <span>By: {blog.author_name}</span>
                          <span>Category: {blog.category}</span>
                          <span>Submitted: {new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleApproveBlog(blog.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors"
                        >
                          <Check size={14} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectBlog(blog.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
                        >
                          <X size={14} />
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-[var(--color-text)] bg-[var(--color-hover-light)] p-3 rounded max-h-32 overflow-y-auto">
                      {blog.content.substring(0, 200)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
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