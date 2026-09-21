import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getDb } from '@/lib/db/client'
import { auditLogs, orders } from '@/lib/db/schema'
import { getOrCreateSession } from '@/lib/server/session'

const orderSchema = z.object({ token: z.literal('USDT'), network: z.literal('BEP-20'), amount: z.string().min(1).max(40), fee: z.string().min(1).max(40), duration: z.string().min(1).max(20), recipientAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Enter a valid recipient address') })

export async function POST(request: Request) {
  const parsed = orderSchema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid order' }, { status: 400 })
  const session = await getOrCreateSession()
  const db = getDb()
  const [order] = await db.insert(orders).values({ ...parsed.data, sessionId: session.id }).returning()
  await db.insert(auditLogs).values({ action: 'order_created', actor: 'session', entityId: order.id, metadata: { network: order.network } })
  return NextResponse.json(order, { status: 201 })
}
