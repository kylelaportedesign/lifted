import React from 'react';

export function Avatar({ contractor, size = 'md', paid = false, paying = false }) {
  const cls = `avatar ${size === 'sm' ? 'sm' : size === 'md-lg' ? 'md-lg' : size === 'lg' ? 'lg' : size === 'xl' ? 'xl' : ''} ${paid ? 'paid' : ''} ${paying ? 'paying' : ''}`;
  if (!contractor) {
    return <div className={cls} />;
  }
  const tones = {
    maya: '#A39E85', priya: '#A39E85', koen: '#B5B4B0',
    carlos: '#7A7A70', hallie: '#A39E85', tomi: '#B5B4B0',
    amaru: '#7C5A3A', nathaniel: '#4A5547', aoife: '#6B5238',
  };
  const fgs = {
    amaru: '#F5EFE3', nathaniel: '#E8E4DA', aoife: '#F0E6D8',
  };
  const bg = tones[contractor.id] || 'var(--mist)';
  const fg = fgs[contractor.id] || '#0A0A0A';
  return (
    <div className={cls} style={{ background: bg, color: fg }}>
      {contractor.initials}
    </div>
  );
}

export function RenaissancePortrait({ id }) {
  const palettes = {
    amaru: { bg: '#7C5A3A', skin: '#B98666', cloth: '#3F2A1B', hair: '#1E120A' },
    nathaniel: { bg: '#4A5547', skin: '#C9A684', cloth: '#1B1612', hair: '#3B2418' },
    aoife: { bg: '#6B5238', skin: '#D7B393', cloth: '#2F221A', hair: '#8B5A2B' },
  };
  const p = palettes[id] || palettes.amaru;
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="80" height="80" fill={p.bg} />
      <radialGradient id={`v-${id}`} cx="50%" cy="35%" r="65%">
        <stop offset="0" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.45" />
      </radialGradient>
      <rect width="80" height="80" fill={`url(#v-${id})`} />
      <path d="M0 80 C 12 56, 24 50, 40 50 C 56 50, 68 56, 80 80 Z" fill={p.cloth} />
      <rect x="34" y="44" width="12" height="14" rx="3" fill={p.skin} />
      <ellipse cx="40" cy="34" rx="14" ry="17" fill={p.skin} />
      <path d="M26 30 C 26 20, 34 14, 40 14 C 48 14, 54 20, 54 30 C 52 26, 46 22, 40 22 C 34 22, 28 26, 26 30 Z" fill={p.hair} />
      <ellipse cx="40" cy="49" rx="9" ry="2.5" fill="#000" opacity="0.18" />
      <ellipse cx="35.5" cy="35" rx="1.1" ry="0.7" fill="#1a120a" opacity="0.7" />
      <ellipse cx="44.5" cy="35" rx="1.1" ry="0.7" fill="#1a120a" opacity="0.7" />
    </svg>
  );
}

export function Digit({ value, mono = true }) {
  const safe = Math.max(0, Math.min(9, value));
  return (
    <span className="digit-stack" style={{ fontVariantNumeric: mono ? 'tabular-nums' : 'normal' }}>
      <span className="digit" style={{ transform: `translateY(${-safe}em)` }}>
        {[0,1,2,3,4,5,6,7,8,9].map(d => <span key={d}>{d}</span>)}
      </span>
    </span>
  );
}

export function Numerals({ text }) {
  return (
    <>
      {text.split('').map((ch, i) => {
        if (/\d/.test(ch)) return <Digit key={i} value={Number(ch)} />;
        return <span key={i}>{ch}</span>;
      })}
    </>
  );
}

