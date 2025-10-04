import { APP_CONFIG } from "./constants";

/**
 * Validates admin password
 */
export function validateAdminPassword(password: string): boolean {
  return password === APP_CONFIG.ADMIN.PASSWORD;
}

/**
 * Generates an admin token
 */
export function generateAdminToken(): string {
  return Buffer.from(`${APP_CONFIG.ADMIN.TOKEN_PREFIX}${Date.now()}`).toString("base64");
}

/**
 * Validates an admin token from Authorization header
 */
export function validateAuthHeader(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  
  // For now, we just check if the token exists and has the correct format
  // In production, you should validate the token properly (JWT, session, etc.)
  const token = authHeader.substring(7);
  
  try {
    const decoded = Buffer.from(token, "base64").toString();
    return decoded.startsWith(APP_CONFIG.ADMIN.TOKEN_PREFIX);
  } catch {
    return false;
  }
}

