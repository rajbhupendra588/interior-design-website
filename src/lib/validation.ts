import type { BookingFormData } from "@/types";

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validates booking form data
 */
export function validateBookingData(data: Partial<BookingFormData>): {
  isValid: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  // Required fields
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: "name", message: "Name is required" });
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Valid email is required" });
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push({ field: "phone", message: "Valid phone number is required" });
  }

  if (!data.location || data.location.trim().length === 0) {
    errors.push({ field: "location", message: "Location is required" });
  }

  if (!data.projectType) {
    errors.push({ field: "projectType", message: "Project type is required" });
  }

  if (!data.areaSize) {
    errors.push({ field: "areaSize", message: "Area size is required" });
  }

  if (!data.budget) {
    errors.push({ field: "budget", message: "Budget is required" });
  }

  if (!data.appointmentDate) {
    errors.push({ field: "appointmentDate", message: "Appointment date is required" });
  }

  if (!data.appointmentTime) {
    errors.push({ field: "appointmentTime", message: "Appointment time is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone format (Indian phone numbers)
 */
function isValidPhone(phone: string): boolean {
  // Remove spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  
  // Check if it's a valid Indian phone number (10 digits) or international format
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(cleanPhone);
}

/**
 * Validates booking status
 */
export function isValidBookingStatus(status: string): boolean {
  const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
  return validStatuses.includes(status);
}

