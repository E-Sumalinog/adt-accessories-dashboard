import { pool } from "@/lib/db"

interface ActivityLog {
  userName: string
  action: string
  entity: string
  entityId?: number
  description: string
}

export async function logActivity({
  userName,
  action,
  entity,
  entityId,
  description,
}: ActivityLog) {
  try {
    await pool.query(
      `
      INSERT INTO activity_logs
      (
        user_name,
        action,
        entity,
        entity_id,
        description
      )
      VALUES ($1,$2,$3,$4,$5)
      `,
      [
        userName,
        action,
        entity,
        entityId || null,
        description,
      ]
    )
  } catch (error) {
    console.error("LOG ACTIVITY ERROR:", error)
  }
}