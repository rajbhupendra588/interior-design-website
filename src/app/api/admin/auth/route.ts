import { NextRequest } from "next/server";
import { validateAdminPassword, generateAdminToken } from "@/lib/auth";
import { ApiResponse } from "@/lib/api-response";

/**
 * POST /api/admin/auth - Admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Validate request
    if (!password) {
      return ApiResponse.badRequest("Password is required");
    }

    // Validate password
    const isValid = validateAdminPassword(password);
    if (!isValid) {
      return ApiResponse.unauthorized("Invalid password");
    }

    // Generate token
    const token = generateAdminToken();

    return ApiResponse.success({ token }, "Authentication successful");
  } catch (error) {
    console.error("Auth error:", error);
    return ApiResponse.error("Authentication failed");
  }
}

