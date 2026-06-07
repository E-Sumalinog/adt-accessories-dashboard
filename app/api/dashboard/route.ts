import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    // =========================
    // TOTAL REVENUE
    // =========================
    const revenueResult = await pool.query(`
      SELECT COALESCE(SUM(total_amount), 0) AS total_revenue
      FROM orders
    `);

    // =========================
    // TOTAL ORDERS
    // =========================
    const ordersResult = await pool.query(`
      SELECT COUNT(*) AS total_orders
      FROM orders
    `);

    // =========================
    // ACTIVE PRODUCTS
    // =========================
    const productsResult = await pool.query(`
      SELECT COUNT(*) AS active_products
      FROM products
      WHERE status = 'active'
    `);

    // =========================
    // TOTAL CUSTOMERS
    // =========================
    const customersResult = await pool.query(`
      SELECT COUNT(*) AS total_customers
      FROM customers
    `);

    // =========================
    // RECENT ORDERS
    // =========================
    const recentOrdersResult = await pool.query(`
    SELECT
        o.id,
        o.order_number AS "orderNumber",
        o.customer_name AS "customerName",
        o.customer_email AS "customerEmail",
        o.total_amount AS "totalAmount",
        o.status,
        o.created_at AS "createdAt",
        COALESCE(
        json_agg(
            json_build_object(
            'id', oi.id,
            'productId', oi.product_id,
            'productName', oi.product_name,
            'quantity', oi.quantity,
            'unitPrice', oi.unit_price,
            'totalPrice', oi.total_price
            )
        ) FILTER (WHERE oi.id IS NOT NULL),
        '[]'
        ) AS items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id
    ORDER BY o.created_at DESC
    LIMIT 4
    `);

    // =========================
    // TOP PRODUCTS
    // =========================
    const topProductsResult = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.price,
        p.stock,
        p.status,
        COALESCE(SUM(oi.quantity), 0) AS total_sales,
        COALESCE(SUM(oi.total_price), 0) AS total_revenue
      FROM products p
      LEFT JOIN order_items oi
        ON p.id = oi.product_id
      GROUP BY p.id
      ORDER BY total_revenue DESC
      LIMIT 4
    `);

    return NextResponse.json({
      success: true,

      stats: {
        totalRevenue: Number(revenueResult.rows[0].total_revenue),
        totalOrders: Number(ordersResult.rows[0].total_orders),
        activeProducts: Number(productsResult.rows[0].active_products),
        totalCustomers: Number(customersResult.rows[0].total_customers),
      },

      recentOrders: recentOrdersResult.rows,

      topProducts: topProductsResult.rows,
    });

  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}