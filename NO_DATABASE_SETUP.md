# ✅ No Database Required - File-Based Storage

## 🎉 Good News!

Your LuxeInteriors website now works **without needing a database** for local development!

## 📦 How It Works

The application now uses a **hybrid storage adapter** that automatically switches between:

- **Local Development**: Uses Excel files and JSON files
- **Production (Vercel)**: Uses Vercel Postgres database (if available)

### Storage Locations:

```
data/
  ├── bookings.xlsx          ← Consultation bookings
  ├── custom-portfolios.json ← Admin-created portfolios
  └── social-media.json      ← Social media links
```

## 🚀 Running Locally

```bash
# Just start the dev server - no database needed!
npm run dev
```

Visit **http://localhost:3000** and everything works:
- ✅ Booking form
- ✅ Admin dashboard  
- ✅ Portfolio management
- ✅ Social media links

## 👨‍💼 Admin Access

- URL: `http://localhost:3000/admin/login`
- Password: `admin123` (set in `.env.local`)

## 🌐 Deploying to Vercel (Optional Database)

### Option 1: Without Database (File Storage)

⚠️ **NOT RECOMMENDED** for production - Vercel has read-only filesystem

### Option 2: With Vercel Postgres

If Vercel Postgres is available in your region:

1. **Create Database**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Storage → Create Database → Postgres
   - Copy all environment variables

2. **Add to Vercel Project**:
   - Project Settings → Environment Variables
   - Add all `POSTGRES_*` variables
   - Add `ADMIN_PASSWORD`

3. **Deploy**:
   - The app will automatically detect the database
   - All data will be stored in Postgres

### Option 3: Alternative Databases

If Vercel Postgres isn't available, you can:

1. **Use Supabase** (Free Postgres):
   - Create account at https://supabase.com
   - Create project → Get connection string
   - Add as `POSTGRES_URL` in Vercel

2. **Use Neon** (Free Postgres):
   - Create account at https://neon.tech
   - Create project → Get connection string
   - Use the **pooled** connection string

3. **Use Railway** (Free tier):
   - Create account at https://railway.app
   - Add Postgres → Get connection string

## 🔧 Technical Details

### Storage Adapter Logic

```typescript
// In src/lib/storage.ts
if (process.env.POSTGRES_URL) {
  // Use database
  return databaseAdapter;
} else {
  // Use files (Excel + JSON)
  return fileAdapter;
}
```

The app checks for `POSTGRES_URL` environment variable:
- **Found**: Uses Vercel Postgres
- **Not Found**: Uses local files

### Files Modified

The following API routes now use the hybrid storage:
- `/api/bookings` - Create/read bookings
- `/api/bookings/update` - Update booking status
- `/api/portfolio` - Manage portfolios
- `/api/social-media` - Manage social links

## 📝 Local Development Workflow

1. **Test Booking Form**:
   ```bash
   open http://localhost:3000/en/consultation
   ```
   - Fill and submit form
   - Check `data/bookings.xlsx`

2. **View in Admin**:
   ```bash
   open http://localhost:3000/admin/login
   ```
   - Login with `admin123`
   - See bookings in dashboard

3. **Add Portfolio**:
   - Go to Admin → Portfolio
   - Add new project
   - Check `data/custom-portfolios.json`

## 🔒 Security Notes

- **Local files are safe** for development
- **Never commit** `.env.local` to Git
- **Change admin password** for production
- **Use database** for production deployment

## ✨ Benefits of This Approach

✅ **No database setup needed** for local development  
✅ **Works offline** - no internet required  
✅ **Fast development** - no connection delays  
✅ **Easy debugging** - inspect Excel/JSON files directly  
✅ **Automatic migration** - add database later without code changes  

## 🐛 Troubleshooting

### Booking form shows error

**Check**: `data/bookings.xlsx` file permissions
```bash
ls -la data/
chmod 644 data/bookings.xlsx
```

### Admin dashboard empty

**Check**: Data files exist
```bash
cat data/bookings.xlsx
cat data/custom-portfolios.json
```

### Social media links missing

**Check**: JSON file is valid
```bash
cat data/social-media.json | jq '.'
```

## 📚 Related Documentation

- `LOCAL_DEVELOPMENT_SETUP.md` - Database setup (if you want it)
- `docs/VERCEL_SETUP.md` - Production deployment guide
- `README.md` - General project information

---

**Current Status**: ✅ Running in FILE mode (no database required)

Your website is fully functional without any external dependencies!

