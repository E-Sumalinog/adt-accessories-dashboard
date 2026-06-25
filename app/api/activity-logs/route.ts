import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM activity_logs
      ORDER BY created_at DESC
      LIMIT 50
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("ACTIVITY LOGS ERROR:", error)

    return NextResponse.json(
      { error: "Failed to fetch activity logs" },
      { status: 500 }
    )
  }
}