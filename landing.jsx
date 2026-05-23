// Xaalis landing — editorial sections + interactive mini demo

const { useState: _ls, useEffect: _le, useRef: _lr } = React;

// ────────────────────────────────────────────────────────────
// NAV
// ────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="lp-nav">
      <div className="lp-wrap lp-nav-inner">
        <a href="#top" className="lp-logo">
          <span className="lp-logo-mark">X</span>
          <span>Xaalis</span>
        </a>
        <div className="lp-nav-links">
          <a href="#fonctionnalites">Fonctionnalités</a>
          <a href="#comment-ca-marche">Comment ça marche</a>
          <a href="#region">Pour le franc CFA</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="https://my-wallet-nine-ecru.vercel.app/" className="lp-btn" target="_blank" rel="noopener noreferrer">
          <Icon name="plus" size={16} stroke={2.2} />
          Installer
        </a>
      </div>
    </nav>
  );
}

// ────────────────────────────────────────────────────────────
// HERO
// ────────────────────────────────────────────────────────────
function Hero() {
  // animate the floating chip number subtly
  const [tick, setTick] = _ls(94000);
  _le(() => {
    const id = setInterval(() => setTick(t => {
      // bounce ±500 around 94 000 so it feels alive
      const next = 94000 + Math.round(Math.sin(Date.now() / 1400) * 350);
      return next;
    }), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="lp-hero lp-noise" id="top">
      <div className="lp-wrap lp-hero-grid">
        <div>
          <div className="lp-eyebrow">PWA · Sénégal · XOF / FCFA</div>
          <h1>
            Argent.<br />
            Sans <em>bruit</em>.
          </h1>
          <p className="lp-hero-sub">
            Xaalis est une application web d'épargne et de dépense personnelle, conçue pour le franc CFA — et pour le pouce. Trois secondes d'attention au marché suffisent.
          </p>
          <div className="lp-hero-cta">
            <a href="https://my-wallet-nine-ecru.vercel.app/" className="lp-btn lp-btn-lg" target="_blank" rel="noopener noreferrer">
              <Icon name="plus" size={18} stroke={2.2} />
              Installer Xaalis
            </a>
            <a href="https://my-wallet-nine-ecru.vercel.app/" className="lp-btn lp-btn-ghost lp-btn-lg" target="_blank" rel="noopener noreferrer">
              Essayer en direct
              <Icon name="arrow-right" size={16} stroke={2} />
            </a>
          </div>
          <div className="lp-hero-meta">
            <span className="pulse"><span className="dot" /> Hors-ligne d'abord</span>
            <span>·</span>
            <span>En français</span>
            <span>·</span>
            <span>Sans publicité</span>
            <span>·</span>
            <span>Open-source</span>
          </div>
        </div>

        <div className="lp-hero-phone">
          <div className="lp-hero-arcs" aria-hidden="true">
            <svg viewBox="0 0 600 600">
              <circle cx="300" cy="300" r="260" strokeWidth="1.3" />
              <circle cx="300" cy="300" r="200" strokeWidth="1.3" />
              <circle cx="300" cy="300" r="140" strokeWidth="1.3" />
              <circle cx="300" cy="300" r="80"  strokeWidth="1.3" />
            </svg>
          </div>

          {/* floating chips */}
          <div className="lp-hero-chip c1">
            <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--x-sage)' }} />
            Reste · <span className="x-num" style={{ color: 'var(--x-ink)' }}>{fmtN(tick)}</span> FCFA
          </div>
          <div className="lp-hero-chip c2">
            <span style={{ width: 26, height: 26, borderRadius: 8, background: '#F2D8B8', color: '#7A4E10', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="food" size={14} stroke={1.8} />
            </span>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontSize: 11, color: 'var(--x-ink-3)', fontWeight: 500 }}>Marché Sandaga</div>
              <div className="x-num" style={{ fontSize: 13 }}>−12 500 FCFA</div>
            </div>
          </div>
          <div className="lp-hero-chip c3">
            <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--x-saffron)' }} />
            Objectif Saint-Louis · 60%
          </div>

          <div className="lp-phone">
            <div className="lp-phone-frame">
              <ScreenAccueil />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// MANIFESTO MARQUEE
// ────────────────────────────────────────────────────────────
function Manifesto() {
  const lines = [
    'Un seul chiffre héro par écran',
    "Saisir une dépense en moins de 5 secondes",
    "Hors-ligne d'abord, synchronisation silencieuse",
    "Le pouce, pas la souris",
    'FCFA en entiers, séparateur espace',
    "Sans publicité. Sans tracking. Sans bruit.",
  ];
  // duplicate for seamless loop
  const all = [...lines, ...lines];
  return (
    <div className="lp-manifesto" aria-hidden="true">
      <div className="lp-manifesto-track">
        {all.map((l, i) => (
          <span key={i}><i />{l}</span>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// FEATURES — 3-pack
// ────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="lp-section" id="fonctionnalites">
      <div className="lp-wrap">
        <div className="lp-section-head">
          <div className="lp-eyebrow">Trois gestes, trois écrans</div>
          <h2>Conçue autour de ce qu'on fait <em>vraiment</em>.</h2>
          <p className="lp-section-sub">
            Pas de menus profonds, pas de jargon comptable. Xaalis tient sur trois écrans qu'on apprend en une minute, et qu'on utilise sans y penser.
          </p>
        </div>

        <div className="lp-features">
          {/* 1 — Quick-add */}
          <div className="lp-feat-card">
            <div className="lp-feat-num">01 — Saisie</div>
            <h3>Une dépense, en trois secondes.</h3>
            <p>Pavé numérique géant, catégorie d'un tap, Espèces ou Wave, validé. Le « restera » se met à jour pendant que vous tapez — vous savez avant de payer.</p>
            <div className="lp-feat-visual">
              <div className="lp-fv-keys">
                {['1','2','3','4','5','6','7','8','9'].map(d => <div key={d} className="key">{d}</div>)}
                <div className="key">000</div>
                <div className="key">0</div>
                <div className="key hot">
                  <Icon name="check" size={20} stroke={2.4} />
                </div>
              </div>
            </div>
          </div>

          {/* 2 — Objectifs */}
          <div className="lp-feat-card">
            <div className="lp-feat-num">02 — Épargne</div>
            <h3>Des objectifs qui se rappellent à vous.</h3>
            <p>Tabaski, voyage, ordinateur. Xaalis calcule le rythme mensuel exact pour tenir l'échéance, et vous dit en un coup d'œil si vous êtes dans le vert.</p>
            <div className="lp-feat-visual" style={{ padding: 22, background: 'var(--x-cream)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
              <GoalRow nom="Saint-Louis 🌊" deja={90000} cible={150000} state="ok" />
              <GoalRow nom="Ordinateur 💻" deja={120000} cible={500000} state="ok" />
              <GoalRow nom="Tabaski 🐏" deja={30000} cible={250000} state="behind" />
            </div>
          </div>

          {/* 3 — Offline-first */}
          <div className="lp-feat-card">
            <div className="lp-feat-num">03 — Hors-ligne</div>
            <h3>Marche au marché, sans réseau.</h3>
            <p>Tout est stocké sur votre téléphone d'abord. La synchronisation se fait quand vous voulez, où vous voulez. Vos données restent les vôtres — exportables en JSON, partout.</p>
            <div className="lp-feat-visual lp-fv-cloud">
              <div className="badge">
                <span className="ic">
                  <Icon name="check" size={16} stroke={2.4} />
                </span>
                Synchronisé · à l'instant
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GoalRow({ nom, deja, cible, state }) {
  const pct = Math.round(deja / cible * 100);
  const barColor = state === 'behind' ? 'var(--x-clay)' : 'var(--x-saffron)';
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{nom}</div>
        <div className="x-num" style={{ fontSize: 12, color: 'var(--x-ink-3)' }}>{fmtN(deja)} / {fmtN(cible)}</div>
      </div>
      <div className="x-bar" style={{ background: 'rgba(26,22,17,0.06)', height: 6 }}>
        <i style={{ background: barColor, width: pct + '%' }} />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// HOW IT WORKS
// ────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section className="lp-section" id="comment-ca-marche" style={{ background: 'var(--x-paper)' }}>
      <div className="lp-wrap">
        <div className="lp-section-head">
          <div className="lp-eyebrow">Comment ça marche</div>
          <h2>Trois étapes. <em>Aucune carte bancaire.</em></h2>
        </div>
        <div className="lp-how">
          <div className="lp-how-step">
            <div className="n">1.</div>
            <h4>Installez en un tap.</h4>
            <p>Ajoutez Xaalis à l'écran d'accueil depuis le navigateur. Pas de magasin d'applications, pas de poids — moins de 1 Mo à télécharger.</p>
          </div>
          <div className="lp-how-step">
            <div className="n">2.</div>
            <h4>Réglez une fois.</h4>
            <p>Revenu mensuel, jour de paie, charges fixes, épargne engagée. Cinq étapes guidées. Vous n'y revenez plus.</p>
          </div>
          <div className="lp-how-step">
            <div className="n">3.</div>
            <h4>Vivez votre mois.</h4>
            <p>Xaalis calcule en permanence ce qui vous reste — par mois, par jour — pour que vous ne dépensiez jamais en aveugle.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// INTERACTIVE DEMO — mini quick-add embedded
// ────────────────────────────────────────────────────────────
function InteractiveDemo() {
  const [amount, setAmount] = _ls('0');
  const [cat, setCat] = _ls('nourriture');
  const [method, setMethod] = _ls('cash');
  const [restant, setRestant] = _ls(94000);

  const push = (d) => {
    setAmount(prev => {
      if (prev === '0') return d;
      if (prev.length >= 7) return prev;
      return prev + d;
    });
  };
  const del = () => setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  const valide = () => {
    const v = Number(amount);
    if (!v) return;
    setRestant(r => Math.max(0, r - v));
    setAmount('0');
  };

  const amt = Number(amount);
  const willRest = Math.max(0, restant - amt);

  return (
    <section className="lp-section lp-demo" id="demo">
      <div className="lp-wrap lp-demo-grid">
        <div>
          <div className="lp-eyebrow">Essayez maintenant</div>
          <h2>L'écran qu'on ouvre <em>cinq fois par jour</em>.</h2>
          <p className="lp-section-sub">
            Une vraie démo, pas une capture. Tapez un montant, choisissez une catégorie, validez. Le « restera » se met à jour en direct, comme dans l'app.
          </p>
          <ul className="lp-demo-bullets">
            <li>
              <span className="num">01</span>
              <span><strong>Tapez le montant</strong> sur le pavé. Le bouton <em>000</em> ajoute trois zéros — utile pour les milliers.</span>
            </li>
            <li>
              <span className="num">02</span>
              <span><strong>Choisissez une catégorie</strong> et un mode de paiement : Espèces ou Wave.</span>
            </li>
            <li>
              <span className="num">03</span>
              <span><strong>Validez.</strong> Le reste à dépenser baisse instantanément. Aucune saisie de date, aucun champ obligatoire.</span>
            </li>
          </ul>
          <div className="lp-demo-hint">
            <span className="blink" />
            Cliquez sur les touches du téléphone à droite
          </div>
        </div>

        <div className="lp-demo-phone-wrap">
          <div className="lp-phone">
            <div className="lp-phone-frame">
              <MiniAjouter
                amount={amount}
                cat={cat}
                method={method}
                onCat={setCat}
                onMethod={setMethod}
                onPush={push}
                onDel={del}
                onValide={valide}
                restant={restant}
                willRest={willRest}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniAjouter({ amount, cat, method, onCat, onMethod, onPush, onDel, onValide, restant, willRest }) {
  const Key = ({ d, onClick, children }) => (
    <button onClick={onClick} style={{
      height: 52, background: 'transparent', border: 'none',
      fontFamily: 'var(--x-font-display)', fontSize: 24, fontWeight: 500,
      color: 'var(--x-ink)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 12,
    }}>{children ?? d}</button>
  );

  return (
    <PhoneShell bg="var(--x-cream)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 4px' }}>
          <button style={{ background: 'transparent', border: 'none', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--x-ink)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
          <div className="x-display" style={{ fontSize: 16, fontWeight: 600 }}>Nouvelle dépense</div>
          <div style={{ width: 36 }} />
        </div>

        <div style={{ textAlign: 'center', padding: '18px 12px 6px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--x-ink-3)', fontWeight: 600 }}>
            Montant
          </div>
          <div className="x-num" style={{ marginTop: 8, fontSize: 56, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em' }}>
            {fmtN(Number(amount))}
            <span style={{ fontSize: 20, color: 'var(--x-ink-3)', marginLeft: 8, fontWeight: 500 }}>FCFA</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--x-ink-3)' }}>
            Restera <span className="x-num" style={{ color: 'var(--x-ink-2)', fontWeight: 600 }}>{fmtN(willRest)}</span> FCFA ce mois
          </div>
        </div>

        <div style={{ padding: '10px 14px 0' }}>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }} className="x-scroll">
            {CATS.map(c => {
              const sel = c.id === cat;
              return (
                <button key={c.id} onClick={() => onCat(c.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 12px 8px 8px', borderRadius: 999,
                  background: sel ? c.fg : c.bg,
                  color: sel ? '#fff' : c.fg,
                  border: 'none', whiteSpace: 'nowrap',
                  fontFamily: 'var(--x-font-body)', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', flexShrink: 0,
                  transition: 'all 0.15s',
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: sel ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: sel ? '#fff' : c.fg,
                  }}>
                    <Icon name={c.icon} size={12} stroke={1.8} />
                  </span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '10px 18px 0' }}>
          <div style={{
            display: 'flex', background: 'var(--x-paper)',
            border: '1px solid var(--x-line)', borderRadius: 12, padding: 3,
          }}>
            {[
              { id: 'cash', label: 'Espèces', icon: 'cash' },
              { id: 'wave', label: 'Wave',    icon: 'wave' },
            ].map(m => {
              const sel = m.id === method;
              return (
                <button key={m.id} onClick={() => onMethod(m.id)} style={{
                  flex: 1, padding: '8px 10px',
                  background: sel ? 'var(--x-ink)' : 'transparent',
                  color: sel ? 'var(--x-paper)' : 'var(--x-ink-2)',
                  border: 'none', borderRadius: 9,
                  fontFamily: 'var(--x-font-body)', fontSize: 13, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <Icon name={m.icon} size={14} stroke={1.8} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 'auto', padding: '8px 14px 8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {['1','2','3','4','5','6','7','8','9'].map(d => (
              <Key key={d} d={d} onClick={() => onPush(d)} />
            ))}
            <Key onClick={() => onPush('000')}>000</Key>
            <Key onClick={() => onPush('0')}>0</Key>
            <Key onClick={onDel}>
              <svg width="22" height="16" viewBox="0 0 26 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 1L1 10l7 9h16a1 1 0 001-1V2a1 1 0 00-1-1z"/><path d="M13 7l6 6M19 7l-6 6"/>
              </svg>
            </Key>
          </div>
          <button onClick={onValide} className="x-btn" style={{ width: '100%', marginTop: 2, padding: '14px' }}>
            <Icon name="check" size={18} stroke={2.2} /> Valider la dépense
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}

// ────────────────────────────────────────────────────────────
// REGION / FCFA
// ────────────────────────────────────────────────────────────
function Region() {
  return (
    <section className="lp-section" id="region">
      <div className="lp-wrap">
        <div className="lp-section-head left">
          <div className="lp-eyebrow">Pour le franc CFA · pas une traduction</div>
          <h2>Pensée à Dakar, <em>pour Dakar.</em></h2>
        </div>

        <div className="lp-region-grid">
          <div>
            <p className="lp-region-quote">
              On a arrêté de plier nos finances dans des apps américaines avec des cents, des cartes de crédit et des graphiques qu'on ne regarde jamais. Xaalis parle FCFA, Wave et marché.
            </p>
            <p className="lp-body" style={{ marginTop: 28, maxWidth: 520 }}>
              Les montants sont en entiers — 12 500 FCFA, pas 12 500,00 — avec un séparateur d'espace. Les méthodes de paiement reflètent l'usage local : Espèces et <strong>Wave</strong>. Les catégories couvrent ce qu'on dépense vraiment, du marché Sandaga à la Tabaski.
            </p>
          </div>

          <div className="lp-region-cards">
            <div className="lp-region-card">
              <span className="label">Devise</span>
              <span className="val">XOF</span>
              <span className="desc">Franc CFA en entiers · séparateur espace · zéro décimale.</span>
            </div>
            <div className="lp-region-card wave">
              <span className="label">Méthode</span>
              <span className="val">Wave</span>
              <span className="desc">Espèces ou Wave en un tap — pas de carte bancaire à scanner.</span>
            </div>
            <div className="lp-region-card dark">
              <span className="label" style={{ color: 'var(--x-saffron)' }}>Catégories</span>
              <span className="val" style={{ color: 'var(--x-paper)' }}>7</span>
              <span className="desc">Nourriture, Transport, Logement, Santé, Loisirs, Famille, Divers.</span>
            </div>
            <div className="lp-region-card">
              <span className="label">Langue</span>
              <span className="val"><em>FR</em></span>
              <span className="desc">Interface en français, ton local, libellés courts pour les petits écrans.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// PRIVACY / OFFLINE
// ────────────────────────────────────────────────────────────
function Privacy() {
  return (
    <section className="lp-section lp-privacy" id="privacy">
      <div className="lp-wrap">
        <div className="lp-privacy-grid">
          <div>
            <div className="lp-eyebrow">Vos données restent vos données</div>
            <h2 style={{ marginTop: 14 }}>Hors-ligne d'abord. <em>Vous, ensuite.</em></h2>
            <p className="lp-section-sub" style={{ maxWidth: 520 }}>
              Xaalis n'a pas besoin de savoir ce que vous mangez. Toutes les dépenses sont stockées localement, chiffrées sur l'appareil. La synchronisation cloud est facultative — et toujours sous votre contrôle.
            </p>

            <div className="lp-priv-list">
              <div className="lp-priv-item">
                <div className="ic"><Icon name="shield" size={20} stroke={1.8} /></div>
                <div className="h">Code PIN à 4 chiffres</div>
                <div className="d">L'app se verrouille à chaque ouverture. Empreinte digitale au choix.</div>
              </div>
              <div className="lp-priv-item">
                <div className="ic"><Icon name="cloud-check" size={20} stroke={1.8} /></div>
                <div className="h">Synchro silencieuse</div>
                <div className="d">Magic-link par e-mail. Pas de mot de passe à retenir. Pas de Google ni Facebook.</div>
              </div>
              <div className="lp-priv-item">
                <div className="ic"><Icon name="export" size={20} stroke={1.8} /></div>
                <div className="h">Export JSON, à tout moment</div>
                <div className="d">Vos données partent avec vous. Lisibles par un humain, restaurables d'un tap.</div>
              </div>
              <div className="lp-priv-item">
                <div className="ic"><Icon name="sparkle" size={20} stroke={1.8} /></div>
                <div className="h">Zéro tracker</div>
                <div className="d">Pas de pub, pas de pixel, pas de SDK tiers. Que du code Xaalis.</div>
              </div>
            </div>
          </div>

          <div className="lp-priv-visual">
            <div className="header">
              <span className="dot" />
              Export · xaalis-mai-2026.json
            </div>
            <pre className="lp-priv-mono">{`{
  `}<span className="c">// Données stockées localement</span>{`
  `}<span className="k">"version"</span>{`: `}<span className="n">1</span>{`,
  `}<span className="k">"devise"</span>{`: `}<span className="s">"XOF"</span>{`,
  `}<span className="k">"revenuMensuel"</span>{`: `}<span className="n">350000</span>{`,
  `}<span className="k">"epargneMensuelle"</span>{`: `}<span className="n">50000</span>{`,
  `}<span className="k">"depenses"</span>{`: [
    {
      `}<span className="k">"date"</span>{`: `}<span className="s">"2026-05-17"</span>{`,
      `}<span className="k">"montant"</span>{`: `}<span className="n">12500</span>{`,
      `}<span className="k">"categorie"</span>{`: `}<span className="s">"nourriture"</span>{`,
      `}<span className="k">"methode"</span>{`: `}<span className="s">"especes"</span>{`,
      `}<span className="k">"note"</span>{`: `}<span className="s">"Marché Sandaga"</span>{`
    },
    `}<span className="c">// ...11 autres</span>{`
  ]
}`}</pre>
            <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="x-chip" style={{ background: 'rgba(92,127,60,0.14)', color: 'var(--x-sage)' }}>
                <Icon name="check" size={12} stroke={2.4} /> Chiffré sur l'appareil
              </span>
              <span className="x-chip">68 ko</span>
              <span className="x-chip">12 dépenses</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// TESTIMONIALS
// ────────────────────────────────────────────────────────────
function Testimonials() {
  const quotes = [
    {
      body: "C'est la première fois que je tiens un mois entier sans me dire 'j'aurais dû noter'. Trois secondes pour ajouter une dépense, je le fais en marchant.",
      who: 'Aïssatou D.',
      role: 'Enseignante · Dakar',
      bg: '#F2D8B8',
      fg: '#7A4E10',
    },
    {
      body: "Enfin une app qui parle FCFA en entiers et qui sait ce qu'est Wave. Je n'ai plus besoin de bricoler avec un tableur.",
      who: 'Moussa S.',
      role: 'Développeur · Saint-Louis',
      bg: '#D5DDF0',
      fg: '#2E3A78',
    },
    {
      body: "Mon mari et moi avons mis Tabaski 2027 dans Xaalis. On voit chaque mois combien il faut mettre. Plus de mauvaise surprise.",
      who: 'Mariama B.',
      role: 'Commerçante · Pikine',
      bg: '#D6E5D0',
      fg: '#3D5A2E',
    },
  ];
  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <div className="lp-section-head">
          <div className="lp-eyebrow">Ce qu'en disent les utilisateurs</div>
          <h2>Trois secondes, <em>chaque jour.</em></h2>
        </div>
        <div className="lp-quotes">
          {quotes.map((q, i) => (
            <div key={i} className="lp-quote">
              <p className="body">{q.body}</p>
              <div className="who">
                <div className="av" style={{ background: q.bg, color: q.fg, borderColor: q.fg }}>{q.who[0]}</div>
                <div>
                  <div className="n">{q.who}</div>
                  <div className="r">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// FAQ
// ────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = _ls(0);
  const items = [
    {
      q: "Xaalis est-elle gratuite ?",
      a: "Oui — totalement. Pas de version payante, pas de publicité, pas de fonctionnalités cachées derrière un abonnement. Si Xaalis vous aide, vous pouvez nous offrir un café (facultatif).",
    },
    {
      q: "Pourquoi 'PWA' et pas une vraie app sur le Play Store ?",
      a: "Parce que vous installez Xaalis depuis votre navigateur, en un tap, sans passer par Google. Pas de téléchargement de plusieurs Mo, pas de mise à jour à valider, et l'app fonctionne aussi sur iPhone via Safari.",
    },
    {
      q: "Mes données partent-elles sur un serveur ?",
      a: "Par défaut, non. Tout est stocké sur votre téléphone. Si vous activez la synchronisation cloud (facultative), les données sont chiffrées avant d'être envoyées — nous ne pouvons pas les lire.",
    },
    {
      q: "Quelles méthodes de paiement sont supportées ?",
      a: "Pour l'instant : Espèces et Wave. C'est ce que la majorité d'entre nous utilise au quotidien. Orange Money et Free Money sont prévus dans une mise à jour à venir.",
    },
    {
      q: "Puis-je changer d'appareil sans perdre mes données ?",
      a: "Oui. Exportez en JSON (un seul tap dans Réglages), puis importez sur le nouveau téléphone. Ou activez la synchro cloud pour qu'elle se fasse toute seule.",
    },
    {
      q: "Comment ajouter d'autres devises ?",
      a: "Xaalis est conçue pour le franc CFA en priorité (XOF et XAF). D'autres devises de la sous-région arrivent — dites-nous ce qu'il vous faut.",
    },
  ];
  return (
    <section className="lp-section" id="faq" style={{ background: 'var(--x-paper)' }}>
      <div className="lp-wrap" style={{ maxWidth: 880 }}>
        <div className="lp-section-head left">
          <div className="lp-eyebrow">Questions fréquentes</div>
          <h2>Tout est dit, <em>rien n'est caché.</em></h2>
        </div>
        <div className="lp-faq-list">
          {items.map((it, i) => (
            <div key={i} className={'lp-faq-item' + (open === i ? ' open' : '')} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="q">
                <span>{it.q}</span>
                <span className="plus" />
              </div>
              <div className="a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="lp-footer" id="installer">
      <div className="lp-wrap">
        <div className="lp-footer-hero">
          <h2><span className="alt">Argent.</span><br /><em>Sans bruit.</em></h2>
          <p>Installez Xaalis sur votre écran d'accueil. Moins d'une minute, aucune carte bancaire, en français.</p>
          <a href="https://my-wallet-nine-ecru.vercel.app/" className="lp-btn lp-btn-saffron lp-btn-lg" target="_blank" rel="noopener noreferrer">
            <Icon name="plus" size={18} stroke={2.4} />
            Installer Xaalis
          </a>
          <div style={{ marginTop: 18, fontSize: 12, color: 'var(--x-ink-4)' }}>
            Fonctionne sur Android (Chrome) · iOS (Safari) · Desktop
          </div>
        </div>

        <div className="lp-footer-grid">
          <div className="lp-footer-col">
            <div className="lp-logo" style={{ color: 'var(--x-paper)' }}>
              <span className="lp-logo-mark">X</span>
              <span>Xaalis</span>
            </div>
            <p className="manifesto" style={{ marginTop: 18 }}>
              Une PWA d'épargne pour le franc CFA. Pensée pour la main droite, le pouce, et trois secondes d'attention sur le marché.
            </p>
          </div>
          <div className="lp-footer-col">
            <h5>Produit</h5>
            <a href="#fonctionnalites">Fonctionnalités</a>
            <a href="#demo">Démo en direct</a>
            <a href="#faq">FAQ</a>
            <a href="#">Notes de version</a>
          </div>
          <div className="lp-footer-col">
            <h5>Ressources</h5>
            <a href="#">Documentation</a>
            <a href="#">Format d'export</a>
            <a href="https://github.com/atetheone/my_wallet">Code source</a>
            <a href="#">Confidentialité</a>
          </div>
          <div className="lp-footer-col">
            <h5>Contact</h5>
            <a href="mailto:bonjour@xaalis.app">bonjour@xaalis.app</a>
            <a href="#">Twitter / X</a>
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>© 2026 Xaalis · Fait à Dakar, avec soin.</span>
          <span>v0.4.2 · open-source · MIT</span>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Manifesto />
      <Features />
      <HowItWorks />
      <InteractiveDemo />
      <Region />
      <Privacy />
      <Testimonials />
      <FAQ />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<LandingPage />);
