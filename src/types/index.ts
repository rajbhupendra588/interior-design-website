export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Residential" | "Commercial";
  style: "Modern" | "Classic" | "Industrial" | "Minimalist";
  images: {
    url: string;
    alt: string;
    isBefore?: boolean;
  }[];
  beforeImage?: string;
  afterImage?: string;
  materials: string[];
  challenges?: string;
  impact?: string;
  year: number;
  location: string;
  area?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  duration?: string;
  startingPrice?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
  projectImage?: string;
  videoUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  areaSize: string;
  budget: string;
  appointmentDate: string;
  appointmentTime: string;
  message?: string;
}

export interface Booking {
  ID: string;
  Timestamp: string;
  Name: string;
  Email: string;
  Phone: string;
  Location: string;
  "Project Type": string;
  "Area Size": string;
  Budget: string;
  "Appointment Date": string;
  "Appointment Time": string;
  Message: string;
  Status: string;
}

export interface SocialMedia {
  id: string;
  name: string;
  platform: "Instagram" | "Facebook" | "LinkedIn" | "Twitter" | "YouTube" | "Pinterest" | "TikTok" | "WhatsApp" | "Other";
  url: string;
  icon?: string;
  enabled: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}


