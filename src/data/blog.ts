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

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "2025-interior-design-trends",
    title: "Top 10 Interior Design Trends Shaping Indian Homes in 2025",
    excerpt:
      "Discover the hottest interior design trends transforming Indian homes this year, from sustainable materials to Indian-inspired modern aesthetics.",
    content: `
# Top 10 Interior Design Trends Shaping Indian Homes in 2025

The Indian interior design landscape is constantly evolving, and 2025 brings exciting new trends that blend sustainability, technology, and our rich cultural heritage. Here are the top trends shaping Indian homes this year:

## 1. Sustainable and Eco-Friendly Materials

More homeowners are choosing sustainable materials like reclaimed wood, bamboo, and recycled metals. This trend reflects a growing consciousness about environmental impact.

## 2. Biophilic Design

Bringing nature indoors continues to be a major trend. Natural light, indoor plants, living walls, and natural materials create calming, health-promoting spaces.

## 3. Warm, Earthy Color Palettes

Rich terracotta, warm ochre, saffron, mustard yellows, and creamy neutrals inspired by Indian landscapes are replacing the cool grays of previous years.

## 4. Multifunctional Spaces

With remote work here to stay, homes need flexible spaces that serve multiple purposes throughout the day.

## 5. Statement Ceilings

The "fifth wall" is getting attention with bold paint colors, wallpaper, architectural details, and unique lighting.

## 6. Natural Textures

Organic textures like linen, jute, rattan, and raw wood add warmth and tactile interest to interiors.

## 7. Curved Furniture

Soft, rounded edges on furniture pieces create a more inviting and comfortable atmosphere.

## 8. Indian Heritage Pieces

Mixing traditional Indian artifacts, brass accents, handloom textiles, and vintage furniture with modern pieces adds character and celebrates our rich heritage.

## 9. Smart Home Integration

Technology is seamlessly integrated into design, from hidden charging stations to voice-controlled lighting.

## 10. Maximalism Returns

Bold patterns, rich colors, and layered textures are making a comeback for those who want personality in their spaces.

These trends offer endless possibilities for creating beautiful, functional spaces that reflect Indian aesthetics while embracing sustainability, innovation, and our cultural identity.
    `,
    author: {
      name: "Sarah Mitchell",
      role: "Senior Interior Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    category: "Trends",
    tags: ["Design Trends", "2025", "Interior Design", "Sustainability"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    publishedAt: "2025-09-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    slug: "small-space-living-tips",
    title: "Maximizing Small Spaces: 15 Genius Design Tips",
    excerpt:
      "Transform your compact living space into a functional and stylish haven with these expert-approved design strategies.",
    content: `
# Maximizing Small Spaces: 15 Genius Design Tips

Living in a small space doesn't mean sacrificing style or comfort. Here are 15 proven strategies to make the most of every square foot:

## Smart Storage Solutions

1. **Use Vertical Space**: Install floor-to-ceiling shelving to maximize storage without taking up valuable floor space.
2. **Multi-Functional Furniture**: Opt for pieces that serve double duty, like ottomans with storage or Murphy beds.
3. **Hidden Storage**: Incorporate storage under beds, stairs, and in unexpected places.

## Visual Tricks

4. **Mirrors**: Strategic mirror placement creates the illusion of more space and reflects natural light.
5. **Light Colors**: Pale walls and ceilings make rooms feel larger and more open.
6. **Continuity**: Use similar flooring throughout to create visual flow.

## Layout Optimization

7. **Open Floor Plans**: Remove unnecessary walls to create a more spacious feel.
8. **Furniture Scale**: Choose appropriately sized furniture that doesn't overwhelm the space.
9. **Clear Pathways**: Maintain open walkways to prevent the space from feeling cramped.

## Lighting Design

10. **Layer Lighting**: Combine ambient, task, and accent lighting for depth and function.
11. **Natural Light**: Maximize windows and use sheer curtains to let in light.

## Decorating Strategies

12. **Minimal Accessories**: Less is more in small spaces—edit your decor carefully.
13. **Vertical Lines**: Use vertical patterns to draw the eye upward.
14. **Transparent Furniture**: Glass and acrylic pieces maintain an open feel.
15. **Fold-Down Elements**: Install fold-down desks, tables, or ironing boards.

With thoughtful planning and creative solutions, small spaces can be just as comfortable and beautiful as larger homes.
    `,
    author: {
      name: "Michael Chen",
      role: "Space Planning Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    category: "Tips & Tricks",
    tags: ["Small Spaces", "Space Planning", "Design Tips", "Storage"],
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1200",
    publishedAt: "2025-09-10",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: "3",
    slug: "choosing-perfect-color-palette",
    title: "The Art of Choosing the Perfect Color Palette",
    excerpt:
      "Learn how to select colors that create harmony, reflect your personality, and enhance your home's architectural features.",
    content: `
# The Art of Choosing the Perfect Color Palette

Color is one of the most powerful tools in interior design. Here's your guide to creating a cohesive color scheme:

## Understanding Color Theory

Start with the basics: primary, secondary, and tertiary colors, plus complementary and analogous color schemes.

## The 60-30-10 Rule

- **60%**: Dominant color (walls, large furniture)
- **30%**: Secondary color (upholstery, curtains)
- **10%**: Accent color (accessories, art)

## Consider Your Space

- **Natural Light**: North-facing rooms benefit from warm colors
- **Room Size**: Light colors expand, dark colors create intimacy
- **Function**: Calming colors for bedrooms, energizing for offices

## Test Before Committing

Always test paint samples in your actual space under different lighting conditions throughout the day.

## Create Flow

Maintain color consistency between rooms that are visible from each other for a cohesive feel.

## Don't Forget Undertones

Pay attention to warm vs. cool undertones to ensure harmony in your palette.

The right color palette can transform your space and create the exact mood you're seeking.
    `,
    author: {
      name: "Emma Rodriguez",
      role: "Color Consultant",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    },
    category: "Design Guide",
    tags: ["Color Theory", "Paint", "Design Guide", "Color Palette"],
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200",
    publishedAt: "2025-09-05",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "4",
    slug: "sustainable-interior-design",
    title: "Sustainable Interior Design: A Complete Guide",
    excerpt:
      "Create an eco-friendly home without compromising on style. Explore sustainable materials, practices, and design principles.",
    content: `
# Sustainable Interior Design: A Complete Guide

Sustainable design is more than a trend—it's a responsibility. Here's how to create an eco-friendly home:

## Sustainable Materials

- Reclaimed and recycled materials
- FSC-certified wood
- Natural fibers (organic cotton, linen, wool)
- Low-VOC paints and finishes
- Bamboo and cork flooring

## Energy Efficiency

- LED lighting throughout
- Energy-efficient appliances
- Smart home systems for optimization
- Proper insulation
- Strategic window placement

## Reduce, Reuse, Recycle

- Refurbish existing furniture
- Shop vintage and secondhand
- Choose quality over quantity
- Donate unwanted items

## Local and Ethical Sourcing

Support local artisans and companies with ethical practices.

## Longevity Over Trends

Invest in timeless pieces that won't need replacing frequently.

## Indoor Air Quality

- Use natural air purifiers (plants)
- Choose non-toxic materials
- Ensure proper ventilation

Sustainable design proves you don't have to sacrifice beauty for environmental responsibility.
    `,
    author: {
      name: "Sarah Mitchell",
      role: "Senior Interior Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    category: "Sustainability",
    tags: ["Sustainability", "Eco-Friendly", "Green Design", "Environment"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200",
    publishedAt: "2025-08-28",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "5",
    slug: "lighting-design-basics",
    title: "Lighting Design 101: Illuminating Your Home",
    excerpt:
      "Master the fundamentals of lighting design to create ambiance, functionality, and visual interest in every room.",
    content: `
# Lighting Design 101: Illuminating Your Home

Good lighting design can make or break a space. Here's everything you need to know:

## The Three Types of Lighting

### 1. Ambient Lighting
General illumination for the entire room (ceiling fixtures, recessed lights).

### 2. Task Lighting
Focused light for specific activities (desk lamps, under-cabinet lighting, reading lights).

### 3. Accent Lighting
Highlights architectural features or artwork (track lighting, wall sconces, picture lights).

## Layering is Key

Combine all three types for a well-lit, versatile space that works in any situation.

## Color Temperature Matters

- **Warm (2700K-3000K)**: Cozy, relaxing spaces
- **Neutral (3500K-4100K)**: Functional areas
- **Cool (5000K-6500K)**: Task-oriented spaces

## Dimmer Switches

Install dimmers for flexibility and mood control.

## Natural Light First

Maximize natural light, then supplement with artificial sources.

## Room-Specific Tips

- **Kitchen**: Bright task lighting over work areas
- **Bedroom**: Soft, warm lighting on dimmers
- **Bathroom**: Even lighting around mirrors
- **Living Room**: Multiple light sources at different heights

Proper lighting transforms not just how your space looks, but how it feels.
    `,
    author: {
      name: "David Park",
      role: "Lighting Design Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    category: "Design Guide",
    tags: ["Lighting", "Design Guide", "Ambiance", "Interior Design"],
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200",
    publishedAt: "2025-08-20",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: "6",
    slug: "mixing-design-styles",
    title: "The Art of Mixing Design Styles Successfully",
    excerpt:
      "Learn how to blend different design aesthetics to create a unique, cohesive space that reflects your personality.",
    content: `
# The Art of Mixing Design Styles Successfully

Creating an eclectic, personalized space by mixing styles requires skill and restraint. Here's how:

## Start with a Foundation

Choose one dominant style (70%) and complement with others (30%).

## Find Common Ground

Look for unifying elements:
- Color palette
- Material or finish
- Scale or proportion
- Mood or era

## Balance Opposites

Pair sleek modern pieces with rustic elements, or traditional furniture with contemporary art.

## Use the Rule of Three

Combine no more than three distinct styles to avoid chaos.

## Repetition Creates Cohesion

Repeat colors, materials, or shapes throughout the space.

## Trust Your Instincts

If something feels right together, it probably is.

## Examples That Work

- **Modern + Rustic**: Clean lines with natural textures
- **Traditional + Industrial**: Classic furniture with metal accents
- **Bohemian + Minimalist**: Curated global pieces in sparse settings
- **Mid-Century + Contemporary**: Vintage classics with current design

The key is creating dialogue between pieces rather than discord. Mixed styles done right feel intentional and sophisticated.
    `,
    author: {
      name: "Michael Chen",
      role: "Space Planning Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    category: "Design Guide",
    tags: ["Design Styles", "Eclectic", "Interior Design", "Mixing Styles"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200",
    publishedAt: "2025-08-12",
    readTime: "7 min read",
    featured: true,
  },
];

export const blogCategories = [
  "All",
  "Trends",
  "Tips & Tricks",
  "Design Guide",
  "Sustainability",
  "Before & After",
];

