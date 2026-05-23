// Xaalis — the 7 screens
// Each screen is a self-contained component; they share state via app.jsx
// when composed, but each screen also works in isolation for the canvas.

const { useState: _us, useEffect: _ue, useRef: _ur, useMemo: _um } = React;

// Shared sample dataset — keeps the screens coherent.
const SAMPLE = {
  revenuMensuel: 350000,
  jourPaie: 1,
  epargneMensuelle: 50000,
  charges: [
    { id: 'c1', label: 'Loyer',         montant: 75000, jour: 5 },
    { id: 'c2', label: 'Électricité',   montant: 18000, jour: 15 },
    { id: 'c3', label: 'Internet',      montant: 20000, jour: 10 },
    { id: 'c4', label: 'Carte transport', montant: 25000, jour: 1 },
  ],
  goals: [
    { id: 'g1', nom: 'Voyage Saint-Louis', cible: 150000, deja: 90000,  echeance: '31 août 2026',     emoji: '🌊' },
    { id: 'g2', nom: 'Ordinateur portable', cible: 500000, deja: 120000, echeance: '31 déc. 2026',    emoji: '💻' },
    { id: 'g3', nom: 'Tabaski 2027',       cible: 250000, deja: 30000,  echeance: '15 juin 2027',     emoji: '🐏' },
  ],
  depenses: [
    { id: 'd1',  date: '17 mai', day: 17, cat: 'nourriture', label: 'Marché Sandaga',    montant: 12500, methode: 'cash' },
    { id: 'd2',  date: '17 mai', day: 17, cat: 'transport',  label: 'Yango — bureau',     montant: 2500,  methode: 'wave' },
    { id: 'd3',  date: '16 mai', day: 16, cat: 'sante',      label: 'Pharmacie Médina',   montant: 6800,  methode: 'wave' },
    { id: 'd4',  date: '15 mai', day: 15, cat: 'loisirs',    label: 'Café Pikine',        montant: 1500,  methode: 'cash' },
    { id: 'd5',  date: '14 mai', day: 14, cat: 'transport',  label: 'Carburant',          montant: 8000,  methode: 'cash' },
    { id: 'd6',  date: '14 mai', day: 14, cat: 'divers',     label: 'Crédit Orange',      montant: 3000,  methode: 'wave' },
    { id: 'd7',  date: '13 mai', day: 13, cat: 'nourriture', label: 'Boulangerie',        montant: 1200,  methode: 'cash' },
    { id: 'd8',  date: '12 mai', day: 12, cat: 'famille',    label: 'Anniversaire cousin', montant: 10000, methode: 'wave' },
    { id: 'd9',  date: '11 mai', day: 11, cat: 'nourriture', label: 'Restaurant Chez Loutcha', montant: 9500, methode: 'wave' },
    { id: 'd10', date: '10 mai', day: 10, cat: 'divers',     label: 'Tissu wax',          montant: 7500,  methode: 'cash' },
    { id: 'd11', date: '8 mai',  day:  8, cat: 'loisirs',    label: 'Cinéma',             montant: 4000,  methode: 'wave' },
    { id: 'd12', date: '6 mai',  day:  6, cat: 'transport',  label: 'Taxi',               montant: 2500,  methode: 'cash' },
  ],
};

// computed running totals
const totalDepenses = SAMPLE.depenses.reduce((s, d) => s + d.montant, 0); // 68000
const totalCharges = SAMPLE.charges.reduce((s, c) => s + c.montant, 0);   // 138000
const disponibleMensuel = SAMPLE.revenuMensuel - SAMPLE.epargneMensuelle - totalCharges; // 162000
const resteAdepenser = disponibleMensuel - totalDepenses; // 94000
const joursRestants = 14;
const allocJour = Math.round(resteAdepenser / joursRestants); // ~6 714

