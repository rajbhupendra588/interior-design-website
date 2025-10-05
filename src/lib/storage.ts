/**
 * Unified storage layer that works with or without database
 * Uses Excel files for local development, Postgres for production
 */

import type { Booking, CustomPortfolio, SocialMedia } from '@/types';
import * as excel from './excel';
import * as fs from 'fs';
import * as path from 'path';

// Check if we're in a production environment with database
const isDatabaseAvailable = () => {
  const url = process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
  // Must have a valid connection string (not a placeholder)
  return !!(url && !url.includes('your-') && url.startsWith('postgres://'));
};

// Storage adapter
export async function getStorageAdapter() {
  if (isDatabaseAvailable()) {
    // Use database in production
    const db = await import('./db');
    return {
      type: 'database' as const,
      bookings: {
        add: db.addBooking,
        read: db.readBookings,
        updateStatus: db.updateBookingStatus,
        findById: db.findBookingById,
      },
      portfolios: {
        add: db.addCustomPortfolio,
        getAll: db.getCustomPortfolios,
      },
      socialMedia: {
        get: db.getSocialMedia,
        update: db.updateSocialMedia,
      },
    };
  } else {
    // Use file storage for local development
    return {
      type: 'file' as const,
      bookings: {
        add: async (booking: Booking) => excel.addBooking(booking),
        read: async () => excel.readBookings(),
        updateStatus: async (id: string, status: string) => excel.updateBookingStatus(id, status),
        findById: async (id: string) => excel.findBookingById(id),
      },
      portfolios: {
        add: async (p: CustomPortfolio) => {
          const filePath = path.join(process.cwd(), 'data', 'custom-portfolios.json');
          let portfolios: CustomPortfolio[] = [];
          
          if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            portfolios = Array.isArray(data) ? data : [];
          }
          
          portfolios.push(p);
          fs.writeFileSync(filePath, JSON.stringify(portfolios, null, 2));
        },
        getAll: async () => {
          const filePath = path.join(process.cwd(), 'data', 'custom-portfolios.json');
          
          if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return Array.isArray(data) ? data : [];
          }
          return [];
        },
      },
      socialMedia: {
        get: async () => {
          try {
            const filePath = path.join(process.cwd(), 'data', 'social-media.json');
            console.log('[Storage] Reading social media from:', filePath);
            console.log('[Storage] File exists:', fs.existsSync(filePath));
            
            if (fs.existsSync(filePath)) {
              const fileContent = fs.readFileSync(filePath, 'utf-8');
              const data = JSON.parse(fileContent);
              console.log('[Storage] Loaded', data.length, 'social media items');
              return data;
            }
            console.log('[Storage] File not found, returning empty array');
            return [];
          } catch (error) {
            console.error('[Storage] Error reading social media file:', error);
            throw error; // Re-throw to see the actual error
          }
        },
        update: async (platforms: Partial<SocialMedia>[]) => {
          const filePath = path.join(process.cwd(), 'data', 'social-media.json');
          fs.writeFileSync(filePath, JSON.stringify(platforms, null, 2));
        },
      },
    };
  }
}

export function isUsingDatabase() {
  return isDatabaseAvailable();
}

