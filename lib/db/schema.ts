import { pgTable, text, timestamp, uuid, integer, jsonb, uniqueIndex } from 'drizzle-orm/pg-core'

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const paymentConfig = pgTable('payment_config', {
  id: integer('id').primaryKey().default(1),
  network: text('network').notNull().default('BEP-20'),
  walletAddress: text('wallet_address').notNull(),
  qrCodeDataUrl: text('qr_code_data_url'),
  instructions: text('instructions'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').notNull().references(() => sessions.id),
  token: text('token').notNull(),
  network: text('network').notNull().default('BEP-20'),
  amount: text('amount').notNull(),
  fee: text('fee').notNull(),
  duration: text('duration').notNull(),
  recipientAddress: text('recipient_address').notNull(),
  status: text('status').notNull().default('awaiting_payment'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const paymentSubmissions = pgTable('payment_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  sessionId: uuid('session_id').notNull().references(() => sessions.id),
  transactionHash: text('transaction_hash').notNull(),
  note: text('note'),
  status: text('status').notNull().default('pending_review'),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, table => ({ transactionHashUnique: uniqueIndex('payment_transaction_hash_idx').on(table.transactionHash) }))

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  action: text('action').notNull(),
  actor: text('actor').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type PaymentConfig = typeof paymentConfig.$inferSelect
export type Order = typeof orders.$inferSelect
export type PaymentSubmission = typeof paymentSubmissions.$inferSelect

export const schema = { sessions, paymentConfig, orders, paymentSubmissions, auditLogs }
export const DB_ENV_NAME = 'DATABASE_URL'
