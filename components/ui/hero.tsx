"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: '#F4EADD' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(110,44,20,0.18), transparent 70%)' }} />
      <header className="relative z-20 flex items-center justify-between px-8 py-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em', color: '#6E2C14' }}>
          STUDIO PULGA
        </motion.div>
        <nav className="flex items-center gap-2">
          {['Studio', 'Clientes', 'Portfólio'].map((item, i) => (
            <motion.a key={item} href={`#${item.toLowerCase()}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }} className="px-4 py-2 rounded-full text-sm font-medium" style={{ color: 'rgba(110,44,20,0.55)', fontFamily: 'Outfit, sans-serif' }}>
              {item}
            </motion.a>
          ))}
          <motion.a href="/orcamento" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="px-5 py-2 rounded-full text-sm font-semibold text-white" style={{ background: '#6E2C14', fontFamily: 'Josefin Sans, sans-serif' }}>
            Ver Planos →
          </motion.a>
        </nav>
      </header>
      <main className="relative z-10 flex-1 flex flex-col justify-center px-16 pb-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 w-fit" style={{ background: 'rgba(110,44,20,0.09)', border: '1px solid rgba(110,44,20,0.15)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(110,44,20,0.55)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6E2C14' }} />
          Studio de Marketing — Litoral SP
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }} style={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 900, fontSize: 'clamp(60px, 10vw, 130px)', lineHeight: 0.9, letterSpacing: '-0.03em', color: '#6E2C14' }}>
          <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 56px)', color: 'rgba(110,44,20,0.55)', marginBottom: 8 }}>criamos,</span>
          STUDIO<br/>PULGA
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 18, fontWeight: 300, color: 'rgba(110,44,20,0.55)', maxWidth: 480, lineHeight: 1.7, marginTop: 24, marginBottom: 40 }}>
          Gestão de marca, produção de conteúdo e identidade visual para quem quer presença real nas redes.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-4">
          <a href="/orcamento" className="px-8 py-4 rounded-full text-white font-semibold text-sm" style={{ background: '#6E2C14', fontFamily: 'Josefin Sans, sans-serif' }}>Ver Planos ↗</a>
          <a href="#studio" className="px-8 py-4 rounded-full font-semibold text-sm" style={{ border: '2px solid rgba(110,44,20,0.15)', color: '#6E2C14', fontFamily: 'Josefin Sans, sans-serif' }}>Conheça o Studio</a>
        </motion.div>
      </main>
    </div>
  )
}