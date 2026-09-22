import fs from 'node:fs/promises'
import postgres from 'postgres'

const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not configured')

const migrationUrl = new URL(url)
if (!migrationUrl.searchParams.has('sslmode')) migrationUrl.searchParams.set('sslmode', 'require')

const sql = postgres(migrationUrl.toString(), { max: 1, prepare: false })
try {
  await sql`CREATE TABLE IF NOT EXISTS __app_migrations (id text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`
  const migrationId = '0000_parallel_iron_man'
  const applied = await sql`SELECT id FROM __app_migrations WHERE id = ${migrationId}`
  if (applied.length === 0) {
    const file = await fs.readFile(new URL('../drizzle/0000_parallel_iron_man.sql', import.meta.url), 'utf8')
    for (const statement of file.split('--> statement-breakpoint').map(value => value.trim()).filter(Boolean)) {
      await sql.unsafe(statement)
    }
    await sql`INSERT INTO __app_migrations (id) VALUES (${migrationId})`
    console.log(`Applied migration ${migrationId}`)
  } else {
    console.log(`Migration ${migrationId} already applied`)
  }
} finally {
  await sql.end({ timeout: 5 })
}
