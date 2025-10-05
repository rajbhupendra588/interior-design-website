import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { validateAuthHeader } from "@/lib/auth";
import { ApiResponse } from "@/lib/api-response";
import type { SocialMedia } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const SOCIAL_MEDIA_FILE = path.join(DATA_DIR, "social-media.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Read social media data
async function readSocialMedia(): Promise<SocialMedia[]> {
  try {
    const data = await fs.readFile(SOCIAL_MEDIA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write social media data
async function writeSocialMedia(data: SocialMedia[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SOCIAL_MEDIA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET - Fetch all social media links (public or admin)
export async function GET(request: NextRequest) {
  try {
    const socialMedia = await readSocialMedia();
    
    // Check if request is from admin (has auth token)
    const authHeader = request.headers.get("authorization");
    const isAdmin = authHeader && validateAuthHeader(authHeader);
    
    // If not admin, only return enabled social media links
    const filteredData = isAdmin 
      ? socialMedia 
      : socialMedia.filter(sm => sm.enabled);
    
    // Sort by order
    const sortedData = filteredData.sort((a, b) => a.order - b.order);
    
    return ApiResponse.success({ data: sortedData }, "Social media links retrieved successfully");
  } catch (error) {
    console.error("Error fetching social media:", error);
    return ApiResponse.error("Failed to fetch social media links");
  }
}

// POST - Add new social media link (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !validateAuthHeader(authHeader)) {
      return ApiResponse.unauthorized();
    }

    const body = await request.json();
    const { name, platform, url, enabled = true } = body;

    // Validation
    if (!name || !platform || !url) {
      return ApiResponse.error("Name, platform, and URL are required");
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return ApiResponse.error("Invalid URL format");
    }

    const socialMedia = await readSocialMedia();
    
    // Generate new ID
    const newId = `sm_${Date.now()}`;
    
    // Determine order (last + 1)
    const maxOrder = socialMedia.length > 0 
      ? Math.max(...socialMedia.map(sm => sm.order)) 
      : 0;

    const newSocialMedia: SocialMedia = {
      id: newId,
      name,
      platform,
      url,
      enabled,
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    socialMedia.push(newSocialMedia);
    await writeSocialMedia(socialMedia);

    return ApiResponse.success({ data: newSocialMedia }, "Social media link added successfully");
  } catch (error) {
    console.error("Error adding social media:", error);
    return ApiResponse.error("Failed to add social media link");
  }
}

// PATCH - Update social media link (admin only)
export async function PATCH(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !validateAuthHeader(authHeader)) {
      return ApiResponse.unauthorized();
    }

    const body = await request.json();
    const { id, name, platform, url, enabled, order } = body;

    if (!id) {
      return ApiResponse.error("Social media ID is required");
    }

    // Validate URL if provided
    if (url) {
      try {
        new URL(url);
      } catch {
        return ApiResponse.error("Invalid URL format");
      }
    }

    const socialMedia = await readSocialMedia();
    const index = socialMedia.findIndex(sm => sm.id === id);

    if (index === -1) {
      return ApiResponse.error("Social media link not found", 404);
    }

    // Update fields
    if (name !== undefined) socialMedia[index].name = name;
    if (platform !== undefined) socialMedia[index].platform = platform;
    if (url !== undefined) socialMedia[index].url = url;
    if (enabled !== undefined) socialMedia[index].enabled = enabled;
    if (order !== undefined) socialMedia[index].order = order;
    socialMedia[index].updatedAt = new Date().toISOString();

    await writeSocialMedia(socialMedia);

    return ApiResponse.success({ data: socialMedia[index] }, "Social media link updated successfully");
  } catch (error) {
    console.error("Error updating social media:", error);
    return ApiResponse.error("Failed to update social media link");
  }
}

// DELETE - Remove social media link (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !validateAuthHeader(authHeader)) {
      return ApiResponse.unauthorized();
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return ApiResponse.error("Social media ID is required");
    }

    const socialMedia = await readSocialMedia();
    const filteredData = socialMedia.filter(sm => sm.id !== id);

    if (filteredData.length === socialMedia.length) {
      return ApiResponse.error("Social media link not found", 404);
    }

    await writeSocialMedia(filteredData);

    return ApiResponse.success({}, "Social media link deleted successfully");
  } catch (error) {
    console.error("Error deleting social media:", error);
    return ApiResponse.error("Failed to delete social media link");
  }
}

