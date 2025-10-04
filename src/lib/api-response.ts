import { NextResponse } from "next/server";
import type { ValidationError } from "./validation";

/**
 * Standard API response helpers
 */

export class ApiResponse {
  /**
   * Success response
   */
  static success<T extends Record<string, unknown>>(data?: T, message?: string, status = 200) {
    return NextResponse.json(
      {
        success: true,
        ...(message && { message }),
        ...data,
      },
      { status }
    );
  }

  /**
   * Error response
   */
  static error(message: string, status = 500) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status }
    );
  }

  /**
   * Validation error response
   */
  static validationError(errors: ValidationError[], message = "Validation failed") {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      { status: 400 }
    );
  }

  /**
   * Unauthorized response
   */
  static unauthorized(message = "Unauthorized") {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 401 }
    );
  }

  /**
   * Not found response
   */
  static notFound(message = "Resource not found") {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 404 }
    );
  }

  /**
   * Bad request response
   */
  static badRequest(message = "Bad request") {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 }
    );
  }
}

