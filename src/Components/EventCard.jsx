import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, MapPin } from "lucide-react";
import "../styles/colors.css";

const EventCard = ({ event }) => {
  return (
    <div className="bg-[var(--color-card)] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[var(--color-border)] h-full group cursor-pointer">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-[var(--color-hover-light)]">
          <Calendar size={20} className="text-[var(--color-primary)]" />
        </div>
        <div className="text-sm font-semibold text-[var(--color-primary)]">
          {event.date}
        </div>
      </div>
      
      <h3 className="font-bold text-xl mb-4 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
        {event.title}
      </h3>
      
      <div className="flex items-center gap-2 mb-6">
        <MapPin size={16} className="text-[var(--color-text-secondary)]" />
        <p className="text-sm text-[var(--color-text-secondary)] font-medium">
          {event.location}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-[var(--color-text-secondary)]" />
          <span className="text-sm text-[var(--color-text-secondary)] font-medium">
            {event.attendees} attending
          </span>
        </div>
        <Link to="/events">
          <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;