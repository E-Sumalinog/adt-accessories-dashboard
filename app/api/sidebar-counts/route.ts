import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
try {
const [
ordersResult,
customersResult,
productsResult,
inventoryResult,
] = await Promise.all([
    pool.query(`SELECT COUNT(*) FROM orders`),
    pool.query(`SELECT COUNT(*) FROM customers`),
    pool.query(`SELECT COUNT(*) FROM products`),
    pool.query(`SELECT COUNT(*) FROM products`)
])


return NextResponse.json({
  orders: Number(ordersResult.rows[0].count),
  customers: Number(customersResult.rows[0].count),
  products: Number(productsResult.rows[0].count),
  inventory: Number(inventoryResult.rows[0].count),
})


} catch (error) {
console.error("SIDEBAR COUNTS ERROR:", error)


return NextResponse.json(
  {
    error: "Failed to fetch sidebar counts",
  },
  {
    status: 500,
  }
)


}
}
