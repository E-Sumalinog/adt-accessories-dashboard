import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM settings WHERE id = 1
    `)

    if (result.rows.length === 0) {
      // Return default settings if none exist
      return NextResponse.json({
        id: 1,
        company_name: 'ADT Accessories',
        company_email: 'info@orderflow.com',
        company_phone: '+63 2 8123 4567',
        company_address: 'Makati City, Metro Manila, Philippines',
        timezone: 'Asia/Manila',
        language: 'en',
        currency: 'PHP',
        date_format: 'MM/DD/YYYY',
        week_starts_on: 'monday'
      })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error)
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const result = await pool.query(`
      INSERT INTO settings (
        id,
        company_name,
        company_email,
        company_phone,
        company_address,
        timezone,
        language,
        currency,
        date_format,
        week_starts_on,
        updated_at
      )
      VALUES (
        1,
        $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        company_name = EXCLUDED.company_name,
        company_email = EXCLUDED.company_email,
        company_phone = EXCLUDED.company_phone,
        company_address = EXCLUDED.company_address,
        timezone = EXCLUDED.timezone,
        language = EXCLUDED.language,
        currency = EXCLUDED.currency,
        date_format = EXCLUDED.date_format,
        week_starts_on = EXCLUDED.week_starts_on,
        updated_at = NOW()
      RETURNING *
    `, [
      body.companyName,
      body.companyEmail,
      body.companyPhone,
      body.companyAddress,
      body.timezone,
      body.language,
      body.currency,
      body.dateFormat,
      body.weekStartsOn
    ])

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error)
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    )
  }
}
