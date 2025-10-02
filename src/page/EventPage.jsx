import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, ArrowRight, Filter, Presentation, BookOpen, Award, Target, Lightbulb, Star, Trophy, Megaphone, Network, Handshake, Coffee, Mic, Video, Headphones, Bookmark } from "lucide-react";
import HeroSection from "../Components/HeroSection";
import { getEvents } from '../services/databaseService';

const EventPage = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await getEvents();
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'Digital Literacy', name: 'Digital Literacy' },
    { id: 'Government Schemes', name: 'Government Schemes' },
    { id: 'Digital Payments', name: 'Digital Payments' },
    { id: 'Workshop', name: 'Workshop' }
  ];

  const filteredEvents = filter === 'all' ? events : events.filter(event => event.category === filter);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <HeroSection 
        title="Discover Amazing Events"
        subtitle="Connect, learn, and grow with our carefully curated collection of events designed to inspire and educate professionals across industries."
        icons={[Calendar, Presentation, BookOpen, Award, Target, Lightbulb, Star, Trophy, Megaphone, Network, Handshake, Coffee, Mic, Video, Headphones, Bookmark]}
        iconColor="text-green-500"
      />

      {/* Filter Section */}
      <div className="max-w-7xl mt-5 mx-auto px-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[var(--color-text-secondary)]" />
            <span className="font-medium text-[var(--color-text)]">Filter by category:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-[var(--color-card)] text-[var(--color-text)] hover:shadow-sm hover:transform hover:scale-102'
                }`}
                style={{
                  backgroundColor: filter === category.id ? '#2563EB' : 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                  border: filter === category.id ? 'none' : '1px solid'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-[var(--color-text-secondary)]">Loading events...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group relative bg-[var(--color-card)] rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
                style={{ 
                  boxShadow: hoveredCard === event.id 
                    ? '0 25px 50px -12px rgba(37, 99, 235, 0.3), 0 0 30px rgba(37, 99, 235, 0.2)' 
                    : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  transform: hoveredCard === event.id ? 'translateY(-8px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Event Image */}
                <div className="h-48 w-full relative overflow-hidden">
                  {event.image_url ? (
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[var(--color-text-secondary)]" />
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[var(--color-text-secondary)]" />
                        <span className="text-sm text-[var(--color-text-secondary)]">
                          {event.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={16} className="text-[var(--color-text-secondary)]" />
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {event.location}
                      </span>
                    </div>
                  )}

                  <p className="text-sm leading-relaxed mb-6 text-[var(--color-text-secondary)]">
                    {event.description}
                  </p>

                  <button className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg transform hover:scale-105">
                    View Details
                    <ArrowRight 
                      size={16} 
                      className="group-hover:translate-x-1 transition-transform duration-300" 
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-[var(--color-text-secondary)]">
              No events found for the selected category.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">
          Don't Miss Out!
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-[var(--color-text-secondary)]">
          Stay updated with the latest events and never miss an opportunity to learn and network.
        </p>
        <button className="px-8 py-4 rounded-xl font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-all duration-300 hover:shadow-lg transform hover:scale-105">
          Subscribe to Updates
        </button>
      </div>
    </div>
  );
};

export default EventPage;