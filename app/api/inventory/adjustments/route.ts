import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  const client = await pool.connect();

  try {
    const body = await req.json();

    const {
      productId,
      newStock,
      remarks,
    } = body;

    await client.query("BEGIN");

    // =========================================
    // Get Current Stock
    // =========================================

    const productResult = await client.query(
      `
      SELECT stock
      FROM products
      WHERE id = $1
      `,
      [productId]
    );

    if (productResult.rows.length === 0) {
      throw new Error("Product not found.");
    }

    const previousStock = Number(productResult.rows[0].stock);

    const adjustedStock = Number(newStock);

    if (adjustedStock < 0) {
      throw new Error("Stock cannot be negative.");
    }

    const quantityDifference = Math.abs(
      adjustedStock - previousStock
    );

    // =========================================
    // Update Product
    // =========================================

    await client.query(
      `
      UPDATE products
      SET
        stock = $1,
        updated_at = NOW()
      WHERE id = $2
      `,
      [
        adjustedStock,
        productId,
      ]
    );

    // =========================================
    // Save Inventory History
    // =========================================

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
        'ADJUSTMENT',
        $2,
        $3,
        $4,
        '',
        $5,
        NOW()
      )
      `,
      [
        productId,
        quantityDifference,
        previousStock,
        adjustedStock,
        remarks || "",
      ]
    );

    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      message: "Inventory adjusted successfully.",
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error("ADJUST STOCK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to adjust inventory.",
      },
      {
        status: 500,
      }
    );

  } finally {

    client.release();

  }
}