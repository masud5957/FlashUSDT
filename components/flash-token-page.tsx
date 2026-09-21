'use client'

import { useState } from 'react'
import { Check, ChevronDown, Copy, Globe2, LockKeyhole, Menu, ShieldCheck, Sparkles, WalletCards, X, Zap } from 'lucide-react'

const networks = ['ERC-20', 'TRC-20', 'BEP-20', 'MATIC']
const tokenOptions = [
  { name: 'USDT', network: 'ERC-20', mark: '◆', tone: 'text-slate-300' },
  { name: 'USDT', network: 'TRC-20', mark: '△', tone: 'text-red-500' },
  { name: 'USDT', network: 'BEP-20', mark: '✥', tone: 'text-yellow-400' },
  { name: 'USDT', network: 'MATIC', mark: '⬡', tone: 'text-violet-500' },
]
const faqs = [
  ['What is Flash Token?', 'Flash Token is a service that generates temporary USDT tokens on multiple blockchain networks including Ethereum, Tron, BSC, and Polygon. These tokens can be used for testing, development, or demonstration purposes.'],
  ['Can I use Flash USDT for trading?', 'No, it is purely for testing purposes and is not designed for real-world transactions. Flash tokens are not redeemable for real assets.'],
  ['How long do Flash tokens last?', 'Flash Tokens have flexible validity periods ranging from 7 to 30 days, depending on your selection during the generation process.'],
  ['Can I transfer Flash USDT to other wallets?', 'Yes, these tokens can be transferred on unlimited number of times to any compatible wallet.'],
  ['What is the expected delivery time?', 'Most transactions are instant. Depending on network congestion, please allow 10–15 minutes for the transaction to be fully confirmed.'],
]

