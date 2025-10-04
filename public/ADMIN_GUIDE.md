# Admin Dashboard Guide

## Overview
The admin dashboard allows you to view and manage all consultation bookings in a beautiful, intuitive interface. All bookings are automatically saved to an Excel file for your records.

## Features
- 📊 **Dashboard Overview**: View statistics of all bookings (Total, Pending, Confirmed, Completed)
- 📋 **Booking Management**: View detailed information for each booking
- ✅ **Status Updates**: Mark bookings as Confirmed, Completed, or Cancelled
- 🔍 **Filtering**: Filter bookings by status (All, Pending, Confirmed, Completed)
- 📥 **Excel Export**: Download the complete bookings Excel file
- 🔒 **Password Protected**: Secure access to admin area

## Access Instructions

### Step 1: Login
1. Navigate to: `http://your-domain.com/admin/login`
2. Enter the admin password: **`admin123`**
3. Click "Login"

### Step 2: View Dashboard
After successful login, you'll be redirected to the dashboard where you can:
- View all bookings
- See real-time statistics
- Filter bookings by status
- Update booking statuses

## How to Use

### View Booking Details
Each booking card displays:
- **Contact Information**: Name, Email, Phone, Location
- **Project Details**: Type, Area Size, Budget
- **Appointment**: Date and Time
- **Messages**: Any additional information from the client
- **Status**: Current status of the booking

### Update Booking Status
1. Find the booking you want to update
2. Click the appropriate action button:
   - **Confirm**: Mark pending bookings as confirmed
   - **Mark Complete**: Mark confirmed bookings as completed
   - **Cancel**: Cancel any booking

### Filter Bookings
Use the filter tabs at the top to view:
- **All**: All bookings
- **Pending**: New bookings awaiting confirmation
- **Confirmed**: Bookings you've confirmed
- **Completed**: Finished consultations

### Download Excel File
Click the "Download Excel" button in the header to download the complete bookings spreadsheet.

## Excel File Location
Bookings are saved in: `/data/bookings.xlsx`

The Excel file contains columns:
- ID
- Timestamp
- Name
- Email
- Phone
- Location
- Project Type
- Area Size
- Budget
- Appointment Date
- Appointment Time
- Message
- Status

## Security

### Changing Admin Password
To change the admin password:

1. Open: `src/app/api/admin/auth/route.ts`
2. Modify line 15 to change the password:
   ```typescript
   const isValid = password === "your_new_password";
   ```
3. Save the file and restart the server

For production use, we recommend:
- Using environment variables for the password
- Implementing proper JWT-based authentication
- Adding rate limiting to prevent brute force attacks

## User Booking Flow
Users can book consultations without any login:
1. Visit `/consultation`
2. Fill out the 3-step form:
   - Personal Information
   - Project Details
   - Schedule Appointment
3. Submit the form
4. Booking is automatically saved to Excel
5. Admin receives the booking in the dashboard

## Technical Details

### API Endpoints
- `POST /api/bookings` - Save new booking
- `GET /api/bookings` - Fetch all bookings (requires auth)
- `PATCH /api/bookings/update` - Update booking status (requires auth)
- `POST /api/admin/auth` - Admin authentication

### Data Storage
- All bookings are stored in Excel format
- File location: `data/bookings.xlsx`
- Automatic file creation if it doesn't exist
- Each booking gets a unique ID

### Authentication
- Simple password-based authentication
- Token stored in localStorage
- Protected API routes require Bearer token
- Client-side route protection in dashboard

## Troubleshooting

### Can't Login?
- Ensure you're using the correct password: `admin123`
- Clear browser cache and try again
- Check browser console for errors

### Bookings Not Showing?
- Ensure users are submitting forms
- Check if `data/bookings.xlsx` exists
- Verify API endpoints are working (check browser Network tab)

### Excel File Issues?
- Ensure the `data` directory exists
- Check file permissions
- Try deleting `data/bookings.xlsx` to regenerate

## Support
For technical issues or questions, refer to the main README.md or contact your developer.

---

**Default Admin Password**: `admin123`  
**Admin Login URL**: `/admin/login`  
**Dashboard URL**: `/admin/dashboard`

