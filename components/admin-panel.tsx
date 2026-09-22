'use client'

import { FormEvent, useState } from 'react'

export function AdminPanel() {
  const [apiKey, setApiKey] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [instructions, setInstructions] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/payment-config', {
        method: 'PUT',
        headers: { 'content-type': 'application/json', 'x-admin-api-key': apiKey },
        body: JSON.stringify({ walletAddress, qrCodeDataUrl: qrCodeDataUrl || null, instructions: instructions || null }),
      })
      const responseText = await response.text()
      let result: { error?: string } = {}
      try { result = responseText ? JSON.parse(responseText) : {} } catch { result = {} }
      if (!response.ok) throw new Error(result.error || `Unable to save configuration (${response.status})`)
      setMessage('Payment configuration saved.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save configuration')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-xl md:p-8">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">FlashUSDT admin</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Payment configuration</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Set the static BEP-20 USDT wallet and QR data shown to customers. Keep your admin key private.</p>
        </div>
        <form onSubmit={save} className="space-y-5">
          <label className="block space-y-2"><span className="text-sm font-medium">Admin API key</span><input required type="password" value={apiKey} onChange={event => setApiKey(event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary" autoComplete="off" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium">BEP-20 receiving wallet</span><input required value={walletAddress} onChange={event => setWalletAddress(event.target.value)} placeholder="0x..." className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-primary" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium">QR code data URL</span><textarea value={qrCodeDataUrl} onChange={event => setQrCodeDataUrl(event.target.value)} placeholder="Paste the QR image data URL supplied by your admin process" rows={4} className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /></label>
          <label className="block space-y-2"><span className="text-sm font-medium">Payment instructions</span><textarea value={instructions} onChange={event => setInstructions(event.target.value)} placeholder="Send USDT on BEP-20 only..." rows={4} className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /></label>
          <button disabled={busy} className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-60">{busy ? 'Saving...' : 'Save payment configuration'}</button>
          {message && <p role="status" className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">{message}</p>}
        </form>
      </section>
    </main>
  )
}
