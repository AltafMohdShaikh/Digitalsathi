import React, { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Users, Calendar, IndianRupee, Award, Building, Shield, Scale, Gavel, Briefcase, CreditCard, Home, GraduationCap, Heart, Leaf, Zap, Car, FileText, Globe, CheckCircle } from "lucide-react";
import HeroSection from "../Components/HeroSection";

const GovernmentPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const schemes = [
    {
      id: 1,
      title: "Pradhan Mantri Mudra Yojana (PMMY)",
      category: "Business & Finance",
      shortDescription: "Provides loans up to ₹10 lakh to small businesses and entrepreneurs without requiring collateral.",
      fullDescription: "The Pradhan Mantri Mudra Yojana is a flagship scheme launched to provide funding support to micro and small enterprises. It offers three categories of loans: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh), and Tarun (₹5 lakh to ₹10 lakh). The scheme aims to promote entrepreneurship, especially among women, SC/ST communities, and minorities. No collateral is required, making it accessible to small entrepreneurs who typically struggle to get traditional bank loans.",
      eligibility: "Individual entrepreneurs, small businesses, micro-enterprises",
      benefits: "Collateral-free loans, Low interest rates, Quick processing",
      link: "https://www.mudra.org.in/",
      icon: <IndianRupee size={24} />,
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
      category: "Healthcare",
      shortDescription: "Provides health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care.",
      fullDescription: "Ayushman Bharat is the world's largest health insurance scheme, providing comprehensive healthcare coverage to over 50 crore beneficiaries. The scheme covers hospitalization costs up to ₹5 lakh per family per year for secondary and tertiary care. It includes pre and post-hospitalization expenses, diagnostic tests, medicines, and treatment costs. The scheme is cashless and paperless, with beneficiaries able to avail services at any empaneled hospital across India.",
      eligibility: "Families covered under SECC database, Rural and urban poor",
      benefits: "Cashless treatment, Pan-India portability, Pre-existing diseases covered",
      link: "https://pmjay.gov.in/",
      icon: <Users size={24} />,
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "PM Kisan Samman Nidhi",
      category: "Agriculture",
      shortDescription: "Direct income support of ₹6,000 per year to small and marginal farmers across India.",
      fullDescription: "The PM Kisan scheme provides direct income support to small and marginal farmer families having combined land holding up to 2 hectares. Under the scheme, ₹6,000 per year is transferred directly to bank accounts of beneficiaries in three equal installments of ₹2,000 each. The scheme aims to supplement financial needs of farmers for procuring inputs related to agriculture and allied activities. It also helps in protecting farmers from falling into debt and ensures their dignity.",
      eligibility: "Small and marginal farmers with land holding up to 2 hectares",
      benefits: "Direct cash transfer, Regular income support, No middleman involvement",
      link: "https://pmkisan.gov.in/",
      icon: <Award size={24} />,
      color: "bg-emerald-500"
    },
    {
      id: 4,
      title: "Skill India - Pradhan Mantri Kaushal Vikas Yojana",
      category: "Education & Skills",
      shortDescription: "Provides skill training to youth to make them employable and earn their livelihood.",
      fullDescription: "PMKVY is the flagship scheme of the Ministry of Skill Development & Entrepreneurship. The scheme aims to enable Indian youth to take up skill training that will help them in securing a better livelihood. The training programs are conducted through training partners across the country. Upon successful completion of training and assessment, candidates receive a government certificate and monetary reward. The scheme covers various sectors including healthcare, construction, automotive, electronics, and many more.",
      eligibility: "Youth aged 15-45 years, School/college dropouts preferred",
      benefits: "Free skill training, Government certification, Monetary rewards, Job placement assistance",
      link: "https://www.pmkvyofficial.org/",
      icon: <Calendar size={24} />,
      color: "bg-purple-500"
    },
    {
      id: 5,
      title: "Stand-Up India Scheme",
      category: "Business & Finance",
      shortDescription: "Facilitates bank loans for SC/ST and women entrepreneurs to start greenfield enterprises.",
      fullDescription: "Stand-Up India scheme facilitates bank loans between ₹10 lakh and ₹1 crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise. The enterprise may be in manufacturing, services, or the trading sector. The scheme includes handholding support through Stand-Up Connect Centers, which provide assistance in loan application, project report preparation, and other support services.",
      eligibility: "SC/ST individuals and women above 18 years for greenfield projects",
      benefits: "Preferential lending, Handholding support, Composite loan facility",
      link: "https://www.standupmitra.in/",
      icon: <Users size={24} />,
      color: "bg-pink-500"
    },
    {
      id: 6,
      title: "Pradhan Mantri Awas Yojana (Urban)",
      category: "Housing",
      shortDescription: "Aims to provide affordable housing to urban poor with a target of building 1 crore houses.",
      fullDescription: "PMAY-U addresses housing shortage among the urban poor including slum dwellers through four verticals: In-situ Rehabilitation of existing slum dwellers, Credit Linked Subsidy, Affordable Housing in Partnership, and Beneficiary-led construction. The scheme provides central assistance ranging from ₹1 lakh to ₹2.5 lakh per beneficiary. Interest subsidy is provided on home loans under Credit Linked Subsidy Scheme. The mission aims to achieve the objective of 'Housing for All' by 2022.",
      eligibility: "EWS, LIG, and MIG families not owning a pucca house",
      benefits: "Central assistance, Interest subsidy, Quality housing, Women ownership",
      link: "https://pmaymis.gov.in/",
      icon: <Award size={24} />,
      color: "bg-orange-500"
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <HeroSection 
        title="Government Schemes"
        subtitle="Explore various government initiatives designed to empower citizens, promote entrepreneurship, and enhance quality of life across India."
        icons={[Building, Shield, Scale, Gavel, Briefcase, CreditCard, Home, GraduationCap, Heart, Leaf, Zap, Car, FileText, Users, Globe, CheckCircle]}
        iconColor="text-orange-500"
      />

      {/* Schemes Grid */}
      <div className="max-w-6xl mx-auto mt-5 px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-[var(--color-card)] rounded-2xl overflow-hidden transition-all duration-500 flex flex-col"
              style={{ 
                boxShadow: hoveredCard === scheme.id || expandedCard === scheme.id
                  ? '0 25px 50px -12px rgba(37, 99, 235, 0.3), 0 0 30px rgba(37, 99, 235, 0.2)' 
                  : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                transform: hoveredCard === scheme.id ? 'translateY(-4px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredCard(scheme.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className={`p-3 rounded-xl text-white ${scheme.color} flex-shrink-0`}
                  >
                    {scheme.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: '#c8ddff',
                          color: '#2563EB'
                        }}
                      >
                        {scheme.category}
                      </span>
                    </div>
                    <h3 
                      className="text-xl font-bold mb-2 text-[var(--color-text)]"
                    >
                      {scheme.title}
                    </h3>
                  </div>
                </div>

                <p 
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ color: '#6B7280' }}
                >
                  {scheme.shortDescription}
                </p>

                {/* Show More Button */}
                <button
                  onClick={() => toggleCard(scheme.id)}
                  className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3 mt-auto"
                  style={{ color: '#2563EB' }}
                >
                  {expandedCard === scheme.id ? 'Show Less' : 'Show More'}
                  {expandedCard === scheme.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>

              {/* Expanded Content */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedCard === scheme.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div 
                    className="h-px mb-6"
                    style={{ backgroundColor: '#E5E7EB' }}
                  ></div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 
                        className="font-semibold mb-2 text-[var(--color-text)]"
                      >
                        About This Scheme
                      </h4>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: '#6B7280' }}
                      >
                        {scheme.fullDescription}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 
                          className="font-semibold text-sm mb-1 text-[var(--color-text)]"
                        >
                          Eligibility
                        </h5>
                        <p 
                          className="text-xs"
                          style={{ color: '#6B7280' }}
                        >
                          {scheme.eligibility}
                        </p>
                      </div>
                      <div>
                        <h5 
                          className="font-semibold text-sm mb-1 text-[var(--color-text)]"
                        >
                          Key Benefits
                        </h5>
                        <p 
                          className="text-xs"
                          style={{ color: '#6B7280' }}
                        >
                          {scheme.benefits}
                        </p>
                      </div>
                    </div>

                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                      style={{ backgroundColor: '#2563EB' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#1E40AF'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#2563EB'}
                    >
                      Visit Official Website
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 px-4">
        <h2 
          className="text-3xl font-bold mb-4 text-[var(--color-text)]"
        >
          Need Help Finding the Right Scheme?
        </h2>
        <p 
          className="text-lg mb-8 max-w-2xl mx-auto text-[var(--color-text-secondary)]"
        >
          Our team can help you identify and apply for government schemes that match your needs and eligibility.
        </p>
        <button 
          className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          style={{ backgroundColor: '#2563EB' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1E40AF'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563EB'}
        >
          Get Assistance
        </button>
      </div>
    </div>
  );
};

export default GovernmentPage;