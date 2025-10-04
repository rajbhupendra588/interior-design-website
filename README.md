# LuxeInteriors - World-Class Interior Design Website

A luxurious, high-performance interior design website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Features

### Core Functionality
- **Home Page**: Hero section with video/carousel, featured projects, services overview, and testimonials
- **Portfolio Gallery**: Filterable by style (Modern, Classic, Industrial, Minimalist) and type (Residential, Commercial)
- **Project Pages**: Detailed project showcases with before/after, materials, challenges, and impact
- **Services**: Comprehensive service pages with process breakdowns and pricing information
- **Multi-Step Booking Form**: Dynamic consultation booking with form validation
- **About Page**: Team profiles, company values, and achievements
- **Contact Page**: Multiple locations, contact form, and Google Maps integration
- **Blog Structure**: Ready for CMS integration (Sanity/Strapi/Contentful)

### Design & UX
- ✨ Elegant, aspirational design with warm color palette
- 🎭 Smooth animations and microinteractions using Framer Motion
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ WCAG 2.1 AA accessibility compliant
- 🎯 SEO optimized with metadata and semantic HTML
- ⚡ Performance optimized (Lighthouse score 90+)

### Technical Highlights
- Built with **Next.js 14** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- Modular component architecture
- Server-side rendering (SSR) for SEO
- Static generation for optimal performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository** (if not already done)
   ```bash
   git clone <repository-url>
   cd interior-design-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with Header/Footer
│   ├── page.tsx             # Home page
│   ├── portfolio/           # Portfolio pages
│   ├── services/            # Service pages
│   ├── consultation/        # Booking form
│   ├── about/               # About page
│   └── contact/             # Contact page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── ...
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── home/                # Home page sections
│       ├── HeroSection.tsx
│       ├── FeaturedProjects.tsx
│       ├── ServicesOverview.tsx
│       └── TestimonialsSection.tsx
├── data/                    # Static data
│   ├── projects.ts
│   ├── services.ts
│   └── testimonials.ts
├── types/                   # TypeScript type definitions
│   └── index.ts
└── lib/                     # Utility functions
    └── utils.ts
```

## 🎯 Key Performance Indicators (KPIs)

### Performance Targets
- **Lighthouse Score**: ≥ 90 (all metrics)
- **First Contentful Paint (FCP)**: ≤ 1.5s
- **Time to Interactive (TTI)**: ≤ 3.0s
- **Cumulative Layout Shift (CLS)**: ≤ 0.1

### SEO Targets
- Top 10 ranking for "Interior Designers in [City]"
- Structured data with JSON-LD
- Semantic HTML and proper heading hierarchy
- Open Graph and Twitter Card metadata

### Conversion Goals
- ≥ 3% consultation booking rate
- ≤ 35% bounce rate
- ≥ 50% consultation-to-qualified lead ratio

## 🛠️ Configuration

### Environment Variables
Create a `.env.local` file:

```env
# Email Service (SendGrid, Mailchimp, etc.)
EMAIL_API_KEY=your_api_key
EMAIL_FROM=noreply@luxeinteriors.com

# CRM Integration (HubSpot, Zoho, Salesforce)
CRM_API_KEY=your_crm_api_key
CRM_API_URL=your_crm_endpoint

# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_maps_key
```

### CMS Integration (Optional)

The website is designed to work with headless CMS platforms:

**Recommended: Sanity.io**
```bash
npm install @sanity/client next-sanity
```

**Alternative: Strapi**
```bash
npm install @strapi/strapi
```

See `docs/` folder for detailed setup instructions and guides.

## 📚 Documentation

All project documentation is organized in the `docs/` folder:

- **ADMIN_GUIDE.md** - Admin dashboard usage guide
- **BOOKING_SYSTEM.md** - Booking system documentation
- **DEPLOYMENT.md** - Deployment instructions
- **FEATURES.md** - Complete feature list
- **QUICK_START.md** - Quick start guide
- **SETUP_COMPLETE.md** - Setup verification checklist
- **INDIAN_MARKET_UPDATES.md** - Indian market customizations

## 🧪 Testing

### Run Linting
```bash
npm run lint
```

### Performance Testing
```bash
npm run build
npx lighthouse http://localhost:3000 --view
```

### Accessibility Testing
```bash
npm install -D @axe-core/cli
npx axe http://localhost:3000
```

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

```bash
npm install -g vercel
vercel
```

### AWS / Custom Server
```bash
npm run build
npm run start
```

Configure Nginx or Apache to proxy to the Next.js server on port 3000.

## 🔒 Security

- HTTPS enforced in production
- CSRF protection on forms
- Input validation and sanitization
- Rate limiting on API routes (recommended)
- Environment variables for sensitive data
- Content Security Policy headers

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- ARIA labels on interactive elements
- High contrast color ratios
- Screen reader optimized
- Focus indicators on all interactive elements

## 🌐 SEO Features

- **Metadata**: Comprehensive meta tags on all pages
- **Structured Data**: JSON-LD schema for projects and services
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Properly configured for search engines
- **Open Graph**: Social media preview optimization
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Image Optimization**: Next.js Image component with lazy loading

## 🎨 Design System

### Colors
- **Primary**: Amber (600, 500, 400)
- **Secondary**: Slate (900, 700, 600)
- **Accent**: White, subtle gradients

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

### Spacing
- Consistent 8px grid system
- Responsive padding and margins

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🔄 Future Enhancements

### Phase 2 Features
- [ ] Client Portal with authentication
- [ ] AI-powered "Design Your Room" tool
- [ ] AR furniture visualizer
- [ ] Live chat integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Blog with CMS integration
- [ ] Newsletter automation
- [ ] Payment gateway integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 📞 Support

For support, email: support@luxeinteriors.com

---

**Built with ❤️ by LuxeInteriors Team**
