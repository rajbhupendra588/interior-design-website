# Portfolio Guide

## Portfolio Pages Structure

The website now includes **100 diverse portfolio projects** across all design styles and categories.

### URL Structure

The website uses internationalization (i18n) routing. Portfolio pages are accessed with locale prefixes:

- **English:** `/en/portfolio` or just `/portfolio` (default)
- **Hindi:** `/hi/portfolio`

### Portfolio Pages

1. **Portfolio Listing Page:** `/portfolio`
   - Displays all 100 projects in a grid
   - Filter by Category (Residential, Commercial)
   - Filter by Style (Modern, Classic, Industrial, Minimalist)
   - Search by name, location, or description
   - Real-time results count

2. **Individual Project Pages:** `/portfolio/[project-slug]`
   - Detailed project information
   - Materials & finishes
   - Design challenges
   - Project impact
   - Location, area, and year
   - Related projects
   - Call-to-action for consultations

### Portfolio Breakdown

**By Style:**
- Modern: 30 projects
- Industrial: 10 projects
- Classic: 15 projects
- Minimalist: 15 projects
- Mixed: 30 projects

**By Category:**
- Residential: 70 projects
- Commercial: 30 projects

**Locations:** Projects span across major Indian cities including Mumbai, Bangalore, Delhi, Pune, Hyderabad, Chennai, Kolkata, Jaipur, Goa, Ahmedabad, and more.

### Features

1. **Advanced Filtering**
   - Filter by category (Residential/Commercial)
   - Filter by style (Modern/Classic/Industrial/Minimalist)
   - Search functionality
   - Sticky filter bar for easy navigation

2. **Project Details**
   - Comprehensive project descriptions
   - Materials used
   - Design challenges faced
   - Project impact and results
   - Before/after sections (where applicable)
   - Related projects suggestions

3. **Responsive Design**
   - Mobile-first approach
   - Grid layout adapts to screen size
   - Touch-friendly navigation
   - Optimized for all devices

### Sample Projects

1. **Modern Luxury Apartment** - Mumbai (2,500 sq ft)
2. **Industrial Loft Conversion** - Bangalore (3,000 sq ft)
3. **Classic Victorian Restoration** - Delhi (4,200 sq ft)
4. **Minimalist Penthouse Retreat** - Pune (1,800 sq ft)
5. **Boutique Hotel Lobby** - Goa (5,000 sq ft)
... and 95 more!

### How to Access

1. Navigate to the homepage
2. Click "Portfolio" in the navigation menu
3. Use filters to browse projects
4. Click any project card to view full details

### Development Notes

- Portfolio data is in `/src/data/projects.ts`
- Portfolio listing page: `/src/app/[locale]/portfolio/page.tsx`
- Individual project page: `/src/app/[locale]/portfolio/[slug]/page.tsx`
- All projects use consistent slugs for SEO-friendly URLs

### SEO Optimization

- Each project has unique meta descriptions
- SEO-friendly URLs (slugified titles)
- Structured data for rich snippets
- Open Graph tags for social sharing
- Alt text for all images

### Future Enhancements

- Image galleries with lightbox
- Client testimonials per project
- Award badges and certifications
- Video walkthroughs
- 360° virtual tours
- Download project PDFs
- Social sharing buttons

