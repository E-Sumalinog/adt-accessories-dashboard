import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

export async function GET() {
  try {
    // Total Orders
    const totalOrdersQuery = await pool.query(`
      SELECT COUNT(*) AS total
      FROM orders
    `)

    // Revenue (exclude cancelled)
    const revenueQuery = await pool.query(`
      SELECT COALESCE(SUM(total_amount::numeric), 0) AS revenue
      FROM orders
      WHERE status != 'cancelled'
    `)

    // Status counts
    const statusQuery = await pool.query(`
      SELECT
        status,
        COUNT(*) AS count
      FROM orders
      GROUP BY status
    `)

    const stats = {
      totalOrders: Number(totalOrdersQuery.rows[0].total),
      revenue: Number(revenueQuery.rows[0].revenue),

      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    }

    statusQuery.rows.forEach((row) => {
      stats[row.status as keyof typeof stats] = Number(row.count)
    })

    return NextResponse.json(stats)

  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    )
  }
}