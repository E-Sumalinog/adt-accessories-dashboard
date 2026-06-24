import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period') || '6months'

    let dateCondition = ''
    const now = new Date()
    
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
        dateCondition = "AND o.created_at >= NOW() - INTERVAL '6 months'"
    }

    // Revenue by month
    const revenueQuery = await pool.query(`
      SELECT 
        DATE_TRUNC('month', o.created_at) as month,
        COALESCE(SUM(o.total_amount), 0) as revenue,
        COUNT(*) as orders,
        COUNT(DISTINCT o.customer_email) as customers
      FROM orders o
      WHERE o.status != 'cancelled' ${dateCondition}
      GROUP BY DATE_TRUNC('month', o.created_at)
      ORDER BY month ASC
    `)

    // Sales by category
    const categoryQuery = await pool.query(`
      SELECT 
        p.category,
        COUNT(*) as sales_count,
        COALESCE(SUM(oi.total_price), 0) as revenue
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.status != 'cancelled' ${dateCondition}
      GROUP BY p.category
      ORDER BY revenue DESC
    `)

    // Top products
    const topProductsQuery = await pool.query(`
      SELECT 
        p.name,
        SUM(oi.quantity) as total_sales,
        COALESCE(SUM(oi.total_price), 0) as total_revenue
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.status != 'cancelled' ${dateCondition}
      GROUP BY p.id, p.name
      ORDER BY total_revenue DESC
      LIMIT 10
    `)

    // Overall stats
    const statsQuery = await pool.query(`
      SELECT 
        COALESCE(SUM(o.total_amount), 0) as total_revenue,
        COUNT(*) as total_orders,
        COUNT(DISTINCT o.customer_email) as total_customers,
        COALESCE(SUM(o.total_amount) / NULLIF(COUNT(*), 0), 0) as avg_order_value
      FROM orders o
      WHERE o.status != 'cancelled' ${dateCondition}
    `)

    return NextResponse.json({
      salesData: revenueQuery.rows.map(row => ({
        month: new Date(row.month).toLocaleString('default', { month: 'short' }),
        revenue: Number(row.revenue),
        orders: Number(row.orders),
        customers: Number(row.customers)
      })),
      categoryData: categoryQuery.rows.map(row => ({
        category: row.category,
        sales: Number(row.sales_count),
        revenue: Number(row.revenue)
      })),
      topProducts: topProductsQuery.rows.map(row => ({
        name: row.name,
        sales: Number(row.total_sales),
        revenue: Number(row.total_revenue)
      })),
      stats: {
        totalRevenue: Number(statsQuery.rows[0]?.total_revenue || 0),
        totalOrders: Number(statsQuery.rows[0]?.total_orders || 0),
        totalCustomers: Number(statsQuery.rows[0]?.total_customers || 0),
        avgOrderValue: Number(statsQuery.rows[0]?.avg_order_value || 0)
      }
    })
  } catch (error) {
    console.error("ANALYTICS API ERROR:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    )
  }
}
