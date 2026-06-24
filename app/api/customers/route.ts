import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

/*
=========================================
GET ALL CUSTOMERS
=========================================
*/
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        phone,
        address,
        status,
        join_date AS "joinDate",
        last_order_date AS "lastOrderDate",
        total_orders AS "totalOrders",
        total_spent AS "totalSpent",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM customers
      ORDER BY created_at DESC
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("GET CUSTOMERS ERROR:", error)
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    )
  }
}

/*
=========================================
CREATE CUSTOMER
=========================================
*/
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = await pool.query(
      `
      INSERT INTO customers (
        name,
        email,
        phone,
        address,
        status,
        join_date,
        last_order_date,
        total_orders,
        total_spent
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
      [
        body.name,
        body.email,
        body.phone || null,
        body.address || null,
        body.status || 'active',
        body.joinDate || new Date().toISOString().split('T')[0],
        body.lastOrderDate || null,
        body.totalOrders || 0,
        body.totalSpent || 0
      ]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("CREATE CUSTOMER ERROR:", error)
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    )
  }
}

/*
=========================================
UPDATE CUSTOMER
=========================================
*/
export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const result = await pool.query(
      `
      UPDATE customers
      SET
        name = $1,
        email = $2,
        phone = $3,
        address = $4,
        status = $5,
        last_order_date = $6,
        total_orders = $7,
        total_spent = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING *
      `,
      [
        body.name,
        body.email,
        body.phone,
        body.address,
        body.status,
        body.lastOrderDate,
        body.totalOrders,
        body.totalSpent,
        body.id
      ]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("UPDATE CUSTOMER ERROR:", error)
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    )
  }
}

/*
=========================================
DELETE CUSTOMER
=========================================
*/
export async function DELETE(req: Request) {
  try {
    const body = await req.json()

    await pool.query(
      `
      DELETE FROM customers
      WHERE id = $1
      `,
      [body.id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE CUSTOMER ERROR:", error)
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    )
  }
}
