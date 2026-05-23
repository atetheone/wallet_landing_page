// Xaalis — shared helpers, icons, primitives
// Loaded before screens.jsx; exposes everything via window.

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Format
// ─────────────────────────────────────────────────────────────
function fmtFCFA(n, { suffix = ' FCFA' } = {}) {
  if (n == null || isNaN(n)) return '— FCFA';
  const v = Math.round(Number(n));
  return v.toLocaleString('fr-FR').replace(/\s/g, ' ').replace(/,/g, ' ') + suffix;
}
function fmtN(n) {
  if (n == null || isNaN(n)) return '0';
  return Math.round(Number(n)).toLocaleString('fr-FR').replace(/,/g, ' ');
}

// ─────────────────────────────────────────────────────────────
// Phone shell — status bar + content + gesture pill.
// Width 360 × Height 740 fits well in a design canvas artboard.
// ─────────────────────────────────────────────────────────────
function PhoneShell({ children, bg = 'var(--x-cream)', statusDark = true, hideStatus = false }) {
  return (
    <div className="xaalis" style={{ background: bg }}>
      {!hideStatus && <StatusBar dark={statusDark} />}
      <div style={{ position: 'absolute', top: hideStatus ? 0 : 30, left: 0, right: 0, bottom: 16, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <NavPill dark={statusDark} />
    </div>
  );
}

function StatusBar({ dark = true }) {
  const c = dark ? 'var(--x-ink)' : '#fff';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 30,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 18px 0', fontSize: 13, fontWeight: 600, color: c,
      fontFamily: 'var(--x-font-mono)',
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* signal */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill={c}>
          <rect x="0" y="7" width="2" height="3" rx="0.5"/>
          <rect x="4" y="4" width="2" height="6" rx="0.5"/>
          <rect x="8" y="1" width="2" height="9" rx="0.5"/>
          <rect x="12" y="3" width="2" height="7" rx="0.5" opacity=".3"/>
        </svg>
        {/* wifi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke={c} strokeWidth="1.4">
          <path d="M1 4a9 9 0 0112 0M3.5 6.2a5.5 5.5 0 017 0"/>
          <circle cx="7" cy="9" r="0.9" fill={c} stroke="none"/>
        </svg>
        {/* battery */}
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke={c} opacity=".5"/>
          <rect x="2" y="2" width="13" height="7" rx="1" fill={c}/>
          <rect x="19.5" y="3.5" width="1.5" height="4" rx="0.6" fill={c} opacity=".5"/>
        </svg>
      </div>
    </div>
  );
}

function NavPill({ dark }) {
  return (
    <div style={{
      position: 'absolute', bottom: 4, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{ width: 120, height: 4, borderRadius: 999, background: dark ? 'var(--x-ink)' : '#fff', opacity: 0.6 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Icon set — simple stroked
// ─────────────────────────────────────────────────────────────
function Icon({ name, size = 22, stroke = 1.6, color = 'currentColor' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home': return <svg {...p}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z"/></svg>;
    case 'history': return <svg {...p}><path d="M3 12a9 9 0 109-9 9 9 0 00-7.5 4M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>;
    case 'goals': return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill={color}/></svg>;
    case 'settings': return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'arrow-right': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-left': return <svg {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case 'check': return <svg {...p}><path d="M5 12l5 5 9-11"/></svg>;
    case 'chevron-right': return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevron-down': return <svg {...p}><path d="M6 9l6 6 6-6"/></svg>;
    case 'lock': return <svg {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>;
    case 'fingerprint': return <svg {...p}><path d="M5 12a7 7 0 0114 0v2"/><path d="M8.5 12a3.5 3.5 0 017 0v3"/><path d="M12 12v5"/><path d="M5 16c.5 2 1.5 3.5 3 5"/><path d="M19 14c0 3-1 5-2 7"/></svg>;
    case 'food': return <svg {...p}><path d="M4 4v6a3 3 0 003 3v7M7 4v5"/><path d="M14 4c-1 0-2 2-2 4s1 4 2 4h.5V21h2V4z"/></svg>;
    case 'transport': return <svg {...p}><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 12h18M7 18v2M17 18v2"/><circle cx="8" cy="14" r="0.6" fill={color}/><circle cx="16" cy="14" r="0.6" fill={color}/></svg>;
    case 'home2': return <svg {...p}><path d="M3 11l9-8 9 8v9a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><path d="M9 21v-7h6v7"/></svg>;
    case 'health': return <svg {...p}><path d="M20.8 11.5c0 5-8.8 9.5-8.8 9.5s-8.8-4.5-8.8-9.5a5 5 0 018.8-3.3 5 5 0 018.8 3.3z"/></svg>;
    case 'leisure': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>;
    case 'family': return <svg {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M14 20c0-2 1.5-3.5 3.5-3.5S21 18 21 20"/></svg>;
    case 'misc': return <svg {...p}><circle cx="12" cy="6" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="18" r="1.6"/></svg>;
    case 'wave': return <svg {...p}><path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/></svg>;
    case 'cash': return <svg {...p}><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/></svg>;
    case 'cloud': return <svg {...p}><path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.4A4 4 0 0117 18z"/></svg>;
    case 'cloud-check': return <svg {...p}><path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.4A4 4 0 0117 18z"/><path d="M9 14l2 2 4-4"/></svg>;
    case 'edit': return <svg {...p}><path d="M16 4l4 4-11 11H5v-4z"/></svg>;
    case 'trash': return <svg {...p}><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/></svg>;
    case 'calendar': return <svg {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>;
    case 'sparkle': return <svg {...p}><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/></svg>;
    case 'export': return <svg {...p}><path d="M12 4v12M7 9l5-5 5 5"/><path d="M5 20h14"/></svg>;
    case 'import': return <svg {...p}><path d="M12 16V4M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>;
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

// ─────────────────────────────────────────────────────────────
// Category meta — name, icon, color
// ─────────────────────────────────────────────────────────────
const CATS = [
  { id: 'nourriture', label: 'Nourriture', icon: 'food', bg: '#F2D8B8', fg: '#7A4E10' },
  { id: 'transport',  label: 'Transport',  icon: 'transport', bg: '#D5DDF0', fg: '#2E3A78' },
  { id: 'logement',   label: 'Logement',   icon: 'home2', bg: '#E0D6C7', fg: '#5C4A2A' },
  { id: 'sante',      label: 'Santé',      icon: 'health', bg: '#F0CFC8', fg: '#9A3A28' },
  { id: 'loisirs',    label: 'Loisirs',    icon: 'leisure', bg: '#E6DFC0', fg: '#6B5A1A' },
  { id: 'famille',    label: 'Famille',    icon: 'family', bg: '#D6E5D0', fg: '#3D5A2E' },
  { id: 'divers',     label: 'Divers',     icon: 'misc', bg: '#DCD6CB', fg: '#56504A' },
];
const CAT_BY_ID = Object.fromEntries(CATS.map(c => [c.id, c]));

// Bottom tab bar (shared)
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: 'home' },
    { id: 'history', label: 'Historique', icon: 'history' },
    { id: 'goals', label: 'Objectifs', icon: 'goals' },
    { id: 'settings', label: 'Réglages', icon: 'settings' },
  ];
  return (
    <div className="x-tabbar">
      {tabs.map(t => (
        <button key={t.id} className={'x-tab' + (active === t.id ? ' active' : '')}
          onClick={() => onChange && onChange(t.id)}>
          <Icon name={t.icon} size={22} stroke={active === t.id ? 1.9 : 1.5} />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// Page header — title row, optional left action, big page title below
function PageHeader({ title, eyebrow, right, left }) {
  return (
    <div style={{ padding: '14px 22px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 32 }}>
        <div>{left}</div>
        <div>{right}</div>
      </div>
      {eyebrow && <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--x-ink-3)', marginTop: 6 }}>{eyebrow}</div>}
      <div className="x-display" style={{ fontSize: 30, fontWeight: 600, marginTop: 4, lineHeight: 1.1 }}>{title}</div>
    </div>
  );
}

Object.assign(window, {
  fmtFCFA, fmtN, PhoneShell, StatusBar, NavPill, Icon,
  CATS, CAT_BY_ID, TabBar, PageHeader,
});
