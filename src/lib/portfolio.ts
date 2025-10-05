import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

const PORTFOLIO_FILE = join(process.cwd(), "data", "custom-portfolios.json");

/**
 * Get all portfolios (static + custom)
 */
export function getAllPortfolios(): Project[] {
  try {
    if (existsSync(PORTFOLIO_FILE)) {
      const data = readFileSync(PORTFOLIO_FILE, "utf-8");
      const customPortfolios = JSON.parse(data);
      if (Array.isArray(customPortfolios)) {
        return [...customPortfolios, ...projects];
      }
    }
  } catch (error) {
    console.error("Error reading custom portfolios:", error);
  }
  return projects;
}

/**
 * Get a single portfolio by slug
 */
export function getPortfolioBySlug(slug: string): Project | undefined {
  const allPortfolios = getAllPortfolios();
  return allPortfolios.find((p) => p.slug === slug);
}

