import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '@/lib/db/client'
import { auditLogs, paymentConfig } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/server/session'

const configSchema = z.object({ walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Enter a valid BEP-20 wallet address'), qrCodeDataUrl: z.string().max(2_000_000).nullable().optional(), instructions: z.string().max(2000).nullable().optional() })

export async function GET() {
  const db = getDb()
  const [config] = await db.select().from(paymentConfig).where(eq(paymentConfig.id, 1)).limit(1)
  return NextResponse.json(config ?? null)
}

export async function PUT(request: Request) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const parsed = configSchema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid configuration' }, { status: 400 })
  try {
    const db = getDb()
    const values = { network: 'BEP-20', walletAddress: parsed.data.walletAddress, qrCodeDataUrl: parsed.data.qrCodeDataUrl ?? null, instructions: parsed.data.instructions ?? null, updatedAt: new Date() }
    const [config] = await db.insert(paymentConfig).values({ id: 1, ...values }).onConflictDoUpdate({ target: paymentConfig.id, set: values }).returning()
    await db.insert(auditLogs).values({ action: 'payment_config_updated', actor: 'admin', entityId: '1', metadata: { network: 'BEP-20' } })
    return NextResponse.json(config)
  } catch (error) {
    console.error('[admin/payment-config] update failed', error)
    return NextResponse.json({ error: 'Payment configuration could not be saved. Verify DATABASE_URL and run the database migration.' }, { status: 500 })
  }
}
