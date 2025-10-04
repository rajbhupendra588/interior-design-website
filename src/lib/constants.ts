// Application Constants
export const APP_CONFIG = {
  ADMIN: {
    PASSWORD: process.env.ADMIN_PASSWORD || "admin123",
    TOKEN_PREFIX: "admin:",
  },
  BOOKING: {
    STATUS: {
      PENDING: "Pending",
      CONFIRMED: "Confirmed",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
    } as const,
  },
  FILE_PATHS: {
    DATA_DIR: "data",
    BOOKINGS_FILE: "bookings.xlsx",
  },
} as const;

export type BookingStatus = (typeof APP_CONFIG.BOOKING.STATUS)[keyof typeof APP_CONFIG.BOOKING.STATUS];

