import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

/* =========================================
   GET ALL ORDERS
========================================= */
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.order_number AS "orderNumber",
        o.customer_name AS "customerName",
        o.customer_email AS "customerEmail",
        o.customer_phone AS "customerPhone",
        o.status,
        o.total_amount AS "totalAmount",
        o.order_date AS "orderDate",
        o.delivery_date AS "deliveryDate",
        o.payment_method AS "paymentMethod",
        o.shipping_address AS "shippingAddress",
        o.notes,
        o.created_at AS "createdAt",
        o.updated_at AS "updatedAt",

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
      LEFT JOIN order_items oi ON oi.order_id = o.id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `)

    return NextResponse.json(result.rows)

  } catch (err) {
    console.error("GET ORDERS ERROR:", err)

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

/* =========================================
   CREATE NEW ORDER
========================================= */
export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("CREATE ORDER BODY:", body)

    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
      notes,
      status,
      totalAmount,
      orderDate,
      items
    } = body

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`

    // Insert main order
    const orderResult = await pool.query(
      `
      INSERT INTO orders (
        order_number,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        payment_method,
        notes,
        status,
        total_amount,
        order_date,
        created_at,
        updated_at
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW(),NOW()
      )
      RETURNING id
      `,
      [
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        paymentMethod,
        notes,
        status,
        totalAmount,
        orderDate
      ]
    )

    const orderId = orderResult.rows[0].id

    console.log("NEW ORDER ID:", orderId)

    // Insert order items
    for (const item of items) {
      await pool.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          quantity,
          unit_price,
          total_price
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        `,
        [
          orderId,
          item.productId,
          item.productName,
          item.quantity,
          item.unitPrice,
          item.totalPrice
        ]
      )
    }

    return NextResponse.json({
      success: true,
      orderId
    })

  } catch (err) {
    console.error("CREATE ORDER ERROR:", err)

    return NextResponse.json(
      {
        error: "Failed to create order",
        details: String(err)
      },
      { status: 500 }
    )
  }
}