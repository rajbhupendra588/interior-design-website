import { NextRequest } from "next/server";
import { validateAuthHeader } from "@/lib/auth";
import { ApiResponse } from "@/lib/api-response";
import { getStorageAdapter } from "@/lib/storage";

// GET - Fetch all social media links (public or admin)
export async function GET(request: NextRequest) {
  try {
    const storage = await getStorageAdapter();
    const socialMedia = await storage.socialMedia.get();
    
    // Check if request is from admin (has auth token)
    const authHeader = request.headers.get("authorization");
    const isAdmin = authHeader && validateAuthHeader(authHeader);
    
    // Filter enabled links for non-admin
    const filteredData = isAdmin ? socialMedia : socialMedia.filter(sm => sm.enabled);
    
    return ApiResponse.success({ data: filteredData }, "Social media links retrieved successfully");
  } catch (error) {
    console.error("Error fetching social media:", error);
    return ApiResponse.error("Failed to fetch social media links");
  }
}

// POST/PATCH - Update all social media links (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !validateAuthHeader(authHeader)) {
      return ApiResponse.unauthorized();
    }

    const body = await request.json();
    const platforms = body.platforms || body;

    // Validate
    if (!Array.isArray(platforms)) {
      return ApiResponse.error("Invalid data format");
    }

    // Update all social media in storage
    const storage = await getStorageAdapter();
    await storage.socialMedia.update(platforms);

    return ApiResponse.success({}, "Social media links updated successfully");
  } catch (error) {
    console.error("Error updating social media:", error);
    return ApiResponse.error("Failed to update social media links");
  }
}

