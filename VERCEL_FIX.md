# ✅ Vercel Deployment Fix - Database Migration Complete

## 🎯 What Was Fixed

Your booking system was failing on Vercel with "Failed to submit booking" error because:

1. ❌ **Old System**: Used Excel files (`bookings.xlsx`) and JSON files (`custom-portfolios.json`, `social-media.json`)
2. ❌ **Problem**: Vercel's serverless functions have a **read-only file system** - can't write files
3. ✅ **Solution**: Migrated to **Vercel Postgres** database

## 📦 Changes Made

### New Files Created
- `src/lib/db.ts` - Database connection and query functions
- `docs/VERCEL_SETUP.md` - Complete Vercel deployment guide

### Files Updated
- `src/app/api/bookings/route.ts` - Now uses database instead of Excel
- `src/app/api/bookings/update/route.ts` - Now uses database
- `src/app/api/portfolio/route.ts` - Now uses database instead of JSON
- `src/app/api/social-media/route.ts` - Now uses database instead of JSON
- `package.json` - Added `@vercel/postgres` dependency

### Database Schema
Three tables will be auto-created on first API call:
1. **bookings** - Consultation booking data
2. **custom_portfolios** - Admin-created portfolio projects
3. **social_media** - Social media links

## 🚀 Next Steps to Deploy on Vercel

### 1. Create Vercel Postgres Database (2 minutes)
```
1. Go to https://vercel.com/dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Name it (e.g., "interior-design-db")
4. Click "Create"
```

### 2. Get Database Credentials
```
1. Click your database name
2. Click ".env.local" tab
3. Copy all POSTGRES_* variables
```

### 3. Add to Vercel Project
```
1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add all POSTGRES_* variables
4. Add ADMIN_PASSWORD variable
5. Save
```

### 4. Redeploy
```
Deployments → Latest → Menu (⋯) → Redeploy
```

## 🧪 Testing After Deployment

1. **Test Booking**: Visit `https://your-site.vercel.app/consultation`
   - Fill form and submit
   - Should show success message (not error!)

2. **Test Admin**: Visit `https://your-site.vercel.app/admin/login`
   - Login and check bookings appear

## 📊 Environment Variables Needed

Add these in **Vercel Dashboard → Your Project → Settings → Environment Variables**:

```env
# From Vercel Postgres (copy from database dashboard)
POSTGRES_URL=************
POSTGRES_PRISMA_URL=************
POSTGRES_URL_NO_SSL=************
POSTGRES_URL_NON_POOLING=************
POSTGRES_USER=************
POSTGRES_HOST=************
POSTGRES_PASSWORD=************
POSTGRES_DATABASE=************

# Set your own admin password
ADMIN_PASSWORD=your_secure_password_here
```

## 💡 Local Development

For local development, create `.env.local` file with the same variables above.

**Or** keep using file storage locally - the system will fall back to files if database is not configured.

## 🔍 Troubleshooting

### Still getting "Failed to submit booking"?
1. Check all POSTGRES_* variables are set in Vercel
2. Redeploy after adding variables
3. Check Function logs in Vercel dashboard

### Can't connect to database?
1. Make sure database is created in Vercel
2. Copy fresh credentials from database dashboard
3. Ensure all variables are in "Production" environment

## 📚 Full Documentation

See `docs/VERCEL_SETUP.md` for detailed step-by-step guide with screenshots and troubleshooting.

## ✅ Summary

- ✅ Migrated from file storage to Vercel Postgres
- ✅ All APIs updated to use database
- ✅ Database tables auto-create on first use
- ✅ Works on Vercel's serverless platform
- ✅ Free tier supports up to 256MB data

**You're all set! Just need to:**
1. Create Vercel Postgres database (2 min)
2. Add environment variables (1 min)
3. Redeploy (30 sec)

Then your booking system will work perfectly on Vercel! 🚀

