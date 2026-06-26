import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        it.id,
        p.name AS product_name,
        it.transaction_type,
        it.quantity,
        it.previous_stock,
        it.new_stock,
        it.remarks,
        it.created_at,
        'Admin' AS created_by
      FROM inventory_transactions it
      JOIN products p
        ON p.id = it.product_id
      ORDER BY it.created_at DESC
      LIMIT 100
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET INVENTORY HISTORY ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch inventory history",
      },
      {
        status: 500,
      }
    );
  }
}