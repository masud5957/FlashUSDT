import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const databaseUrl = process.env.DATABASE_URL ?? ''
const migrationUrl = databaseUrl && !/[?&]sslmode=/.test(databaseUrl) ? `${databaseUrl}${databaseUrl.includes('?') ? '&' : '?'}sslmode=require` : databaseUrl

export default defineConfig({ schema: './lib/db/schema.ts', out: './drizzle', dialect: 'postgresql', dbCredentials: { url: migrationUrl } })
