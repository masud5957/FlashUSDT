import { createHash, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { eq, lt } from 'drizzle-orm'
import { getDb } from '@/lib/db/client'
import { sessions } from '@/lib/db/schema'

const COOKIE_NAME = 'flash_session'
const SESSION_DAYS = 7

function hash(value: string) { return createHash('sha256').update(value).digest('hex') }

export async function getOrCreateSession() {
  const cookieStore = await cookies()
  const existing = cookieStore.get(COOKIE_NAME)?.value
  const db = getDb()
  if (existing) {
    const [session] = await db.select().from(sessions).where(eq(sessions.tokenHash, hash(existing))).limit(1)
    if (session && session.expiresAt > new Date()) return session
  }
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()))
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000)
  const [session] = await db.insert(sessions).values({ tokenHash: hash(token), expiresAt }).returning()
  cookieStore.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', expires: expiresAt })
  return session
}

export async function requireAdmin(request: Request) {
  const expected = process.env.ADMIN_API_KEY
  if (!expected) throw new Error('ADMIN_API_KEY is not configured')
  const supplied = request.headers.get('x-admin-api-key') ?? request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!supplied || supplied !== expected) return false
  return true
}
