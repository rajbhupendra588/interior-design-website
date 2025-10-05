import { sql } from '@vercel/postgres';
import type { Booking, CustomPortfolio, SocialMedia } from '@/types';

/**
 * Initialize database tables
 * This will be called automatically on first use
 */
export async function initializeDatabase() {
  try {
    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        location TEXT NOT NULL,
        project_type TEXT NOT NULL,
        area_size TEXT NOT NULL,
        budget TEXT NOT NULL,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'Pending'
      )
    `;

    // Create custom_portfolios table
    await sql`
      CREATE TABLE IF NOT EXISTS custom_portfolios (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        style TEXT NOT NULL,
        location TEXT NOT NULL,
        area_size TEXT,
        year TEXT NOT NULL,
        image_url TEXT,
        materials TEXT,
        challenges TEXT,
        impact TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    // Create social_media table
    await sql`
      CREATE TABLE IF NOT EXISTS social_media (
        id TEXT PRIMARY KEY,
        platform TEXT NOT NULL,
        url TEXT NOT NULL,
        enabled BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    // Don't throw - tables might already exist
  }
}

// Booking functions
export async function addBooking(booking: Booking): Promise<void> {
  await initializeDatabase();
  
  await sql`
    INSERT INTO bookings (
      id, timestamp, name, email, phone, location,
      project_type, area_size, budget, appointment_date,
      appointment_time, message, status
    ) VALUES (
      ${booking.ID},
      ${booking.Timestamp},
      ${booking.Name},
      ${booking.Email},
      ${booking.Phone},
      ${booking.Location},
      ${booking["Project Type"]},
      ${booking["Area Size"]},
      ${booking.Budget},
      ${booking["Appointment Date"]},
      ${booking["Appointment Time"]},
      ${booking.Message || ''},
      ${booking.Status}
    )
  `;
}

export async function readBookings(): Promise<Booking[]> {
  await initializeDatabase();
  
  const result = await sql`
    SELECT 
      id as "ID",
      timestamp as "Timestamp",
      name as "Name",
      email as "Email",
      phone as "Phone",
      location as "Location",
      project_type as "Project Type",
      area_size as "Area Size",
      budget as "Budget",
      appointment_date as "Appointment Date",
      appointment_time as "Appointment Time",
      message as "Message",
      status as "Status"
    FROM bookings
    ORDER BY timestamp DESC
  `;
  
  return result.rows as Booking[];
}

export async function updateBookingStatus(bookingId: string, status: string): Promise<boolean> {
  await initializeDatabase();
  
  const result = await sql`
    UPDATE bookings
    SET status = ${status}
    WHERE id = ${bookingId}
  `;
  
  return (result.rowCount ?? 0) > 0;
}

export async function findBookingById(bookingId: string): Promise<Booking | undefined> {
  await initializeDatabase();
  
  const result = await sql`
    SELECT 
      id as "ID",
      timestamp as "Timestamp",
      name as "Name",
      email as "Email",
      phone as "Phone",
      location as "Location",
      project_type as "Project Type",
      area_size as "Area Size",
      budget as "Budget",
      appointment_date as "Appointment Date",
      appointment_time as "Appointment Time",
      message as "Message",
      status as "Status"
    FROM bookings
    WHERE id = ${bookingId}
  `;
  
  return result.rows[0] as Booking | undefined;
}

// Portfolio functions
export async function addCustomPortfolio(portfolio: CustomPortfolio): Promise<void> {
  await initializeDatabase();
  
  await sql`
    INSERT INTO custom_portfolios (
      id, title, description, category, style, location,
      area_size, year, image_url, materials, challenges, impact
    ) VALUES (
      ${portfolio.id},
      ${portfolio.title},
      ${portfolio.description},
      ${portfolio.category},
      ${portfolio.style},
      ${portfolio.location},
      ${portfolio.areaSize || ''},
      ${portfolio.year},
      ${portfolio.imageUrl || ''},
      ${portfolio.materials || ''},
      ${portfolio.challenges || ''},
      ${portfolio.impact || ''}
    )
  `;
}

export async function getCustomPortfolios(): Promise<CustomPortfolio[]> {
  await initializeDatabase();
  
  const result = await sql`
    SELECT 
      id,
      title,
      description,
      category,
      style,
      location,
      area_size as "areaSize",
      year,
      image_url as "imageUrl",
      materials,
      challenges,
      impact,
      created_at as "createdAt"
    FROM custom_portfolios
    ORDER BY created_at DESC
  `;
  
  return result.rows as CustomPortfolio[];
}

// Social media functions
export async function getSocialMedia(): Promise<Partial<SocialMedia>[]> {
  await initializeDatabase();
  
  const result = await sql`
    SELECT id, platform, url, enabled
    FROM social_media
    WHERE enabled = true
    ORDER BY platform
  `;
  
  return result.rows as Partial<SocialMedia>[];
}

export async function updateSocialMedia(platforms: Partial<SocialMedia>[]): Promise<void> {
  await initializeDatabase();
  
  // Delete all existing
  await sql`DELETE FROM social_media`;
  
  // Insert new ones
  for (const platform of platforms) {
    await sql`
      INSERT INTO social_media (id, platform, url, enabled)
      VALUES (
        ${platform.id || `${platform.platform}-${Date.now()}`},
        ${platform.platform},
        ${platform.url},
        ${platform.enabled !== false}
      )
    `;
  }
}

