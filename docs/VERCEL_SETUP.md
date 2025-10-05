# Vercel Deployment Setup Guide

## 🚨 Important: Database Required for Vercel

Your booking system, portfolio management, and social media features now use **Vercel Postgres** instead of file storage (Excel/JSON files). This is required because Vercel's serverless functions have a read-only file system.

## 📋 Prerequisites

1. A Vercel account (free tier is fine)
2. Your project pushed to GitHub
3. 5 minutes of setup time

## 🚀 Step-by-Step Setup

### Step 1: Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Storage** in the left sidebar
3. Click **Create Database**
4. Select **Postgres**
5. Choose a name (e.g., `interior-design-db`)
6. Select a region close to your users
7. Click **Create**

### Step 2: Get Database Connection Strings

After creating the database:

1. Click on your database name
2. Go to the **.env.local** tab
3. Copy all the environment variables (they look like this):
   ```env
   POSTGRES_URL="************"
   POSTGRES_PRISMA_URL="************"
   POSTGRES_URL_NO_SSL="************"
   POSTGRES_URL_NON_POOLING="************"
   POSTGRES_USER="************"
   POSTGRES_HOST="************"
   POSTGRES_PASSWORD="************"
   POSTGRES_DATABASE="************"
   ```

### Step 3: Deploy Your Project

#### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **Import Project**
3. Select your GitHub repository
4. In **Environment Variables**, add:
   - All the Postgres variables from Step 2
   - `ADMIN_PASSWORD` (set to your desired admin password)
5. Click **Deploy**

#### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables (when prompted)
# Or add them in the Vercel dashboard
```

### Step 4: Configure Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `POSTGRES_URL` | (from database) | Production, Preview, Development |
| `POSTGRES_PRISMA_URL` | (from database) | Production, Preview, Development |
| `POSTGRES_URL_NO_SSL` | (from database) | Production, Preview, Development |
| `POSTGRES_URL_NON_POOLING` | (from database) | Production, Preview, Development |
| `POSTGRES_USER` | (from database) | Production, Preview, Development |
| `POSTGRES_HOST` | (from database) | Production, Preview, Development |
| `POSTGRES_PASSWORD` | (from database) | Production, Preview, Development |
| `POSTGRES_DATABASE` | (from database) | Production, Preview, Development |
| `ADMIN_PASSWORD` | Your admin password | Production, Preview, Development |

### Step 5: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**

## 🧪 Testing Your Deployment

1. **Test Booking System**: Visit `https://your-domain.vercel.app/consultation`
   - Fill out the form and submit
   - Check if it saves successfully

2. **Test Admin Dashboard**: Visit `https://your-domain.vercel.app/admin/login`
   - Login with your admin password
   - Check if you can see the bookings

3. **Test Portfolio Management**: Visit `https://your-domain.vercel.app/admin/portfolio`
   - Try adding a new portfolio project

## 🔍 Troubleshooting

### "Failed to submit booking" Error

**Cause**: Database connection not configured

**Solution**:
1. Check that all Postgres environment variables are set in Vercel
2. Make sure you redeployed after adding the variables
3. Check deployment logs for errors

### Database Connection Errors

**Cause**: Invalid connection strings or database not created

**Solution**:
1. Go to Vercel Dashboard → Storage
2. Make sure your Postgres database is active
3. Copy fresh connection strings from the **.env.local** tab
4. Replace all environment variables in your project settings

### 401 Unauthorized on Admin Pages

**Cause**: `ADMIN_PASSWORD` not set or incorrect

**Solution**:
1. Go to Project Settings → Environment Variables
2. Add/update `ADMIN_PASSWORD`
3. Redeploy the project

## 📊 Database Schema

The database automatically creates these tables on first use:

### `bookings` Table
- Stores consultation booking requests
- Columns: id, timestamp, name, email, phone, location, project_type, area_size, budget, appointment_date, appointment_time, message, status

### `custom_portfolios` Table
- Stores admin-created portfolio projects
- Columns: id, title, description, category, style, location, area_size, year, image_url, materials, challenges, impact, created_at

### `social_media` Table
- Stores social media links
- Columns: id, platform, url, enabled, created_at, updated_at

## 🔐 Security Notes

1. **Never commit** `.env` or `.env.local` files to Git
2. **Change the default admin password** in production
3. Database credentials are managed by Vercel (auto-rotated)
4. All API routes that modify data require admin authentication

## 💰 Pricing

- **Vercel Postgres**: 
  - Free tier: 256 MB storage, 60 hours of compute per month
  - Hobby: $0.25/GB storage, $0.10/compute hour
  - Perfect for small to medium websites

- **Vercel Hosting**:
  - Hobby (free): Perfect for personal projects
  - Pro: $20/month for commercial projects

## 📚 Additional Resources

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## ✅ Checklist

- [ ] Created Vercel Postgres database
- [ ] Copied all environment variables
- [ ] Added variables to Vercel project settings
- [ ] Deployed/Redeployed project
- [ ] Tested booking form submission
- [ ] Tested admin login
- [ ] Changed default admin password
- [ ] Bookings are saving successfully

## 🆘 Need Help?

If you're still having issues:

1. Check Vercel deployment logs: Dashboard → Deployments → Click deployment → **Runtime Logs**
2. Check Function logs for specific errors
3. Verify all environment variables are set correctly
4. Make sure database is in the same region as your deployment

---

**Note**: The old Excel/JSON file storage will still work locally during development, but Vercel deployment requires the database setup described above.

