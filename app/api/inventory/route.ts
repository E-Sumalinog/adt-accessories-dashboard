import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    // =========================
    // Inventory Statistics
    // =========================

    const statsResult = await pool.query(`
      SELECT
        COUNT(*) AS total_products,
        COALESCE(SUM(stock),0) AS total_stock,
        COUNT(*) FILTER (WHERE stock <= min_stock) AS low_stock,
        COALESCE(SUM(stock * price),0) AS inventory_value
      FROM products
    `);

    // =========================
    // Current Stock
    // =========================

    const productsResult = await pool.query(`
      SELECT
        id,
        name,
        sku,
        category,
        stock,
        min_stock,
        price,
        supplier,
        location,
        status
      FROM products
      ORDER BY name ASC
    `);

    // =========================
    // Low Stock
    // =========================

    const lowStockResult = await pool.query(`
      SELECT
        id,
        name,
        sku,
        category,
        stock,
        min_stock
      FROM products
      WHERE stock <= min_stock
      ORDER BY stock ASC
    `);

    // =========================
    // Recent Stock Movements
    // =========================

    const movementResult = await pool.query(`
      SELECT
        it.id,
        it.transaction_type,
        it.quantity,
        it.previous_stock,
        it.new_stock,
        it.reference,
        it.remarks,
        it.created_at,
        p.name AS product_name,
        p.sku
      FROM inventory_transactions it
      JOIN products p
        ON p.id = it.product_id
      ORDER BY it.created_at DESC
      LIMIT 20
    `);

    const stats = statsResult.rows[0];

    return NextResponse.json({
      stats: {
        totalProducts: Number(stats.total_products),
        totalStock: Number(stats.total_stock),
        lowStock: Number(stats.low_stock),
        inventoryValue: Number(stats.inventory_value),
      },

      currentStock: productsResult.rows.map((row) => ({
        id: row.id,
        name: row.name,
        sku: row.sku,
        category: row.category,
        stock: Number(row.stock),
        min_stock: Number(row.min_stock),
        price: Number(row.price),
        supplier: row.supplier,
        location: row.location,
        status: row.status,
      })),

      lowStock: lowStockResult.rows.map((row) => ({
        id: row.id,
        name: row.name,
        sku: row.sku,
        category: row.category,
        stock: Number(row.stock),
        min_stock: Number(row.min_stock),
      })),

      movements: movementResult.rows.map((row) => ({
        id: row.id,
        type: row.transaction_type,
        product: row.product_name,
        sku: row.sku,
        quantity: Number(row.quantity),
        previousStock: Number(row.previous_stock),
        newStock: Number(row.new_stock),
        reference: row.reference,
        remarks: row.remarks,
        createdAt: row.created_at,
      })),
    });
  } catch (error) {
    console.error("Inventory API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch inventory data",
      },
      {
        status: 500,
      }
    );
  }
}