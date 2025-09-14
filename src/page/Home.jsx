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
            {/* Popular Platforms */}
            <section className="py-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[var(--color-text)]">Popular Platforms</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Learn how to use these apps step-by-step
                    </p>
                </div>

                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {platforms.map((platform, index) => (
                        <div 
                            key={index}
                            className="bg-[var(--color-primary)] text-white text-sm font-medium px-4 py-2 rounded-full flex-shrink-0 shadow-sm hover:bg-[var(--color-hover-light)] hover:text-[var(--color-primary)] transition-all duration-200 cursor-pointer transform hover:scale-105"
                        >
                            {platform}
                        </div>
                    ))}
                </div>
            </section>


            {/* Events */}
            <section className="py-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[var(--color-text)]">Events</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Visit these free events to improve your digital skills
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
            <section className="py-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[var(--color-text)]">Latest Tech Videos</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Learn these latest technologies and make your life easier
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
            <section className="py-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[var(--color-text)]">Government Schemes</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        Learn about these government schemes and make your life easier
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
