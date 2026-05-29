import HeroSection from "@/components/ui/hero"
import { TextRevealByWord } from "@/components/ui/text-reveal"
import { ShuffleGrid } from "@/components/ui/shuffle-grid"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TextRevealByWord text="Não somos só uma agência. Somos o estúdio criativo que transforma marcas comuns em presenças que marcam de verdade." />
      <section style={{ padding: '120px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6E2C14', marginBottom: 24 }}>— Quem já criou aqui</p>
        <h2 style={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 64px)', color: '#6E2C14', marginBottom: 48, letterSpacing: '-0.02em' }}>Nossos olhares</h2>
        <div style={{ height: 500 }}>
          <ShuffleGrid />
        </div>
      </section>
      <section style={{ background: '#6E2C14', padding: '160px 60px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 6vw, 80px)', color: 'white', letterSpacing: '-0.02em', marginBottom: 24, lineHeight: 1 }}>Pronto para criar<br/>sua presença?</h2>
        <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: 48 }}>A partir de R$ 1.497/mês.</p>
        <a href="/orcamento" style={{ background: 'white', color: '#6E2C14', padding: '18px 48px', borderRadius: 50, fontFamily: 'Josefin Sans, sans-serif', fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Ver Planos →</a>
      </section>
      <footer style={{ background: '#D9C4AC', padding: '60px', borderTop: '1px solid rgba(110,44,20,0.15)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <span style={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 900, fontSize: 22, color: '#6E2C14' }}>STUDIO PULGA</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Studio', 'Clientes', 'Portfólio', 'Orçamento'].map(l => (
              <a key={l} href="#" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'rgba(110,44,20,0.55)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(110,44,20,0.15)', fontSize: 12, color: 'rgba(110,44,20,0.35)', fontFamily: 'Outfit, sans-serif' }}>© 2026 Studio Pulga</div>
      </footer>
      <a href="https://wa.me/5513996057099" target="_blank" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200, background: '#25D366', color: 'white', padding: '14px 24px', borderRadius: 50, fontFamily: 'Josefin Sans, sans-serif', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(37,211,102,0.4)' }}>💬 WhatsApp</a>
    </main>
  )
}