export function FlashTokenPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState('EN')
  const [selectedToken, setSelectedToken] = useState(3)
  const [selectedAmount, setSelectedAmount] = useState('30,000 USDT')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [ready, setReady] = useState(false)
  const token = tokenOptions[selectedToken]

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1160px] px-5 pb-20 md:px-8">
        <header className="relative flex items-center justify-between py-5 md:py-6">
          <a href="#top" className="flex items-center gap-3 font-sans text-[18px] font-black leading-[0.85] tracking-[-0.05em] md:text-[20px]"><span className="text-4xl leading-none text-yellow-400">ϟ</span><span>FLASH<br/><em className="not-italic text-primary">TOKEN</em></span></a>
          <div className="flex items-center gap-3"><span className="hidden rounded-full border border-border px-4 py-2 text-xs text-muted-foreground md:inline-flex"><i className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400"/>Live</span><button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-border p-2 text-muted-foreground md:hidden">{menuOpen ? <X size={16}/> : <Menu size={16}/>}</button></div>
        </header>
        <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute right-5 top-16 z-10 flex-col gap-3 rounded-xl border border-border bg-card p-4 text-xs md:hidden`}>{['Home', 'Generator', 'FAQ'].map(item => <a key={item} href={item === 'FAQ' ? '#faq' : item === 'Generator' ? '#generator' : '#top'} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
        <div className="flex h-12 items-center justify-end rounded-full border border-border bg-card/70 px-4"><div className="flex items-center gap-5 text-xs font-semibold text-muted-foreground">{['EN', 'RU', 'ES', '中文'].map(item => <button key={item} onClick={() => setLanguage(item)} className={language === item ? 'rounded-full bg-primary/25 px-3 py-1 text-primary' : ''}>{item}</button>)}</div></div>

        <section id="top" className="flex flex-col items-center px-4 pb-14 pt-24 text-center md:pt-28"><div className="mb-8 rounded-full border border-primary/50 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary">〽 All Systems Operational</div><h1 className="text-balance text-5xl font-bold tracking-tight text-primary md:text-7xl">FLASH TOKEN</h1><p className="mt-4 text-xl text-muted-foreground md:text-2xl">Create Flash USDT Tokens with Ease</p><p className="mt-5 text-sm text-muted-foreground">Deployed on Ethereum, Tron, BSC &amp; Polygon with original contract addresses</p><div className="mt-10 flex gap-12 md:gap-20"><Stat value="80M+" label="Tokens Generated"/><Stat value="6" label="Networks Supported"/><Stat value="99.9%" label="Uptime"/></div></section>

        <section className="rounded-2xl border border-border bg-card/80 px-6 py-10 text-center md:px-14"><div className="mb-7 flex justify-center gap-4"><IconBadge><WalletCards/></IconBadge><IconBadge><Zap/></IconBadge><IconBadge><ShieldCheck/></IconBadge></div><h2 className="text-2xl font-bold">Smart Contract Technology</h2><p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground">All flash tokens are generated through secure, audited smart contracts deployed across Ethereum, Tron, BSC, and Polygon networks.</p><div className="mt-7 flex flex-wrap justify-center gap-4">{networks.map(n => <span key={n} className="rounded-full border border-primary/50 bg-primary/5 px-5 py-2 text-sm font-semibold text-primary">{n}</span>)}</div></section>

        <div className="mx-auto my-12 grid max-w-[720px] grid-cols-2 gap-3 md:grid-cols-4"><Trust icon={<ShieldCheck/>} title="SSL SECURED" text="256-bit Encryption"/><Trust icon={<Check/>} title="VERIFIED" text="Security Audited"/><Trust icon={<LockKeyhole/>} title="SMART CONTRACT" text="Audited"/><Trust icon={<Zap/>} title="BLOCKCHAIN" text="Protected"/></div>

        <section className="mx-auto mb-12 flex max-w-[840px] items-center justify-between rounded-2xl border border-border bg-card/80 px-5 py-5 md:px-6"><div><p className="text-sm font-bold uppercase text-muted-foreground">Wallet Status</p><p className="mt-1 text-lg text-muted-foreground">Not Connected</p></div><button className="rounded-xl bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-[0_0_24px_rgba(132,54,255,.3)]"><span className="mr-2">↔</span> CONNECT WALLET</button></section>

        <section id="generator" className="mx-auto max-w-[840px] rounded-2xl border border-border bg-card/80 p-6 md:p-10"><h2 className="text-center text-2xl font-bold">Generate Flash Token</h2><div className="mx-auto mb-8 mt-3 h-px w-14 bg-border"/><label className="block text-sm font-bold uppercase text-muted-foreground">Select Token <span className="text-destructive">*</span></label><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{tokenOptions.map((item, i) => <button key={item.network} onClick={() => setSelectedToken(i)} className={`rounded-xl border px-2 py-5 text-center ${selectedToken === i ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}><span className={`block text-4xl ${item.tone}`}>{item.mark}</span><span className="mt-2 block text-lg font-bold">{item.name}</span><span className="text-sm text-muted-foreground">{item.network}</span></button>)}</div><Field label="Token Symbol" value={token.name}/><Field label="Select Network" value={token.network === 'MATIC' ? 'Polygon (MATIC)' : token.network}/><label className="mt-7 block text-sm font-bold uppercase text-muted-foreground">Select Amount <span className="text-destructive">*</span></label><div className="mt-4 grid grid-cols-2 gap-3">{[['30,000 USDT', '39.00 USD'], ['90,000 USDT', '86.00 USD'], ['200,000 USDT', '159.00 USD'], ['500,000 USDT', '398.00 USD']].map(([amount, fee]) => <button key={amount} onClick={() => setSelectedAmount(amount)} className={`rounded-xl border px-3 py-4 text-base font-bold transition-colors ${selectedAmount === amount ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background'}`}><span className="block">{amount}</span>{selectedAmount === amount && <span className="mt-1 block text-sm font-medium text-primary">Fee: {fee}</span>}</button>)}</div><div className="mt-5 rounded-xl border border-primary/60 bg-primary/10 px-4 py-4 text-center"><p className="text-sm text-muted-foreground">Processing Fee</p><p className="mt-1 text-xl font-bold text-foreground">{selectedAmount === '30,000 USDT' ? '39.00 USD' : selectedAmount === '90,000 USDT' ? '86.00 USD' : selectedAmount === '200,000 USDT' ? '159.00 USD' : '398.00 USD'}</p></div><button onClick={() => { setReady(true); setTimeout(() => setReady(false), 1800) }} className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-5 text-lg font-bold text-primary-foreground shadow-[0_0_24px_rgba(132,54,255,.34)]">{ready ? <><Check/> READY TO FLASH</> : <><Sparkles/> FLASH NOW</>}</button></section>

        <section className="mx-auto max-w-[1120px] py-20"><h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2><div className="grid gap-5 md:grid-cols-2">{[['Multi-Network','Native support for Ethereum, Tron, BSC, and Polygon networks with original contract addresses', Globe2],['Fast Delivery','Instant token generation with blockchain confirmation within minutes', Zap],['Fully Audited','All smart contracts verified and audited for maximum security', LockKeyhole],['Flexible Duration','Choose token lifetime from 7 to 90 days with full transfer support', Copy]].map(([title, text, Icon], i) => <div key={title as string} className={`rounded-2xl border ${i === 1 ? 'border-primary/60' : 'border-border'} bg-card/70 p-8`}><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon size={28}/></div><h3 className="text-xl font-bold">{title as string}</h3><p className="mt-4 text-base leading-7 text-muted-foreground">{text as string}</p></div>)}</div></section>

        <section id="faq" className="mx-auto max-w-[840px] pb-16"><div className="mb-10 text-center"><div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">?</div><h2 className="text-3xl font-bold">Frequently Asked Questions</h2></div><div className="space-y-3">{faqs.map(([q, a], i) => <div key={q} className="rounded-xl border border-border bg-card/70 px-5"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center gap-3 py-5 text-left text-sm font-bold"><span className="text-primary">Q</span><span className="flex-1">{q}</span><ChevronDown size={18} className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`}/></button>{openFaq === i && <p className="border-t border-border pb-5 pt-4 text-sm leading-6 text-muted-foreground">{a}</p>}</div>)}</div></section>
        <footer className="border-t border-border pt-10 text-center text-xs text-muted-foreground"><p className="text-sm text-foreground">The Most Trusted Flash Token Generation<br/>Platform</p><div className="mx-auto my-7 max-w-md text-left leading-5"><p className="font-bold text-foreground">◉ REGISTERED OFFICE</p><p>Suite 102, 3rd Floor, 119 Finch Road, George Town, Grand Cayman KY1-1001, Cayman Islands</p></div><p>◎ @flashtokenorg</p><p className="mt-6">© 2026 Flash Token. All rights reserved.</p></footer>
      </div>
    </main>
  )
}

function Stat({ value, label }: { value: string; label: string }) { return <div><strong className="text-3xl font-bold text-foreground md:text-4xl">{value}</strong><p className="mt-1 text-sm text-muted-foreground">{label}</p></div> }
function IconBadge({ children }: { children: React.ReactNode }) { return <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary [&>svg]:h-8 [&>svg]:w-8">{children}</div> }
function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-4"><span className="text-primary [&>svg]:h-5 [&>svg]:w-5">{icon}</span><div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-[11px] text-muted-foreground">{text}</p></div></div> }
function Field({ label, value }: { label: string; value: string }) { return <div className="mt-7"><label className="block text-sm font-bold uppercase text-muted-foreground">{label} <span className="text-destructive">*</span></label><div className="mt-3 rounded-xl border border-border bg-background px-4 py-4 text-base">{value}</div></div> }
