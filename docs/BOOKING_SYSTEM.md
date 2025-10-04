# Booking System Architecture

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   └── auth/
│   │   │       └── route.ts          # Admin login authentication
│   │   └── bookings/
│   │       ├── route.ts               # GET & POST bookings
│   │       └── update/
│   │           └── route.ts           # PATCH booking status
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx               # Admin login page
│   │   └── dashboard/
│   │       └── page.tsx               # Admin dashboard
│   └── consultation/
│       └── page.tsx                   # User booking form
│
data/
└── bookings.xlsx                      # Excel file (auto-created)
```

## 🔄 How It Works

### For Regular Users (No Login Required)

1. **User visits** `/consultation`
2. **Fills 3-step form**:
   - Step 1: Personal Info (Name, Email, Phone, Location)
   - Step 2: Project Details (Type, Area, Budget, Message)
   - Step 3: Schedule (Date, Time)
3. **Clicks "Submit Request"**
4. **Data is sent** to `POST /api/bookings`
5. **Booking saved** to Excel file (`data/bookings.xlsx`)
6. **Confirmation shown** with booking summary

### For Admin (Password Protected)

1. **Admin visits** `/admin/login`
2. **Enters password**: `admin123`
3. **Redirected to** `/admin/dashboard`
4. **Dashboard shows**:
   - Statistics (Total, Pending, Confirmed, Completed)
   - All bookings with full details
   - Filter tabs (All, Pending, Confirmed, Completed)
   - Action buttons (Confirm, Mark Complete, Cancel)
   - Download Excel button

## 🛠️ API Endpoints

### 1. Save Booking
```
POST /api/bookings
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "location": "Mumbai",
  "projectType": "residential-full",
  "areaSize": "1000-2000",
  "budget": "10-25",
  "appointmentDate": "2025-10-15",
  "appointmentTime": "10:00",
  "message": "Need modern design"
}

Response:
{
  "success": true,
  "message": "Booking saved successfully",
  "bookingId": "BK1728123456789"
}
```

### 2. Get All Bookings (Admin Only)
```
GET /api/bookings
Authorization: Bearer <token>

Response:
{
  "success": true,
  "bookings": [...]
}
```

### 3. Update Booking Status (Admin Only)
```
PATCH /api/bookings/update
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "bookingId": "BK1728123456789",
  "status": "Confirmed"
}

Response:
{
  "success": true,
  "message": "Booking status updated successfully"
}
```

### 4. Admin Login
```
POST /api/admin/auth
Content-Type: application/json

Body:
{
  "password": "admin123"
}

Response:
{
  "success": true,
  "token": "...",
  "message": "Authentication successful"
}
```

## 📊 Excel File Structure

The Excel file (`data/bookings.xlsx`) contains:

| Column | Description | Example |
|--------|-------------|---------|
| ID | Unique booking ID | BK1728123456789 |
| Timestamp | When booking was made | 2025-10-04T10:30:00.000Z |
| Name | Customer name | John Doe |
| Email | Customer email | john@example.com |
| Phone | Customer phone | +91 98765 43210 |
| Location | Customer location | Mumbai, Maharashtra |
| Project Type | Type of project | residential-full |
| Area Size | Size of area | 1000-2000 |
| Budget | Budget range | 10-25 |
| Appointment Date | Preferred date | 2025-10-15 |
| Appointment Time | Preferred time | 10:00 |
| Message | Additional notes | Need modern design |
| Status | Current status | Pending |

## 🔒 Security

- **Public Access**: Users can submit bookings without login
- **Admin Access**: Protected by password authentication
- **Token Storage**: Admin token stored in browser localStorage
- **API Protection**: Admin APIs require Bearer token
- **Default Password**: `admin123` (change in production!)

## 📱 User Interface

### Admin Dashboard Features:
- ✅ Beautiful, modern design
- ✅ Real-time statistics cards
- ✅ Color-coded status badges
- ✅ Filterable booking list
- ✅ Detailed booking cards
- ✅ One-click status updates
- ✅ Excel download button
- ✅ Responsive design

### Booking Statuses:
- 🟡 **Pending**: New booking, awaiting confirmation
- 🟢 **Confirmed**: Booking confirmed by admin
- ⚫ **Completed**: Consultation completed
- 🔴 **Cancelled**: Booking cancelled

## 🚀 Quick Start

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Test user booking**:
   - Visit: http://localhost:3000/consultation
   - Fill and submit the form

3. **Access admin dashboard**:
   - Visit: http://localhost:3000/admin/login
   - Password: `admin123`
   - View your bookings!

4. **Download Excel**:
   - Click "Download Excel" button in dashboard
   - File location: `/data/bookings.xlsx`

## 📝 Customization

### Change Admin Password
Edit: `src/app/api/admin/auth/route.ts`
```typescript
const isValid = password === "your_new_password";
```

### Change Excel File Location
Edit: `src/app/api/bookings/route.ts`
```typescript
const EXCEL_FILE_PATH = path.join(process.cwd(), "your_folder", "bookings.xlsx");
```

### Add New Booking Fields
1. Add to form in `src/app/consultation/page.tsx`
2. Update API in `src/app/api/bookings/route.ts`
3. Display in dashboard `src/app/admin/dashboard/page.tsx`

## 🎯 Key URLs

| Page | URL | Access |
|------|-----|--------|
| User Booking Form | `/consultation` | Public |
| Admin Login | `/admin/login` | Public |
| Admin Dashboard | `/admin/dashboard` | Password Protected |
| Excel File | `/data/bookings.xlsx` | Server File |

---

**Default Admin Credentials**
- Password: `admin123`
- Change this before deploying to production!

