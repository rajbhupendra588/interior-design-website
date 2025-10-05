import { NextRequest } from "next/server";
import { validateAuthHeader } from "@/lib/auth";
import { ApiResponse } from "@/lib/api-response";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { Project } from "@/types";

const PORTFOLIO_FILE = join(process.cwd(), "data", "custom-portfolios.json");

// Initialize portfolio file if it doesn't exist
function initializePortfolioFile() {
  try {
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    if (!existsSync(PORTFOLIO_FILE)) {
      writeFileSync(PORTFOLIO_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error("Error initializing portfolio file:", error);
  }
}

// Read portfolios from file
function readPortfolios(): Project[] {
  try {
    initializePortfolioFile();
    const data = readFileSync(PORTFOLIO_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading portfolios:", error);
    return [];
  }
}

// Save portfolios to file
function savePortfolios(portfolios: Project[]) {
  try {
    writeFileSync(PORTFOLIO_FILE, JSON.stringify(portfolios, null, 2));
  } catch (error) {
    console.error("Error saving portfolios:", error);
    throw error;
  }
}

/**
 * POST /api/portfolio - Add a new portfolio project
 */
export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const authHeader = request.headers.get("authorization");
    if (!validateAuthHeader(authHeader)) {
      return ApiResponse.unauthorized();
    }

    const body = await request.json();

    // Basic validation
    if (!body.title || !body.description || !body.category || !body.style || !body.location) {
      return ApiResponse.validationError({
        title: !body.title ? "Title is required" : undefined,
        description: !body.description ? "Description is required" : undefined,
        category: !body.category ? "Category is required" : undefined,
        style: !body.style ? "Style is required" : undefined,
        location: !body.location ? "Location is required" : undefined,
      });
    }

    // Create slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Read existing portfolios
    const portfolios = readPortfolios();

    // Create new portfolio
    const newPortfolio: Project = {
      id: `custom-${Date.now()}`,
      slug: `${slug}-${Date.now()}`,
      title: body.title,
      description: body.description,
      category: body.category,
      style: body.style,
      images: body.imageUrl
        ? [{ url: body.imageUrl, alt: body.title }]
        : [{ url: "/images/projects/placeholder.jpg", alt: body.title }],
      materials: body.materials
        ? body.materials.split(",").map((m: string) => m.trim())
        : [],
      challenges: body.challenges || "",
      impact: body.impact || "",
      year: body.year || new Date().getFullYear(),
      location: body.location,
      area: body.area || "",
    };

    // Add to portfolios
    portfolios.push(newPortfolio);

    // Save to file
    savePortfolios(portfolios);

    return ApiResponse.success(
      { portfolio: newPortfolio },
      "Portfolio added successfully"
    );
  } catch (error) {
    console.error("Error adding portfolio:", error);
    return ApiResponse.error("Failed to add portfolio");
  }
}

/**
 * GET /api/portfolio - Fetch all custom portfolios (Admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Validate authentication
    const authHeader = request.headers.get("authorization");
    if (!validateAuthHeader(authHeader)) {
      return ApiResponse.unauthorized();
    }

    // Read portfolios
    const portfolios = readPortfolios();

    return ApiResponse.success({ portfolios });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return ApiResponse.error("Failed to fetch portfolios");
  }
}

