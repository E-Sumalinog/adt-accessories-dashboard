import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  const client = await pool.connect();

  try {
    const body = await req.json();

    const {
      productId,
      quantity,
      supplier,
      remarks,
    } = body;

    await client.query("BEGIN");

    // ==========================
    // Get current stock
    // ==========================

    const productResult = await client.query(
      `
      SELECT
        stock
      FROM products
      WHERE id = $1
      `,
      [productId]
    );

    if (productResult.rows.length === 0) {
      throw new Error("Product not found.");
    }

    const previousStock = Number(productResult.rows[0].stock);

    const newStock = previousStock + Number(quantity);

    // ==========================
    // Update Product Stock
    // ==========================

    await client.query(
      `
      UPDATE products
      SET
        stock = $1,
        updated_at = NOW()
      WHERE id = $2
      `,
      [newStock, productId]
    );

    // ==========================
    // Save Transaction History
    // ==========================

    await client.query(
      `
      INSERT INTO inventory_transactions
      (
        product_id,
        transaction_type,
        quantity,
        previous_stock,
        new_stock,
        reference,
        remarks,
        created_at
      )
      VALUES
      (
        $1,
        'STOCK_IN',
        $2,
        $3,
        $4,
        $5,
        $6,
        NOW()
      )
      `,
      [
        productId,
        quantity,
        previousStock,
        newStock,
        supplier || "",
        remarks || "",
      ]
    );

    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      message: "Stock successfully added.",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("STOCK IN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to stock in product.",
      },
      {
        status: 500,
      }
    );
  } finally {
    client.release();
  }
}