// ════════════════════════════════════════════════════════════
// 1 · VERROUILLAGE — PIN entry
// ════════════════════════════════════════════════════════════
function ScreenVerrouillage() {
  const [pin, setPin] = _us('');
  const [shake, setShake] = _us(false);
  const push = (d) => { if (pin.length < 4) setPin(pin + d); };
  const back = () => setPin(pin.slice(0, -1));

  _ue(() => {
    if (pin.length === 4) {
      // demo: PIN "1209" passes (anniv), anything else shakes briefly
      const t = setTimeout(() => {
        if (pin === '1209') {/* success — would navigate */}
        else { setShake(true); setTimeout(() => { setShake(false); setPin(''); }, 500); }
      }, 220);
      return () => clearTimeout(t);
    }
  }, [pin]);

  const Key = ({ d, onClick, sub }) => (
    <button onClick={onClick} style={{
      width: 72, height: 72, borderRadius: 36,
      background: 'transparent',
      border: '1.5px solid var(--x-line-2)',
      fontSize: 28, fontWeight: 500, color: 'var(--x-ink)',
      fontFamily: 'var(--x-font-display)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', lineHeight: 1,
    }}>
      {d}
      {sub && <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.12em', marginTop: 4, color: 'var(--x-ink-3)' }}>{sub}</span>}
    </button>
  );

  return (
    <PhoneShell bg="var(--x-cream)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 24px 20px' }}>
        {/* wordmark */}
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <div className="x-display" style={{ fontSize: 38, fontWeight: 600, letterSpacing: '-0.04em' }}>
            Xaalis
          </div>
          <div style={{ fontSize: 12, color: 'var(--x-ink-3)', fontWeight: 500, marginTop: 4, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            xa·a·lis · « argent »
          </div>
        </div>

        {/* prompt */}
        <div style={{ textAlign: 'center', marginTop: 36, color: 'var(--x-ink-2)', fontSize: 15 }}>
          Entrez votre code à 4 chiffres
        </div>

        {/* dots */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 18, marginTop: 22,
          transform: shake ? 'translateX(0)' : 'none',
          animation: shake ? 'xshake 0.4s' : 'none',
        }}>
          {[0,1,2,3].map(i => (
            <div key={i} className={'x-pin-dot' + (pin.length > i ? ' filled' : '')} />
          ))}
        </div>
        <style>{`@keyframes xshake { 10%,90%{transform:translateX(-2px)} 20%,80%{transform:translateX(4px)} 30%,50%,70%{transform:translateX(-6px)} 40%,60%{transform:translateX(6px)} }`}</style>

        <div style={{ flex: 1 }} />

        {/* numpad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, justifyItems: 'center', padding: '0 8px' }}>
          {[1,2,3,4,5,6,7,8,9].map(d => (
            <Key key={d} d={d}
              sub={d===2?'ABC':d===3?'DEF':d===4?'GHI':d===5?'JKL':d===6?'MNO':d===7?'PQRS':d===8?'TUV':d===9?'WXYZ':null}
              onClick={() => push(String(d))} />
          ))}
          <button onClick={() => {}} style={{
            width: 72, height: 72, borderRadius: 36, border: 'none', background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--x-ink-2)',
          }}>
            <Icon name="fingerprint" size={28} stroke={1.5} />
          </button>
          <Key d={0} onClick={() => push('0')} />
          <button onClick={back} style={{
            width: 72, height: 72, borderRadius: 36, border: 'none', background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--x-ink-2)',
          }}>
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 1L1 10l7 9h16a1 1 0 001-1V2a1 1 0 00-1-1z"/><path d="M13 7l6 6M19 7l-6 6"/>
            </svg>
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--x-ink-3)' }}>
          Code oublié ?
        </div>
      </div>
    </PhoneShell>
  );
}

// ════════════════════════════════════════════════════════════
// 2 · CONFIGURATION — onboarding wizard
// ════════════════════════════════════════════════════════════
function ScreenConfiguration() {
  // shows step 3/5 (charges fixes) — most visually rich
  const totalSteps = 5;
  const step = 3;

  const [charges, setCharges] = _us(SAMPLE.charges);

  return (
    <PhoneShell bg="var(--x-cream)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 0 0' }}>
        {/* top — back + step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 22px' }}>
          <button style={{ background: 'transparent', border: 'none', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--x-ink)' }}>
            <Icon name="arrow-left" size={22} />
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{
                width: i < step ? 28 : 18, height: 6, borderRadius: 3,
                background: i < step ? 'var(--x-ink)' : 'var(--x-line-2)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
          <button style={{ background: 'transparent', border: 'none', fontSize: 13, color: 'var(--x-ink-3)', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--x-font-body)' }}>
            Passer
          </button>
        </div>

        {/* hero + form */}
        <div className="x-scroll" style={{ flex: 1, padding: '14px 22px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--x-ink-3)' }}>
            Étape 3 sur 5
          </div>
          <div className="x-display" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.05, marginTop: 8 }}>
            Vos charges<br />fixes mensuelles
          </div>
          <div style={{ fontSize: 14, color: 'var(--x-ink-2)', marginTop: 10, lineHeight: 1.45 }}>
            Loyer, abonnements, transport… Ce qui part chaque mois sans y penser.
          </div>

          {/* list */}
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {charges.map((c) => (
              <div key={c.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--x-paper)', borderRadius: 16, padding: '14px 16px',
                border: '1px solid var(--x-line)',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'var(--x-cream-2)', color: 'var(--x-ink-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, fontFamily: 'var(--x-font-mono)',
                }}>{c.jour}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--x-ink)' }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--x-ink-3)' }}>Le {c.jour} de chaque mois</div>
                </div>
                <div className="x-num" style={{ fontSize: 14, fontWeight: 600 }}>
                  {fmtFCFA(c.montant, { suffix: '' })}
                </div>
              </div>
            ))}

            {/* add */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 16px', borderRadius: 16,
              border: '1.5px dashed var(--x-line-2)',
              background: 'transparent', color: 'var(--x-ink-2)',
              fontFamily: 'var(--x-font-body)', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', justifyContent: 'center',
            }}>
              <Icon name="plus" size={18} /> Ajouter une charge
            </button>
          </div>

          {/* recap */}
          <div style={{
            marginTop: 22, padding: '14px 16px',
            background: 'rgba(232,155,58,0.14)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 13, color: 'var(--x-ink-2)' }}>Total mensuel</div>
            <div className="x-num" style={{ fontSize: 17, fontWeight: 700, color: 'var(--x-ink)' }}>
              {fmtFCFA(totalCharges)}
            </div>
          </div>
          <div style={{ height: 12 }} />
        </div>

        {/* sticky CTA */}
        <div style={{ padding: '12px 22px 6px', background: 'var(--x-cream)', borderTop: '1px solid var(--x-line)' }}>
          <button className="x-btn" style={{ width: '100%' }}>
            Suivant <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}

Object.assign(window, { SAMPLE, totalDepenses, totalCharges, disponibleMensuel, resteAdepenser, joursRestants, allocJour, ScreenVerrouillage, ScreenConfiguration });
