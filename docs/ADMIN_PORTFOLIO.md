# Admin Portfolio Management Guide

## Overview

The Admin Portfolio Management system allows administrators to easily add new portfolio projects through a simple web interface without touching code.

## Accessing Portfolio Management

1. Log in to the admin panel at `/admin/login`
2. From the Admin Dashboard, click the **"Portfolio"** button in the top navigation
3. You'll be directed to `/admin/portfolio`

## Adding a New Portfolio

### Required Fields

- **Project Title**: The name of your project (e.g., "Modern Luxury Apartment")
- **Description**: A detailed description of the project
- **Category**: Choose between "Residential" or "Commercial"
- **Style**: Choose from "Modern", "Classic", "Industrial", or "Minimalist"
- **Location**: City and state/region (e.g., "Mumbai, Maharashtra")

### Optional Fields

- **Area Size**: Project square footage (e.g., "2,500 sq ft")
- **Year**: Year of completion (defaults to current year)
- **Image URL**: Direct URL to a project image (leave empty to use placeholder)
- **Materials**: Comma-separated list of materials used (e.g., "Oak Wood, Marble, Brass Fixtures")
- **Design Challenges**: Description of challenges faced during the project
- **Project Impact**: The outcome and impact of the project

## How It Works

### Data Storage

- Custom portfolios are stored in `/data/custom-portfolios.json`
- The file is automatically created on first use
- All custom portfolios are merged with existing static portfolios

### Display

- Custom portfolios appear on the main portfolio page (`/portfolio`) alongside existing projects
- They can be filtered by category and style just like static projects
- Each portfolio has its own detail page at `/portfolio/[slug]`

### URL Structure

When you create a portfolio with the title "Modern Luxury Apartment", the system automatically:
1. Creates a URL-friendly slug: `modern-luxury-apartment-1234567890`
2. Generates a unique ID: `custom-1234567890`
3. Makes it accessible at `/portfolio/modern-luxury-apartment-1234567890`

## Features

### Simple Form Interface

- Clean, intuitive form with clear labels
- Required fields are marked with *
- Dropdown menus for Category and Style to ensure consistency
- Large text areas for descriptions

### Real-time Portfolio List

- View all your custom portfolios in the sidebar
- See portfolio count at a glance
- Each portfolio shows its category, style, location, and year

### Success Feedback

- Green success message appears when a portfolio is added
- Form automatically clears after successful submission
- Portfolio list refreshes to show the new entry

### Integration with Existing Portfolios

- Custom portfolios appear alongside 100 existing sample portfolios
- No distinction to end users - they all look the same
- Same filtering and search capabilities apply

## Tips for Best Results

### Images

- Use high-quality images (minimum 800px wide)
- Recommended image hosting: Unsplash, Cloudinary, or your own CDN
- If no image URL provided, a placeholder will be used

### Descriptions

- Write detailed descriptions (2-3 sentences minimum)
- Highlight unique features and design elements
- Use professional language that resonates with clients

### Materials

- List materials in order of prominence
- Use proper names (e.g., "Italian Marble" not just "marble")
- Separate with commas for clean display

### Challenges & Impact

- Be specific about challenges faced
- Quantify impact where possible (e.g., "increased property value by 35%")
- These sections add credibility and showcase expertise

## Technical Details

### API Endpoints

- **POST /api/portfolio**: Add a new portfolio (requires authentication)
- **GET /api/portfolio**: Fetch all custom portfolios (requires authentication)

### Authentication

- All portfolio management requires admin authentication
- Uses the same token system as booking management
- Unauthorized access returns 401 error

### File Structure

```
data/
  └── custom-portfolios.json    # Custom portfolios storage

src/
  ├── app/
  │   ├── admin/
  │   │   └── portfolio/
  │   │       └── page.tsx      # Admin portfolio management UI
  │   └── api/
  │       └── portfolio/
  │           └── route.ts      # API endpoints
  └── lib/
      └── portfolio.ts          # Utility functions
```

## Troubleshooting

### "Unauthorized" Error

- Ensure you're logged in to the admin panel
- Your session may have expired - try logging in again

### Portfolio Not Showing

- Check that all required fields are filled
- Refresh the portfolio page (`/portfolio`)
- Check browser console for any errors

### Image Not Displaying

- Verify the image URL is publicly accessible
- Check if the URL starts with `http://` or `https://`
- Try opening the URL in a new browser tab to test

## Future Enhancements

Potential features for future versions:

- Image upload capability (vs. URL only)
- Edit existing portfolios
- Delete portfolios
- Bulk import via CSV
- Image galleries (multiple images per project)
- Drag-and-drop reordering
- Portfolio categories/tags
- Featured portfolio toggle

## Support

For issues or questions about the portfolio management system, check:
1. This documentation
2. The main README.md
3. Other documentation in the `/docs` folder

