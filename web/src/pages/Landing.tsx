const PRIMARY = [
  { href: '/today', title: 'Today', emoji: '☀️', subtitle: 'Latest framework runs and pending gates' },
  { href: '/brain', title: 'Brain', emoji: '🧠', subtitle: 'Live company context, voice, and ICP' },
  { href: '/keys', title: 'Keys', emoji: '🔑', subtitle: 'Provider status and health probes' },
  { href: '/skills', title: 'Skills', emoji: '🛠️', subtitle: 'Skill catalog and inline runner' },
]
const LEGACY = [
  { href: '/campaigns', title: 'Campaigns', subtitle: 'LinkedIn outreach dashboard' },
  { href: '/review', title: 'Review', subtitle: 'Lead qualification queue' },
  { href: '/frameworks', title: 'Frameworks', subtitle: 'Installed framework runs' },
  { href: '/monthly-report', title: 'Monthly report', subtitle: 'Cross-campaign rollup' },
  { href: '/brand', title: 'Brand kit', subtitle: 'Tokens, colors, type' },
]
const ChakanaLogo = () => (
  <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
    <path fill="#FF6B35" d="M6 0h6v4h4v6h-4v2h2v2h-2v4H6v-4H4v-2H2v-2H0V4h6V0zM6 4H4v2H2v2h2v2h2v2h2v2h2v-2h2v-2h2V8h-2V6h-2V4H6z"/>
    <circle cx="9" cy="9" r="2.2" fill="#0A0A0A"/>
  </svg>
)
export function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F5F5F5', fontFamily: "'JetBrains Mono', monospace", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.10) 0%, transparent 70%)', top: -200, left: -150, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)', bottom: -100, right: -100, filter: 'blur(80px)' }} />
      </div>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.80)', backdropFilter: 'blur(32px) saturate(180%)', WebkitBackdropFilter: 'blur(32px) saturate(180%)', borderBottom: '1px solid rgba(245,245,245,0.08)', padding: '0 48px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: '#FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 14px rgba(255,107,53,0.4)' }}><ChakanaLogo /></div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: '#FF6B35', letterSpacing: '0.04em' }}>A305 os</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'rgba(245,245,245,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: 'rgba(255,107,53,0.10)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.20)' }}>⚡ Apollo</span>
          <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: 'rgba(93,210,150,0.10)', color: '#5DD296', border: '1px solid rgba(93,210,150,0.20)', display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5DD296', display: 'inline-block' }} />Live</span>
        </div>
      </nav>
      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '64px 48px 100px' }}>
        <div style={{ maxWidth: 700 }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.35)', marginBottom: 16 }}>GTM operating system</p>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 72, fontWeight: 600, lineHeight: 1, color: '#FF6B35', marginBottom: 18, letterSpacing: '-0.5px' }}>INTI</h1>
          <p style={{ fontSize: 14, color: 'rgba(245,245,245,0.55)', lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>Open-source, AI-native GTM engine. Lead finding, enrichment, qualification, and campaign orchestration — all driven from one CLI.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 52 }}>
            {[{label:'Apollo connected',color:'#FF6B35',bg:'rgba(255,107,53,0.08)',border:'rgba(255,107,53,0.25)'},{label:'4 qualified leads',color:'#5DD296',bg:'rgba(93,210,150,0.08)',border:'rgba(93,210,150,0.25)'},{label:'2 gates pending',color:'#E8A55A',bg:'rgba(232,165,90,0.08)',border:'rgba(232,165,90,0.25)'}].map(b=>(
              <span key={b.label} style={{ display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',borderRadius:9999,fontSize:11,fontWeight:500,color:b.color,background:b.bg,border:`1px solid ${b.border}` }}><span style={{ width:5,height:5,borderRadius:'50%',background:b.color,display:'inline-block' }} />{b.label}</span>
            ))}
          </div>
          <p style={{ fontSize:11,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(245,245,245,0.35)',marginBottom:10,fontFamily:"'Outfit', sans-serif" }}>Daily views</p>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:36,maxWidth:780 }}>
            {PRIMARY.map(tile=>(
              <a key={tile.href} href={tile.href} style={{ display:'block',background:'rgba(245,245,245,0.06)',border:'1px solid rgba(245,245,245,0.10)',borderRadius:14,padding:'20px 22px',textDecoration:'none',backdropFilter:'blur(16px) saturate(180%)',WebkitBackdropFilter:'blur(16px) saturate(180%)',transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,107,53,0.5)';e.currentTarget.style.background='rgba(245,245,245,0.09)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(245,245,245,0.10)';e.currentTarget.style.background='rgba(245,245,245,0.06)'}}>
                <div style={{ fontFamily:"'Outfit', sans-serif",fontWeight:600,fontSize:14,marginBottom:4,color:'#F5F5F5' }}>{tile.emoji} {tile.title}</div>
                <div style={{ fontSize:12,color:'rgba(245,245,245,0.50)' }}>{tile.subtitle}</div>
              </a>
            ))}
          </div>
          <p style={{ fontSize:11,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(245,245,245,0.35)',marginBottom:10,fontFamily:"'Outfit', sans-serif" }}>Legacy dashboards</p>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,maxWidth:780 }}>
            {LEGACY.map(tile=>(
              <a key={tile.href} href={tile.href} style={{ display:'block',background:'rgba(245,245,245,0.025)',border:'1px dashed rgba(245,245,245,0.07)',borderRadius:14,padding:'20px 22px',textDecoration:'none',transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(245,245,245,0.06)';e.currentTarget.style.borderColor='rgba(245,245,245,0.10)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(245,245,245,0.025)';e.currentTarget.style.borderColor='rgba(245,245,245,0.07)'}}>
                <div style={{ fontFamily:"'Outfit', sans-serif",fontWeight:500,fontSize:14,marginBottom:4,color:'rgba(245,245,245,0.60)' }}>{tile.title}</div>
                <div style={{ fontSize:12,color:'rgba(245,245,245,0.35)' }}>{tile.subtitle}</div>
              </a>
            ))}
          </div>
          <p style={{ fontSize:11,color:'rgba(245,245,245,0.25)',marginTop:12 }}>Legacy dashboards remain available through 0.9.x and retire in 1.0.0.</p>
        </div>
      </main>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}*{box-sizing:border-box;margin:0;padding:0}body{background:#0A0A0A}`}</style>
    </div>
  )
}
