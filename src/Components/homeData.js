// Centralized data for the Home page
export const platforms = [
  "Google", "Paytm", "UPI", "Aadhaar", "DigiLocker", "NPCI", "WhatsApp", "YouTube"
];

export const events = [
  {
    id: 1,
    date: "Sept 15",
    title: "Digital Literacy Workshop",
    location: "Mumbai",
    attendees: 150
  },
  {
    id: 2,
    date: "Sept 22",
    title: "UPI Payment Training",
    location: "Delhi",
    attendees: 200
  },
  {
    id: 3,
    date: "Oct 5",
    title: "Aadhaar Services Guide",
    location: "Bangalore",
    attendees: 120
  }
];

export const videos = [
  {
    id: 1,
    title: "Tech Tutorial 1: Learn Modern Development",
    duration: "29:29",
    views: "187K",
    timeAgo: "22 days ago"
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts for Beginners",
    duration: "15:42",
    views: "92K",
    timeAgo: "15 days ago"
  },
  {
    id: 3,
    title: "React Hooks Deep Dive: useState & useEffect",
    duration: "22:15",
    views: "156K",
    timeAgo: "8 days ago"
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    duration: "18:33",
    views: "78K",
    timeAgo: "12 days ago"
  }
];

export const schemes = [
  {
    id: 1,
    title: "PM Digital India",
    description: "Empowering citizens through digital literacy programs",
    color: "green",
    link: "/schemes"
  },
  {
    id: 2,
    title: "Skill Development",
    description: "Free training programs for digital skills enhancement",
    color: "blue",
    link: "/schemes"
  },
  {
    id: 3,
    title: "Financial Inclusion",
    description: "Digital banking and payment solutions for all",
    color: "purple",
    link: "/schemes"
  },
  {
    id: 4,
    title: "Digital Health",
    description: "Online healthcare services and telemedicine",
    color: "teal",
    link: "/schemes"
  }
];

export const getColorClasses = (color) => {
  const colors = {
    green: { bg: "bg-green-100", text: "text-green-600", button: "bg-green-500 hover:bg-green-600" },
    blue: { bg: "bg-blue-100", text: "text-blue-600", button: "bg-blue-500 hover:bg-blue-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", button: "bg-purple-500 hover:bg-purple-600" },
    teal: { bg: "bg-teal-100", text: "text-teal-600", button: "bg-teal-500 hover:bg-teal-600" }
  };
  return colors[color] || colors.blue;
};