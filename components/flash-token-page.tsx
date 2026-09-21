'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Check, Copy, Globe2, LockKeyhole, ShieldCheck, Sparkles, Zap, WalletCards, ArrowUpRight, Languages, Menu, X } from 'lucide-react'

const networks = ['ERC-20', 'TRC-20', 'BEP-20', 'MATIC']
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
  const [selectedToken, setSelectedToken] = useState('USDT')
  const [selectedAmount, setSelectedAmount] = useState('100,000 USDT')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [copied, setCopied] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="mx-auto w-full max-w-[430px] px-2 pb-10 md:max-w-5xl md:px-6">
        <header className="relative flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-1 font-sans text-[11px] font-black leading-[0.86] tracking-[-0.04em] text-foreground"><span className="text-[8px] text-primary">◢</span> FLASH<br/>TOKEN</a>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-border bg-card p-2 text-muted-foreground md:hidden">{menuOpen ? <X size={13}/> : <Menu size={13}/>}</button>
          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute right-0 top-12 z-10 flex-col gap-3 rounded-xl border border-border bg-card p-4 text-xs shadow-xl md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            {['Home', 'How It Works', 'FAQ'].map((item) => <a key={item} href={item === 'FAQ' ? '#faq' : '#generator'} onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground">{item}</a>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex"><span className="text-xs text-muted-foreground">EN</span><span className="text-xs text-muted-foreground">RU</span><span className="text-xs text-muted-foreground">ES</span></div>
        </header>

        <div className="flex items-center justify-between rounded-full border border-border bg-card px-3 py-1 text-[9px] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#37e99b]"/><div className="flex gap-5"><span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground">EN</span><span>RU</span><span>ES</span><span>⌘</span></div></div>

        <section id="top" className="flex flex-col items-center px-3 pb-7 pt-12 text-center"><div className="mb-4 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary">⌁ All Systems Operational</div><h1 className="font-sans text-2xl font-bold tracking-tight text-primary">FLASH TOKEN</h1><p className="mt-1 text-[10px] text-muted-foreground">Create Flash USDT Tokens with Ease</p><p className="mt-3 max-w-xs text-[8px] leading-4 text-muted-foreground">Deployable on Ethereum, Tron, BSC &amp; Polygon with original functionality and proper verification.</p><div className="mt-5 grid w-full max-w-xs grid-cols-3 gap-4"><Stat value="80M+" label="Tokens Generated"/><Stat value="6" label="Networks Supported"/><Stat value="99.9%" label="Uptime"/></div></section>

        <section className="rounded-xl border border-border bg-card p-5 text-center"><div className="mb-4 flex justify-center gap-2"><IconBadge><WalletCards/></IconBadge><IconBadge><Zap/></IconBadge><IconBadge><ShieldCheck/></IconBadge></div><h2 className="text-sm font-bold">Smart Contract<br/>Technology</h2><p className="mx-auto mt-3 max-w-xs text-[9px] leading-4 text-muted-foreground">All flash tokens are generated through secure, audited smart contracts deployed across Ethereum, Tron, BSC, and Polygon networks.</p><div className="mt-4 flex justify-center gap-2">{networks.map(n => <span key={n} className="rounded-full border border-primary/50 px-2 py-0.5 text-[7px] text-primary">{n}</span>)}</div></section>

        <div className="my-5 grid grid-cols-2 gap-2"><Trust icon={<LockKeyhole/>} title="SSL SECURED" text="256-bit encryption"/><Trust icon={<Check/>} title="VERIFIED" text="Security audited"/><Trust icon={<WalletCards/>} title="SMART CONTRACT" text="Audited"/><Trust icon={<Sparkles/>} title="BLOCKCHAIN" text="Protected"/></div>

        <section className="mb-7 rounded-xl border border-border bg-card px-4 py-4 text-center"><p className="text-[8px] uppercase tracking-[0.22em] text-muted-foreground">Wallet Status</p><p className="mb-3 text-xs text-muted-foreground">Not Connected</p><button className="rounded-lg bg-primary px-7 py-2 text-[9px] font-bold text-primary-foreground shadow-[0_0_18px_rgba(132,54,255,.28)]">⌘ CONNECT WALLET</button></section>

        <section id="generator" className="rounded-xl border border-border bg-card p-4"><h2 className="text-center text-sm font-bold">Generate Flash Token</h2><label className="mt-5 block text-[8px] uppercase tracking-wider text-muted-foreground">Select Token <span className="text-destructive">*</span></label><div className="mt-2 grid grid-cols-2 gap-2">{['USDT','USDC','USDP','USDT'].map((token, i) => <button key={`${token}-${i}`} onClick={() => setSelectedToken(token)} className={`flex h-14 flex-col items-center justify-center rounded-lg border text-[8px] ${selectedToken === token && i === 0 ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}><span className="mb-1 text-base text-primary">{i % 2 ? '◉' : '◈'}</span>{token}</button>)}</div><Field label="Token Symbol" value={selectedToken}/><Field label="Select Network" value="Select Network⌄"/><label className="mt-4 block text-[8px] uppercase tracking-wider text-muted-foreground">Select Amount <span className="text-destructive">*</span></label><div className="mt-2 grid grid-cols-2 gap-2">{['80,000 USDT','90,000 USDT','200,000 USDT','500,000 USDT'].map(a => <button key={a} onClick={() => setSelectedAmount(a)} className={`rounded-lg border py-2 text-[8px] ${selectedAmount === a ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground'}`}>{a}</button>)}</div><button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-[10px] font-bold text-primary-foreground shadow-[0_0_18px_rgba(132,54,255,.3)]">{copied ? <><Check size={12}/> READY TO FLASH</> : <><Sparkles size={12}/> FLASH NOW</>}</button></section>

        <section className="py-8"><h2 className="mb-5 text-center text-sm font-bold">Why Choose Us</h2><div className="space-y-2">{[['Multi-Network','Native support for Ethereum, Tron, BSC, and Polygon networks with original contract execution through multiple networks.', Globe2],['Fast Delivery','Instant token generation with blockchain confirmation within minutes.', Zap],['Fully Audited','All smart contracts verified and audited for maximum security.', LockKeyhole],['Flexible Duration','Choose token lifetime from 7 to 30 days with full transfer support.', Copy]].map(([title, text, Icon]) => <div key={title as string} className="rounded-xl border border-border bg-card p-4"><div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon size={14}/></div><h3 className="text-[10px] font-bold">{title as string}</h3><p className="mt-2 text-[8px] leading-4 text-muted-foreground">{text as string}</p></div>)}</div></section>

        <section id="faq" className="pb-10"><h2 className="mb-5 text-center text-sm font-bold">Frequently Asked Questions</h2><div className="space-y-2">{faqs.map(([q,a], i) => <div key={q} className="rounded-xl border border-border bg-card px-3"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center gap-2 py-3 text-left text-[9px] font-bold"><span className="text-primary">Q</span><span className="flex-1">{q}</span><ChevronDown size={12} className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`}/></button>{openFaq === i && <p className="border-t border-border pb-3 pt-2 text-[8px] leading-4 text-muted-foreground">{a}</p>}</div>)}</div></section>

        <footer className="border-t border-border pt-7 text-center text-[8px] text-muted-foreground"><p className="font-serif text-[10px] text-foreground">The Most Trusted Flash Token Generation<br/>Platform</p><div className="my-4 text-left leading-4"><p className="font-bold text-foreground">◉ REGISTERED OFFICE</p><p>Suite 102, 3rd Floor, 119 Finch Road, George Town, Grand Cayman KY1-1001, Cayman Islands</p></div><p>◎ @flashtokenorg</p><p className="mt-5">© 2026 Flash Token. All rights reserved.</p></footer>
      </div>
    </main>
  )
}

function Stat({ value, label }: { value: string; label: string }) { return <div><strong className="text-xs text-foreground">{value}</strong><p className="text-[7px] text-muted-foreground">{label}</p></div> }
function IconBadge({ children }: { children: React.ReactNode }) { return <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">{children && <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{children}</span>}</div> }
function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-2"><span className="text-primary [&>svg]:h-3 [&>svg]:w-3">{icon}</span><div><p className="text-[7px] font-bold">{title}</p><p className="text-[6px] text-muted-foreground">{text}</p></div></div> }
function Field({ label, value }: { label: string; value: string }) { return <div className="mt-4"><label className="block text-[8px] uppercase tracking-wider text-muted-foreground">{label} <span className="text-destructive">*</span></label><div className="mt-2 rounded-lg border border-border bg-background px-3 py-2 text-[8px] text-muted-foreground">{value}</div></div> }

void ArrowUpRight
void Languages
