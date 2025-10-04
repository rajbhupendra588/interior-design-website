# 🚀 Quick Start Guide

Get your LuxeInteriors website up and running in 5 minutes!

## ✅ Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Code editor (VS Code recommended)

## 📦 Step 1: Installation

The project is already initialized. Simply install dependencies:

```bash
cd interior-design-website
npm install
```

This will install all required packages (~388 packages, ~2 minutes).

## 🏃 Step 2: Start Development Server

```bash
npm run dev
```

The website will be available at: **http://localhost:3000**

## 🌐 Step 3: Explore the Site

Visit these pages to see all features:

- **Home:** http://localhost:3000
- **Portfolio:** http://localhost:3000/portfolio
- **Services:** http://localhost:3000/services
- **Consultation:** http://localhost:3000/consultation
- **About:** http://localhost:3000/about
- **Contact:** http://localhost:3000/contact

## 📝 Step 4: Customize Content

### Replace Placeholder Images

1. Add your project photos to `/public/images/`
2. Update image URLs in:
   - `/src/data/projects.ts`
   - `/src/components/home/HeroSection.tsx`

### Update Company Information

Edit these files:
- `/src/components/layout/Footer.tsx` - Phone, email, address
- `/src/app/about/page.tsx` - Team members, company story
- `/src/data/projects.ts` - Your actual projects
- `/src/data/services.ts` - Your service offerings
- `/src/data/testimonials.ts` - Real client testimonials

### Update Metadata

Edit `/src/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Your Company Name",
  description: "Your description",
  // ... other metadata
};
```

## 🎨 Step 5: Customize Branding

### Change Colors

Edit `/tailwind.config.ts` and search/replace:
- `amber` → your primary color
- `slate` → your secondary color

### Change Fonts

Edit `/src/app/layout.tsx`:
```typescript
// Replace with your preferred fonts
import { YourFont } from "next/font/google";
```

### Update Logo

Replace "LuxeInteriors" text in:
- `/src/components/layout/Header.tsx`
- `/src/components/layout/Footer.tsx`

Or add a logo image:
```tsx
<Image src="/logo.svg" alt="Your Logo" width={200} height={50} />
```

## 🔐 Step 6: Configure Environment Variables

Create `.env.local` file in the root:

```env
# Email Service (for contact forms)
EMAIL_API_KEY=your_sendgrid_api_key
EMAIL_FROM=hello@yourcompany.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key

# WhatsApp Number (without + or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

## 🧪 Step 7: Test Everything

### Run Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Test Production Build
```bash
npm start
```

## 🚀 Step 8: Deploy

### Option A: Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
npx vercel
```

### Option B: Deploy to Your Server

See `DEPLOYMENT.md` for AWS, Docker, and VPS deployment instructions.

## 📊 Step 9: Monitor & Optimize

### Set Up Analytics
1. Create Google Analytics 4 property
2. Add tracking ID to `.env.local`
3. Verify tracking works

### Run Lighthouse Audit
```bash
npm run build
npx lighthouse http://localhost:3000 --view
```

Target scores: Performance ≥ 90, Accessibility = 100, SEO ≥ 90

## 🎯 Common Tasks

### Add a New Project
Edit `/src/data/projects.ts`:
```typescript
{
  id: "7",
  slug: "your-project-slug",
  title: "Your Project Title",
  description: "Description...",
  category: "Residential", // or "Commercial"
  style: "Modern", // Modern, Classic, Industrial, Minimalist
  images: [...],
  // ... other fields
}
```

### Add a New Service
Edit `/src/data/services.ts` and follow the same structure.

### Update Contact Information
Edit `/src/components/layout/Footer.tsx` and `/src/app/contact/page.tsx`

### Change WhatsApp Number
Update in:
- `/src/components/layout/Footer.tsx`
- `.env.local` (NEXT_PUBLIC_WHATSAPP_NUMBER)

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 npm run dev
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules/.cache
npm install
npm run build
```

### Images Not Loading
- Ensure images are in `/public/images/`
- Use relative paths: `/images/your-image.jpg`
- For external images, add domain to `next.config.js`:
```javascript
images: {
  domains: ['yourdomain.com'],
}
```

### Styling Issues
```bash
# Rebuild Tailwind
npm run dev
# Ctrl+C and restart
```

## 📚 Learn More

- **Full Documentation:** See `README.md`
- **Deployment Guide:** See `DEPLOYMENT.md`
- **Features List:** See `FEATURES.md`
- **Project Overview:** See `PROJECT_SUMMARY.md`

## 🆘 Need Help?

### Common Issues
1. **TypeScript errors:** Run `npm run type-check`
2. **Linting errors:** Run `npm run lint`
3. **Build errors:** Check `node_modules` installation
4. **Styling not working:** Restart dev server

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ✨ Pro Tips

1. **Use Real Content ASAP** - Replace lorem ipsum with actual content
2. **Optimize Images** - Use WebP format, compress before uploading
3. **Test on Real Devices** - Don't just rely on browser dev tools
4. **Monitor Performance** - Set up Google Analytics from day one
5. **Backup Regularly** - Commit to Git frequently
6. **Use Vercel Preview** - Test changes before deploying to production
7. **Ask for Feedback** - Show to real users and iterate

## 🎉 You're Ready!

Your beautiful interior design website is ready to launch. Good luck! 🚀

---

**Quick Commands Reference:**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

**Need immediate help?** Check `PROJECT_SUMMARY.md` for comprehensive information!