const CONTINENTS = {
  na: "M 8 22 L 14 18 L 20 16 L 24 18 L 26 22 L 24 26 L 28 28 L 30 32 L 28 36 L 24 38 L 22 36 L 18 36 L 14 32 L 12 28 L 10 26 Z M 22 40 L 26 42 L 24 46 L 22 44 Z",
  ca: "M 24 40 L 28 42 L 30 46 L 28 48 L 26 46 Z",
  sa: "M 30 50 L 34 48 L 36 52 L 38 58 L 36 64 L 32 68 L 28 64 L 28 58 Z",
  gr: "M 36 14 L 40 12 L 42 16 L 40 20 L 36 18 Z",
  eu: "M 46 22 L 52 20 L 56 22 L 58 26 L 56 30 L 50 30 L 46 28 Z",
  af: "M 48 36 L 54 34 L 58 36 L 60 42 L 58 50 L 54 56 L 50 58 L 48 54 L 46 46 L 46 40 Z",
  me: "M 58 32 L 64 30 L 66 34 L 64 38 L 60 38 Z",
  as: "M 56 18 L 64 16 L 72 18 L 80 20 L 86 24 L 88 30 L 84 34 L 78 34 L 74 32 L 68 32 L 64 30 L 60 28 L 58 26 Z",
  in: "M 66 36 L 72 36 L 74 42 L 72 46 L 68 46 L 66 42 Z",
  se: "M 78 44 L 84 44 L 86 48 L 82 50 L 78 48 Z",
  au: "M 80 56 L 88 56 L 92 60 L 90 64 L 84 66 L 80 64 L 78 60 Z",
};
export const WORLD_PATH = Object.values(CONTINENTS).join(' ');

export function MapCard({ pinX, pinY, contractor, height = 110, pins = null }) {
  return (
    <div className="minimap" style={{ height }}>
      <svg viewBox="0 0 100 80" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D3CFBE" />
            <stop offset="1" stopColor="#C2BEAC" />
          </linearGradient>
        </defs>
        <rect width="100" height="80" fill="url(#ocean)" />
        <g stroke="#B5B4B0" strokeWidth="0.18" opacity="0.45">
          <line x1="0" y1="20" x2="100" y2="20" />
          <line x1="0" y1="40" x2="100" y2="40" />
          <line x1="0" y1="60" x2="100" y2="60" />
          <line x1="20" y1="0" x2="20" y2="80" />
          <line x1="40" y1="0" x2="40" y2="80" />
          <line x1="60" y1="0" x2="60" y2="80" />
          <line x1="80" y1="0" x2="80" y2="80" />
        </g>
        <path d={WORLD_PATH} fill="#0A0A0A" opacity="0.08" transform="translate(0,0.5)" />
        <path d={WORLD_PATH} fill="#9A9580" />
        <path d={WORLD_PATH} fill="none" stroke="#7A7A70" strokeWidth="0.18" />
      </svg>
      {pins && pins.map((p, i) => (
        <div key={i} className="map-pin" style={{
          left: `${p.x}%`, top: `${p.y}%`, background: p.color || 'var(--ink)',
          width: p.size || 18, height: p.size || 18,
        }}>
          {p.contractor && (
            <div style={{ position:'absolute', inset: 2, borderRadius: '50%', overflow:'hidden' }}>
              <Avatar contractor={p.contractor} size="sm" />
            </div>
          )}
        </div>
      ))}
      {!pins && contractor && (
        <div className="map-pin" style={{ left: `${pinX}%`, top: `${pinY}%`, background: 'var(--ink)' }}>
          <div style={{ position:'absolute', inset: 2, borderRadius: '50%', overflow:'hidden' }}>
            <Avatar contractor={contractor} size="sm" />
          </div>
        </div>
      )}
    </div>
  );
}

