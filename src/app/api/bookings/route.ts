import { NextRequest } from "next/server";
import { validateAuthHeader } from "@/lib/auth";
import { getStorageAdapter } from "@/lib/storage";
import { validateBookingData } from "@/lib/validation";
import { APP_CONFIG } from "@/lib/constants";
import { ApiResponse } from "@/lib/api-response";
import type { Booking, BookingFormData } from "@/types";

/**
 * POST /api/bookings - Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData = await request.json();

    // Validate request data
    const validation = validateBookingData(body);
    if (!validation.isValid) {
      return ApiResponse.validationError(validation.errors);
    }

    // Create new booking
    const newBooking: Booking = {
      ID: `BK${Date.now()}`,
      Timestamp: new Date().toISOString(),
      Name: body.name,
      Email: body.email,
      Phone: body.phone,
      Location: body.location,
      "Project Type": body.projectType,
      "Area Size": body.areaSize,
      Budget: body.budget,
      "Appointment Date": body.appointmentDate,
      "Appointment Time": body.appointmentTime,
      Message: body.message || "",
      Status: APP_CONFIG.BOOKING.STATUS.PENDING,
    };

    // Save booking (uses Excel or Database depending on environment)
    const storage = await getStorageAdapter();
    await storage.bookings.add(newBooking);

    return ApiResponse.success(
      { bookingId: newBooking.ID },
      "Booking saved successfully"
    );
  } catch (error) {
    console.error("Error saving booking:", error);
    return ApiResponse.error("Failed to save booking");
  }
}

/**
 * GET /api/bookings - Fetch all bookings (Admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Validate authentication
    const authHeader = request.headers.get("authorization");
    if (!validateAuthHeader(authHeader)) {
      return ApiResponse.unauthorized();
    }

    // Read bookings (from Excel or Database)
    const storage = await getStorageAdapter();
    const bookings = await storage.bookings.read();

    return ApiResponse.success({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return ApiResponse.error("Failed to fetch bookings");
  }
}

