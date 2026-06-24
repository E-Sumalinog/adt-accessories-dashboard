import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'all'
    const period = searchParams.get('period') || '30days'

    let dateCondition = ''
    switch (period) {
      case '7days':
        dateCondition = "AND o.created_at >= NOW() - INTERVAL '7 days'"
        break
      case '30days':
        dateCondition = "AND o.created_at >= NOW() - INTERVAL '30 days'"
        break
      case '3months':
        dateCondition = "AND o.created_at >= NOW() - INTERVAL '3 months'"
        break
      case '6months':
        dateCondition = "AND o.created_at >= NOW() - INTERVAL '6 months'"
        break
      case '1year':
        dateCondition = "AND o.created_at >= NOW() - INTERVAL '1 year'"
        break
      default:
        dateCondition = "AND o.created_at >= NOW() - INTERVAL '30 days'"
    }

    let data = {}

    if (type === 'all' || type === 'sales') {
      const salesData = await pool.query(`
        SELECT 
          DATE_TRUNC('day', o.created_at) as date,
          COUNT(*) as orders,
          COALESCE(SUM(o.total_amount), 0) as revenue,
          COUNT(DISTINCT o.customer_email) as customers
        FROM orders o
        WHERE o.status != 'cancelled' ${dateCondition}
        GROUP BY DATE_TRUNC('day', o.created_at)
        ORDER BY date DESC
      `)
      data = { ...data, sales: salesData.rows }
    }

    if (type === 'all' || type === 'inventory') {
      const inventoryData = await pool.query(`
        SELECT 
          p.name,
          p.sku,
          p.category,
          p.stock,
          p.min_stock,
          p.max_stock,
          p.price,
          p.status,
          p.supplier,
          p.location,
          (p.stock * p.price) as total_value
        FROM products p
        ORDER BY p.created_at DESC
      `)
      data = { ...data, inventory: inventoryData.rows }
    }

    if (type === 'all' || type === 'customers') {
      const customerData = await pool.query(`
        SELECT 
          c.name,
          c.email,
          c.phone,
          c.status,
          c.total_orders,
          c.total_spent,
          c.join_date,
          c.last_order_date
        FROM customers c
        ORDER BY c.total_spent DESC
      `)
      data = { ...data, customers: customerData.rows }
    }

    if (type === 'all' || type === 'financial') {
      const financialData = await pool.query(`
        SELECT 
          DATE_TRUNC('month', o.created_at) as month,
          COUNT(*) as total_orders,
          COALESCE(SUM(o.total_amount), 0) as total_revenue,
          COUNT(DISTINCT o.customer_email) as unique_customers,
          COALESCE(SUM(o.total_amount) / NULLIF(COUNT(*), 0), 0) as avg_order_value
        FROM orders o
        WHERE o.status != 'cancelled' ${dateCondition}
        GROUP BY DATE_TRUNC('month', o.created_at)
        ORDER BY month DESC
      `)
      data = { ...data, financial: financialData.rows }
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("REPORTS API ERROR:", error)
    return NextResponse.json(
      { error: "Failed to fetch reports data" },
      { status: 500 }
    )
  }
}
