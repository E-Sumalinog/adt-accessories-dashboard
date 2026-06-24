import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    console.log("UPDATE BODY:", body)
    console.log("ORDER ID:", params.id)

    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      status,
      paymentMethod,
      notes
    } = body

    const result = await pool.query(
      `
      UPDATE orders
      SET
        customer_name = $1,
        customer_email = $2,
        customer_phone = $3,
        shipping_address = $4,
        status = $5,
        payment_method = $6,
        notes = $7,
        updated_at = NOW()
      WHERE id = $8
      RETURNING *
      `,
      [
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        status,
        paymentMethod,
        notes,
        params.id
      ]
    )
    console.log("UPDATED ROW:", result.rows[0])
    return NextResponse.json(result.rows[0])
  } catch (err) {
    console.error("UPDATE ERROR:", err)

    return NextResponse.json(
      { error: "Failed to update order", details: String(err) },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    console.log("PATCH BODY:", body)
    console.log("ORDER ID:", params.id)

    const { status } = body

    const result = await pool.query(
      `
      UPDATE orders
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING *
      `,
      [status, params.id]
    )

    console.log("PATCHED ROW:", result.rows[0])
    return NextResponse.json(result.rows[0])
  } catch (err) {
    console.error("PATCH ERROR:", err)

    return NextResponse.json(
      { error: "Failed to update order status", details: String(err) },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("DELETE ORDER ID:", params.id)

    // Delete order items first
    await pool.query(
      `DELETE FROM order_items WHERE order_id = $1`,
      [params.id]
    )

    // Delete order
    await pool.query(
      `DELETE FROM orders WHERE id = $1`,
      [params.id]
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("DELETE ERROR:", err)

    return NextResponse.json(
      { error: "Failed to delete order", details: String(err) },
      { status: 500 }
    )
  }
}