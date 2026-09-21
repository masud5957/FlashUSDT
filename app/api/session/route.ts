import { NextResponse } from 'next/server'
import { getOrCreateSession } from '@/lib/server/session'

export async function POST() {
  const session = await getOrCreateSession()
  return NextResponse.json({ sessionId: session.id, expiresAt: session.expiresAt })
}
