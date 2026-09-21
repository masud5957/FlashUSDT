import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL

export function getDb() {
  if (!databaseUrl) throw new Error('DATABASE_URL is not configured')
  return drizzle(postgres(databaseUrl, { max: 5, prepare: false }), { schema })
}
