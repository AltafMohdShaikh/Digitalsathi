import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Heart, Briefcase } from "lucide-react";
import "../styles/colors.css";

const SchemeCard = ({ scheme, getColorClasses }) => {
  const colorClasses = getColorClasses(scheme.color);
  
  const getSchemeIcon = (title) => {
    if (title.includes('Digital')) return Shield;
    if (title.includes('Skill')) return Briefcase;
    if (title.includes('Financial')) return Zap;
    if (title.includes('Health')) return Heart;
    return Shield;
  };
  
  const IconComponent = getSchemeIcon(scheme.title);
  
  return (
    <div className="relative bg-[var(--color-card)] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-[var(--color-border)] hover:border-opacity-20 h-full group cursor-pointer overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
        <IconComponent size={128} className={colorClasses.text} />
      </div>
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${colorClasses.bg} ${colorClasses.text} opacity-80 group-hover:opacity-100 transition-opacity`}>
          Active
        </span>
      </div>
      
      {/* Icon and Title */}
      <div className="relative z-10 mb-6">
        <div className={`inline-flex p-4 rounded-2xl ${colorClasses.bg} group-hover:scale-110 transition-all duration-300 shadow-lg`}>
          <IconComponent size={28} className={colorClasses.text} />
        </div>
        <h3 className="font-bold text-2xl mt-4 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
          {scheme.title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed text-base">
        {scheme.description}
      </p>
      
      {/* Action Button */}
      <div className="relative z-10">
        <Link to={scheme.link}>
          <button className={`group/btn w-full px-6 py-4 rounded-xl text-base font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${colorClasses.button} flex items-center justify-center gap-2`}>
            <span>Explore Scheme</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
      
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${colorClasses.bg}`}></div>
    </div>
  );
};

export default SchemeCard;