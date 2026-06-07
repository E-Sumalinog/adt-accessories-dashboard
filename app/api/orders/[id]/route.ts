import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

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