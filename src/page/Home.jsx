import React from "react";
import "../Feed/Homefeed.css";
import "../styles/colors.css";
import { Link } from "react-router-dom";
import thumbnail8 from "../assets/images/thumbnail8.png";
import VideoCard from "../Components/VideoCard";
import EventCard from "../Components/EventCard";
import SchemeCard from "../Components/SchemeCard";
import { platforms, events, videos, schemes, getColorClasses } from "../Components/homeData";

export default function Home() {

    return (
        <div className="px-6 bg-[var(--color-background)] min-h-screen">
            {/* Hero Section */}
            <div className="relative py-12 mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] opacity-5 rounded-3xl"></div>
                <div className="relative text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] bg-clip-text text-transparent">
                        Welcome to Digital Sathi
                    </h1>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                        Your trusted companion for digital literacy and government services
                    </p>
                </div>
            </div>

            {/* Popular Platforms */}
            <section className="py-8 relative">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full"></div>
                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Popular Platforms</h2>
                    </div>
                    <p className="text-[var(--color-text-secondary)] ml-7">
                        Learn how to use these apps step-by-step
                    </p>
                </div>

                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-6 pt-2">
                    {platforms.map((platform, index) => (
                        <div 
                            key={index}
                            className="relative bg-gradient-to-r from-blue-400 to-blue-500 text-white text-sm font-semibold px-6 py-3 rounded-2xl flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-translate-y-1 group"
                        >
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                            <span className="relative z-10">{platform}</span>
                        </div>
                    ))}
                </div>
            </section>


            {/* Events */}
            <section className="py-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--color-primary)] to-transparent opacity-5 rounded-full blur-3xl"></div>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Upcoming Events</h2>
                    </div>
                    <p className="text-[var(--color-text-secondary)] ml-7">
                        Join these free events to enhance your digital skills
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
                
                <div className="flex justify-end mt-6">
                    <Link to="/events">
                        <button className="px-6 py-2 bg-[var(--color-border)] hover:bg-gray-300 rounded-lg text-sm font-medium text-[var(--color-text)] transition-colors">
                            View All Events
                        </button>
                    </Link>
                </div>
            </section>

            {/* Latest Tech Videos */}
            <section className="py-8 relative">
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-transparent opacity-5 rounded-full blur-3xl"></div>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Latest Tech Videos</h2>
                    </div>
                    <p className="text-[var(--color-text-secondary)] ml-7">
                        Master the latest technologies with our expert tutorials
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} thumbnail={thumbnail8} />
                    ))}
                </div>
                
                <div className="flex justify-end mt-6">
                    <Link to="/videos">
                        <button className="px-6 py-2 bg-[var(--color-border)] hover:bg-gray-300 rounded-lg text-sm font-medium text-[var(--color-text)] transition-colors">
                            View All Videos
                        </button>
                    </Link>
                </div>
            </section>
            {/* Government Schemes */}
            <section className="py-8 relative">
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-orange-500 to-transparent opacity-5 rounded-full blur-3xl"></div>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Government Schemes</h2>
                    </div>
                    <p className="text-[var(--color-text-secondary)] ml-7">
                        Discover beneficial government schemes and services
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schemes.map((scheme) => (
                        <SchemeCard key={scheme.id} scheme={scheme} getColorClasses={getColorClasses} />
                    ))}
                </div>

                <div className="flex justify-end mt-6">
                    <Link to="/schemes">
                        <button className="px-6 py-2 bg-[var(--color-border)] hover:bg-gray-300 rounded-lg text-sm font-medium text-[var(--color-text)] transition-colors">
                            View All Schemes
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
