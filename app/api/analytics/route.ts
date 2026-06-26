import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const period =
      req.nextUrl.searchParams.get("period") ?? "6months";

    let interval = "6 months";

    switch (period) {
      case "7days":
        interval = "7 days";
        break;

      case "30days":
        interval = "30 days";
        break;

      case "3months":
        interval = "3 months";
        break;

      case "6months":
        interval = "6 months";
        break;

      case "1year":
        interval = "1 year";
        break;
    }

    //-------------------------------------
    // Monthly Revenue
    //-------------------------------------

    const revenueResult = await pool.query(
      `
      SELECT
          DATE_TRUNC('month', order_date) AS month,
          SUM(total_amount)::numeric AS revenue,
          COUNT(*)::int AS orders,
          COUNT(DISTINCT customer_email)::int AS customers
      FROM orders
      WHERE status <> 'cancelled'
      AND order_date >= CURRENT_DATE - INTERVAL '${interval}'
      GROUP BY DATE_TRUNC('month', order_date)
      ORDER BY month;
`
    );

    //-------------------------------------
    // Category Sales
    //-------------------------------------

    const categoryResult = await pool.query(
      `
      SELECT
          p.category,
          SUM(oi.quantity)::int AS sales,
          SUM(oi.total_price)::numeric AS revenue
      FROM order_items oi
      JOIN products p
      ON p.id = oi.product_id

      JOIN orders o
      ON o.id = oi.order_id

      WHERE o.status <> 'cancelled'
      AND o.order_date >= CURRENT_DATE - INTERVAL '${interval}'

      GROUP BY p.category

      ORDER BY revenue DESC;
`
    );

    //-------------------------------------
    // Top Products
    //-------------------------------------

    const topProductsResult = await pool.query(
      `
      SELECT
          p.name,
          SUM(oi.quantity)::int AS sales,
          SUM(oi.total_price)::numeric AS revenue
      FROM order_items oi
      JOIN products p
      ON p.id = oi.product_id

      JOIN orders o
      ON o.id = oi.order_id

      WHERE o.status <> 'cancelled'
      AND o.order_date >= CURRENT_DATE - INTERVAL '${interval}'

      GROUP BY p.id,p.name

      ORDER BY revenue DESC

      LIMIT 10;
`
    );

    //-------------------------------------
    // Dashboard Stats
    //-------------------------------------

    const statsResult = await pool.query(
      `
      SELECT
          COALESCE(SUM(total_amount),0)::numeric AS revenue,
          COUNT(*)::int AS orders,
          COUNT(DISTINCT customer_email)::int AS customers,
          COALESCE(AVG(total_amount),0)::numeric AS average
      FROM orders
      WHERE status <> 'cancelled'
      AND order_date >= CURRENT_DATE - INTERVAL '${interval}';
`
    );

    //-------------------------------------
    // Calculate Percentage
    //-------------------------------------

    const totalTopRevenue = topProductsResult.rows.reduce(
      (sum, item) => sum + Number(item.revenue),
      0
    );

    //-------------------------------------
    // Response
    //-------------------------------------

    return NextResponse.json({
      stats: {
        totalRevenue: Number(statsResult.rows[0].revenue),
        totalOrders: Number(statsResult.rows[0].orders),
        totalCustomers: Number(statsResult.rows[0].customers),
        avgOrderValue: Number(statsResult.rows[0].average),
      },

      salesData: revenueResult.rows.map((row) => ({
        month: new Date(row.month).toLocaleString("en-US", {
          month: "short",
        }),
        revenue: Number(row.revenue),
        orders: Number(row.orders),
        customers: Number(row.customers),
      })),

      categoryData: categoryResult.rows.map((row) => ({
        category: row.category,
        sales: Number(row.sales),
        revenue: Number(row.revenue),
      })),

      topProducts: topProductsResult.rows.map((row) => ({
        name: row.name,
        sales: Number(row.sales),
        revenue: Number(row.revenue),
        percentage:
          totalTopRevenue === 0
            ? 0
            : Number(
                (
                  (Number(row.revenue) / totalTopRevenue) *
                  100
                ).toFixed(1)
              ),
      })),
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to load analytics",
      },
      {
        status: 500,
      }
    );
  }
}