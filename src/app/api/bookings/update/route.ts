import { NextRequest } from "next/server";
import { validateAuthHeader } from "@/lib/auth";
import { updateBookingStatus, findBookingById } from "@/lib/excel";
import { isValidBookingStatus } from "@/lib/validation";
import { ApiResponse } from "@/lib/api-response";

/**
 * PATCH /api/bookings/update - Update booking status (Admin only)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Validate authentication
    const authHeader = request.headers.get("authorization");
    if (!validateAuthHeader(authHeader)) {
      return ApiResponse.unauthorized();
    }

    // Parse request body
    const { bookingId, status } = await request.json();

    // Validate request data
    if (!bookingId || !status) {
      return ApiResponse.badRequest("Booking ID and status are required");
    }

    if (!isValidBookingStatus(status)) {
      return ApiResponse.badRequest("Invalid status value");
    }

    // Check if booking exists
    const booking = findBookingById(bookingId);
    if (!booking) {
      return ApiResponse.notFound("Booking not found");
    }

    // Update booking status
    const updated = updateBookingStatus(bookingId, status);
    if (!updated) {
      return ApiResponse.error("Failed to update booking");
    }

    return ApiResponse.success({}, "Booking status updated successfully");
  } catch (error) {
    console.error("Error updating booking:", error);
    return ApiResponse.error("Failed to update booking");
  }
}

