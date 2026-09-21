import { NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '@/lib/db/client'
import { auditLogs, orders, paymentSubmissions } from '@/lib/db/schema'
import { getOrCreateSession } from '@/lib/server/session'

const paymentSchema = z.object({ transactionHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, 'Enter a valid BEP-20 transaction hash'), note: z.string().max(1000).optional() })

export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const parsed = paymentSchema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payment submission' }, { status: 400 })
  const session = await getOrCreateSession()
  const db = getDb()
  const [order] = await db.select().from(orders).where(and(eq(orders.id, orderId), eq(orders.sessionId, session.id))).limit(1)
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (order.network !== 'BEP-20') return NextResponse.json({ error: 'Only BEP-20 payments are supported' }, { status: 400 })
  try {
    const [submission] = await db.insert(paymentSubmissions).values({ ...parsed.data, orderId, sessionId: session.id }).returning()
    await db.update(orders).set({ status: 'pending_review' }).where(eq(orders.id, orderId))
    await db.insert(auditLogs).values({ action: 'payment_submitted', actor: 'session', entityId: submission.id, metadata: { orderId } })
    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    if (String(error).includes('payment_transaction_hash_idx')) return NextResponse.json({ error: 'This transaction hash has already been submitted' }, { status: 409 })
    throw error
  }
}
