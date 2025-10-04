import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { APP_CONFIG } from "./constants";
import type { Booking } from "@/types";

const EXCEL_FILE_PATH = path.join(
  process.cwd(),
  APP_CONFIG.FILE_PATHS.DATA_DIR,
  APP_CONFIG.FILE_PATHS.BOOKINGS_FILE
);

/**
 * Ensures the data directory exists
 */
export function ensureDataDirectory(): void {
  const dataDir = path.join(process.cwd(), APP_CONFIG.FILE_PATHS.DATA_DIR);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Initializes the Excel file with headers if it doesn't exist
 */
export function initializeExcelFile(): void {
  ensureDataDirectory();
  
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([
      {
        ID: "",
        Timestamp: "",
        Name: "",
        Email: "",
        Phone: "",
        Location: "",
        "Project Type": "",
        "Area Size": "",
        Budget: "",
        "Appointment Date": "",
        "Appointment Time": "",
        Message: "",
        Status: "",
      },
    ]);
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    const wbout = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    fs.writeFileSync(EXCEL_FILE_PATH, wbout);
  }
}

/**
 * Reads all bookings from the Excel file
 */
export function readBookings(): Booking[] {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    return [];
  }

  const fileBuffer = fs.readFileSync(EXCEL_FILE_PATH);
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet) as Booking[];
  
  // Filter out empty rows
  return data.filter((row) => row.ID && row.ID !== "");
}

/**
 * Writes bookings to the Excel file
 */
export function writeBookings(bookings: Booking[]): void {
  ensureDataDirectory();
  
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(bookings);
  XLSX.utils.book_append_sheet(wb, ws, "Bookings");
  const wbout = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  fs.writeFileSync(EXCEL_FILE_PATH, wbout);
}

/**
 * Adds a new booking to the Excel file
 */
export function addBooking(booking: Booking): void {
  initializeExcelFile();
  const bookings = readBookings();
  bookings.push(booking);
  writeBookings(bookings);
}

/**
 * Updates a booking's status in the Excel file
 */
export function updateBookingStatus(bookingId: string, status: string): boolean {
  const bookings = readBookings();
  const bookingIndex = bookings.findIndex((row) => row.ID === bookingId);
  
  if (bookingIndex === -1) {
    return false;
  }

  bookings[bookingIndex].Status = status;
  writeBookings(bookings);
  return true;
}

/**
 * Finds a booking by ID
 */
export function findBookingById(bookingId: string): Booking | undefined {
  const bookings = readBookings();
  return bookings.find((booking) => booking.ID === bookingId);
}

