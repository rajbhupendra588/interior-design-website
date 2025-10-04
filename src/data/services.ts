import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    slug: "full-interior-design",
    title: "Full Interior Design & Execution",
    description: "End-to-end interior design services from concept to completion. We handle everything from space planning and material selection to project management and final styling.",
    icon: "home",
    features: [
      "Comprehensive space planning and layout design",
      "Custom furniture design and selection",
      "Material and finish specification",
      "Lighting design and electrical planning",
      "Project management and contractor coordination",
      "Final styling and art curation",
      "Post-completion support and maintenance guidance",
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Consultation",
        description: "We begin with an in-depth consultation to understand your vision, lifestyle, and functional requirements.",
      },
      {
        step: 2,
        title: "Concept Development",
        description: "Our team creates mood boards, 3D visualizations, and material palettes that bring your vision to life.",
      },
      {
        step: 3,
        title: "Design Development",
        description: "Detailed drawings, specifications, and selections are finalized with your approval.",
      },
      {
        step: 4,
        title: "Execution & Project Management",
        description: "We coordinate with contractors, suppliers, and artisans to ensure flawless execution.",
      },
      {
        step: 5,
        title: "Installation & Styling",
        description: "Final touches including furniture placement, art installation, and styling to perfection.",
      },
    ],
    duration: "3-6 months",
    startingPrice: "₹15 Lakhs+",
  },
  {
    id: "2",
    slug: "3d-visualization",
    title: "3D Visualization & Mood Boards",
    description: "Bring your design vision to life with photorealistic 3D renderings and carefully curated mood boards before any physical work begins.",
    icon: "box",
    features: [
      "Photorealistic 3D renderings",
      "Virtual walkthroughs and 360° views",
      "Multiple design options and variations",
      "Mood boards with material samples",
      "Color palette development",
      "Furniture and decor visualization",
      "Revision rounds included",
    ],
    process: [
      {
        step: 1,
        title: "Brief & Requirements",
        description: "Share your space measurements, inspiration images, and preferences.",
      },
      {
        step: 2,
        title: "Mood Board Creation",
        description: "We develop mood boards exploring different design directions.",
      },
      {
        step: 3,
        title: "3D Modeling",
        description: "Your selected direction is translated into detailed 3D models.",
      },
      {
        step: 4,
        title: "Rendering & Presentation",
        description: "Receive photorealistic renderings and virtual walkthroughs for review.",
      },
    ],
    duration: "2-4 weeks",
    startingPrice: "₹50,000",
  },
  {
    id: "3",
    slug: "furniture-decor-curation",
    title: "Furniture & Decor Curation",
    description: "Expert selection and sourcing of furniture, lighting, art, and accessories that perfectly complement your space and style.",
    icon: "armchair",
    features: [
      "Personalized furniture selection",
      "Custom furniture design options",
      "Art and accessory curation",
      "Lighting fixtures and lamps",
      "Textile and soft furnishing selection",
      "Vendor coordination and procurement",
      "White-glove delivery and installation",
    ],
    process: [
      {
        step: 1,
        title: "Style Assessment",
        description: "Understand your aesthetic preferences, budget, and functional needs.",
      },
      {
        step: 2,
        title: "Curation & Presentation",
        description: "Present carefully selected options with pricing and lead times.",
      },
      {
        step: 3,
        title: "Procurement",
        description: "Order management, quality checks, and delivery coordination.",
      },
      {
        step: 4,
        title: "Installation & Styling",
        description: "Professional placement and styling for the perfect finish.",
      },
    ],
    duration: "4-8 weeks",
    startingPrice: "₹75,000",
  },
  {
    id: "4",
    slug: "commercial-projects",
    title: "Commercial Projects",
    description: "Transform your commercial space into an environment that enhances brand identity, improves functionality, and creates memorable experiences.",
    icon: "building",
    features: [
      "Office and workspace design",
      "Retail and showroom design",
      "Restaurant and hospitality design",
      "Healthcare facility design",
      "Brand-aligned interior strategy",
      "Ergonomics and workflow optimization",
      "Compliance with commercial codes and standards",
    ],
    process: [
      {
        step: 1,
        title: "Business Analysis",
        description: "Understand your brand, business goals, and operational requirements.",
      },
      {
        step: 2,
        title: "Strategic Design",
        description: "Develop designs that align with business objectives and user experience.",
      },
      {
        step: 3,
        title: "Documentation",
        description: "Comprehensive drawings, specifications, and compliance documentation.",
      },
      {
        step: 4,
        title: "Implementation",
        description: "Phased execution to minimize business disruption.",
      },
      {
        step: 5,
        title: "Post-Occupancy",
        description: "Support and adjustments based on real-world usage feedback.",
      },
    ],
    duration: "4-12 months",
    startingPrice: "₹30 Lakhs+",
  },
];


