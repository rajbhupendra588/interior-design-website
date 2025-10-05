# Social Media Management Guide

## Overview
The admin panel now includes a comprehensive social media management system that allows you to add, edit, reorder, and manage multiple social media links displayed on your website footer.

## Features

### ✨ Key Capabilities
- ✅ **Add Multiple Platforms**: Support for Instagram, Facebook, LinkedIn, Twitter, YouTube, Pinterest, TikTok, WhatsApp, and custom platforms
- ✅ **Show/Hide Links**: Toggle visibility without deleting links
- ✅ **Reorder Links**: Control the display order with up/down arrows
- ✅ **Edit Links**: Update name, platform, and URL
- ✅ **Delete Links**: Remove unwanted social media links
- ✅ **Real-time Updates**: Footer updates automatically when links are changed
- ✅ **Secure Access**: Admin authentication required for all changes

## How to Access

### Step 1: Login to Admin Panel
1. Navigate to: `http://your-domain.com/admin/login`
2. Enter admin password: **`admin123`**
3. Click "Login"

### Step 2: Navigate to Social Media Management
- From the admin dashboard, click the **"Social Media"** button in the top-right corner
- Or directly visit: `http://your-domain.com/admin/social-media`

## Managing Social Media Links

### Add New Social Media Link
1. Click the **"Add Social Media"** button
2. Fill in the form:
   - **Display Name**: The name shown on hover (e.g., "Instagram")
   - **Platform**: Select from dropdown (Instagram, Facebook, LinkedIn, etc.)
   - **URL**: Full URL including https:// (e.g., https://instagram.com/yourprofile)
3. Click **"Add Social Media"**

### Edit Existing Link
1. Find the social media link you want to edit
2. Click the **Edit** button (pencil icon)
3. Update the fields as needed
4. Click **"Save"** to confirm or **"Cancel"** to discard changes

### Show/Hide Links
- Click the **Eye icon** to toggle visibility
- Hidden links won't appear on the website footer but remain in the admin panel
- Useful for temporarily disabling social media accounts

### Reorder Links
- Use the **up arrow** (↑) to move a link higher in the display order
- Use the **down arrow** (↓) to move a link lower in the display order
- The order in the admin panel reflects the order on the website footer

### Delete Links
1. Click the **Trash icon** on the link you want to remove
2. Confirm the deletion in the popup dialog
3. The link will be permanently removed

## Supported Platforms

The system supports the following social media platforms with matching icons:

| Platform | Icon | Example URL |
|----------|------|-------------|
| **Instagram** | Instagram icon | https://instagram.com/yourprofile |
| **Facebook** | Facebook icon | https://facebook.com/yourpage |
| **LinkedIn** | LinkedIn icon | https://linkedin.com/company/yourcompany |
| **Twitter** | Twitter icon | https://twitter.com/yourhandle |
| **YouTube** | YouTube icon | https://youtube.com/@yourchannel |
| **Pinterest** | Generic share icon | https://pinterest.com/yourprofile |
| **TikTok** | Generic share icon | https://tiktok.com/@yourhandle |
| **WhatsApp** | Generic share icon | https://wa.me/919876543210 |
| **Other** | Generic share icon | Any custom URL |

## Technical Details

### Data Storage
- Social media links are stored in: `/data/social-media.json`
- Format: JSON array of social media objects
- Automatically created if it doesn't exist

### API Endpoints
- **GET** `/api/social-media` - Fetch all links (public: only enabled, admin: all)
- **POST** `/api/social-media` - Add new link (admin only)
- **PATCH** `/api/social-media` - Update existing link (admin only)
- **DELETE** `/api/social-media?id=<id>` - Delete link (admin only)

### Frontend Integration
- **Footer Component**: Automatically fetches and displays enabled social media links
- **Admin Panel**: Full CRUD interface for managing links
- **Real-time Updates**: Footer updates on next page load after changes

## Best Practices

### URL Format
✅ **Correct:**
- `https://instagram.com/luxeinteriors`
- `https://www.facebook.com/luxeinteriors`
- `https://linkedin.com/company/luxeinteriors`

❌ **Incorrect:**
- `instagram.com/luxeinteriors` (missing https://)
- `@luxeinteriors` (not a URL)
- `www.instagram.com` (incomplete URL)

### Display Order
- Order links by importance or popularity
- Most important platforms should appear first
- Use the reorder arrows to adjust positioning

### Naming
- Use clear, recognizable names (e.g., "Instagram", not "IG")
- Be consistent with capitalization
- Match the official platform name when possible

## Security

### Access Control
- All admin endpoints require authentication
- Public endpoint only returns enabled links
- Invalid tokens return 401 Unauthorized

### Validation
- URLs are validated for proper format
- Required fields are enforced
- Duplicate prevention (by URL validation)

## Troubleshooting

### Social Media Links Not Showing on Website
1. Check if the link is **enabled** (eye icon should show "Visible")
2. Verify the URL is correct and starts with `https://`
3. Clear browser cache and refresh the page

### Changes Not Appearing
- Changes appear immediately in admin panel
- Website footer updates on next page load/refresh
- Try clearing browser cache if issues persist

### Can't Add New Link
- Ensure all required fields are filled (Name, Platform, URL)
- Verify URL format (must start with http:// or https://)
- Check that you're logged in as admin

## Default Social Media Links

The system comes pre-configured with three default links:
1. **Instagram**: https://instagram.com/luxeinteriors
2. **Facebook**: https://facebook.com/luxeinteriors
3. **LinkedIn**: https://linkedin.com/company/luxeinteriors

**Important**: Update these URLs to match your actual social media profiles!

## Future Enhancements

Potential features for future versions:
- Analytics tracking for social media clicks
- Custom icon upload support
- Social media feed integration
- Automated link validation
- Bulk import/export functionality

## Support

For technical support or questions about this feature, refer to:
- Main documentation: `README.md`
- Admin guide: `ADMIN_GUIDE.md`
- API documentation: Contact your developer

