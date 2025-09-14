import React from "react";
import "../styles/colors.css";
import { platforms } from "../Components/homeData";

const PlatformCard = ({ platform, index }) => {
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", 
    "bg-yellow-500", "bg-indigo-500", "bg-pink-500", "bg-teal-500"
  ];
  
  return (
    <div className="bg-[var(--color-card)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[var(--color-border)] group cursor-pointer">
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 ${colors[index % colors.length]} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}></div>
        <h3 className="font-semibold text-lg text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
          {platform}
        </h3>
      </div>
    </div>
  );
};

export default function PlatformsPage() {
  const allPlatforms = [
    ...platforms,
    "Facebook", "Instagram", "Twitter", "LinkedIn", "Amazon", "Flipkart"
  ];

  return (
    <div className="px-6 bg-[var(--color-background)] min-h-screen">
      <section className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Digital Platforms</h1>
          <p className="text-[var(--color-text-secondary)]">
            Learn how to use these popular digital platforms step-by-step
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {allPlatforms.map((platform, index) => (
            <PlatformCard key={index} platform={platform} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}