export function AvatarDial({ contractors, paidIds = [], payingId = null, size = 'md', label = null }) {
  const n = contractors.length;
  const radius = 110;
  const cx = 50;
  const positions = contractors.map((c, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const angle = Math.PI * (1 - t);
    const x = cx + (radius / 2.4) * Math.cos(angle);
    const y = 96 - (radius / 2.6) * Math.sin(angle);
    return { x, y, c };
  });
  return (
    <div className="dial">
      <svg viewBox="0 0 100 50" width="100%" height="100%" preserveAspectRatio="none" style={{position:'absolute', inset:0}}>
        <path d={`M 8 48 A 42 42 0 0 1 92 48`} fill="none" stroke="rgba(10,10,10,0.12)" strokeWidth="0.4" strokeDasharray="0.8 1.6" />
      </svg>
      {positions.map(({ x, y, c }, i) => (
        <div key={c.id} style={{
          position: 'absolute', left: `${x}%`, top: `${y}%`,
          transform: 'translate(-50%,-50%)',
          transitionDelay: `${i * 40}ms`,
        }}>
          <Avatar contractor={c} size={size} paid={paidIds.includes(c.id)} paying={payingId === c.id} />
        </div>
      ))}
      {label && (
        <div style={{
          position:'absolute', left:'50%', top:'62%', transform:'translate(-50%,-50%)',
          textAlign:'center', pointerEvents:'none',
        }}>
          {label}
        </div>
      )}
    </div>
  );
}

export function Countdown({ seconds, color = 'var(--ink)', size = 64 }) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const text = h > 0
    ? `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return (
    <div className="display tabular" style={{ fontSize: size, color, lineHeight: 0.9 }}>
      <Numerals text={text} />
    </div>
  );
}

export function useCountdown(start, running = true) {
  const [t, setT] = React.useState(start);
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);
  return t;
}

export function SectionLabel({ children, count }) {
  return (
    <div className="row between" style={{ padding: '24px 4px 10px', alignItems: 'center' }}>
      <span className="label-muted">{children}</span>
      {count != null && (
        <span className="tabular" style={{
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          minWidth: 26, height: 22, padding: '0 8px',
          borderRadius: 11,
          background: 'var(--ink)', color: 'var(--bone)',
          fontFamily:'var(--body)', fontSize: 11, fontWeight: 700, letterSpacing: 0,
        }}>{count}</span>
      )}
    </div>
  );
}

export function TimeTabs({ value, onChange, items }) {
  return (
    <div className="timetabs">
      {items.map(it => (
        <button key={it.key} className={'timetab' + (value === it.key ? ' active' : '')}
                onClick={() => onChange(it.key)}>
          <span>{it.label}</span>
          {it.count != null && (
            <span className="ct tabular" style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              minWidth: 22, height: 18, padding: '0 6px',
              borderRadius: 9,
              background: value === it.key ? 'var(--ink)' : 'var(--mist)',
              color: value === it.key ? 'var(--bone)' : 'var(--shadow-c)',
              fontSize: 11, fontWeight: 700, letterSpacing: 0,
              marginLeft: 6,
            }}>{it.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function StatusChip({ tone = 'success', children }) {
  const palette = {
    success: { bg: '#D7F0E2', fg: '#0E5A37' },
    warning: { bg: '#FFE4C2', fg: '#7A4A12' },
    error:   { bg: '#FBD9D9', fg: '#7A1A1A' },
    info:    { bg: '#DCE3FB', fg: '#1F3380' },
    ink:     { bg: '#0A0A0A', fg: '#F2F0E8' },
  };
  const p = palette[tone] || palette.success;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 9px', borderRadius: 999,
      background: p.bg, color: p.fg,
      fontFamily: 'var(--body)', fontWeight: 600, fontSize: 10,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: 'currentColor', opacity: 0.85,
      }} />
      {children}
    </span>
  );
}

export function IconButton({ children, onClick, dark = false, size = 36 }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: size/2,
      border: 0, background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(10,10,10,0.05)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: dark ? 'var(--bone)' : 'var(--ink)',
    }}>{children}</button>
  );
}

export function LiftedStatusBar({ tone = 'ink' }) {
  return (
    <div style={{
      height: 54, flexShrink: 0,
      position: 'sticky', top: 0, zIndex: 20,
      background: 'var(--bone)',
      marginLeft: -20, marginRight: -20,
      paddingLeft: 20, paddingRight: 20,
    }} />
  );
}
