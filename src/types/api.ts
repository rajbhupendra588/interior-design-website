/**
 * API Response Types
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
}

export interface BookingsListResponse {
  success: boolean;
  bookings: Array<{
    ID: string;
    Timestamp: string;
    Name: string;
    Email: string;
    Phone: string;
    Location: string;
    "Project Type": string;
    "Area Size": string;
    Budget: string;
    "Appointment Date": string;
    "Appointment Time": string;
    Message: string;
    Status: string;
  }>;
}

export interface UpdateStatusResponse {
  success: boolean;
  message: string;
}

