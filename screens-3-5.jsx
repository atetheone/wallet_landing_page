// Xaalis — screens 3-5 (Accueil, Ajouter, Historique)

// ════════════════════════════════════════════════════════════
// 3 · ACCUEIL — home
// ════════════════════════════════════════════════════════════
function ScreenAccueil() {
  const moisLabel = 'mai 2026';

  // wedge chart of categories spent so far (for the strip)
  const byCat = {};
  for (const d of SAMPLE.depenses) byCat[d.cat] = (byCat[d.cat] || 0) + d.montant;
  const catRanked = Object.entries(byCat).sort((a, b) => b[1] - a[1]);

  return (
    <PhoneShell bg="var(--x-cream)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* header: salutation + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px 4px' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--x-ink-3)', fontWeight: 500 }}>Bonsoir, Aïssatou</div>
            <div className="x-display" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{moisLabel}</div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 20,
            background: 'var(--x-saffron)', color: 'var(--x-ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--x-font-display)', fontWeight: 600, fontSize: 16,
            border: '1.5px solid var(--x-ink)',
          }}>A</div>
        </div>

        {/* hero card */}
        <div className="x-scroll" style={{ flex: 1, padding: '8px 14px 100px' }}>
          <div style={{
            background: 'var(--x-ink)', color: 'var(--x-paper)',
            borderRadius: 26, padding: '20px 22px 24px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* decorative arc */}
            <svg style={{ position: 'absolute', top: -40, right: -40, opacity: 0.25 }} width="180" height="180" viewBox="0 0 180 180">
              <circle cx="120" cy="60" r="80" fill="none" stroke="var(--x-saffron)" strokeWidth="1.3" />
              <circle cx="120" cy="60" r="60" fill="none" stroke="var(--x-saffron)" strokeWidth="1.3" />
              <circle cx="120" cy="60" r="40" fill="none" stroke="var(--x-saffron)" strokeWidth="1.3" />
            </svg>

            <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--x-ink-4)', fontWeight: 600 }}>
              Reste à dépenser
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
              <span className="x-num x-display" style={{ fontSize: 54, fontWeight: 600, lineHeight: 1, color: 'var(--x-paper)' }}>
                {fmtN(resteAdepenser)}
              </span>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--x-ink-4)' }}>FCFA</span>
            </div>

            {/* allocation strip */}
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--x-ink-4)' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--x-ink-3)', opacity: 0.4 }} />
              <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Par jour</span>
              <div style={{ flex: 1, height: 1, background: 'var(--x-ink-3)', opacity: 0.4 }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
              <div>
                <div className="x-num" style={{ fontSize: 28, fontWeight: 600, color: 'var(--x-saffron)' }}>
                  {fmtN(allocJour)} <span style={{ fontSize: 14, color: 'var(--x-ink-4)' }}>FCFA</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--x-ink-4)', marginTop: 3 }}>jusqu'au 31 mai · {joursRestants} jours</div>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, padding: '5px 10px',
                background: 'rgba(92,127,60,0.25)', color: '#A0C77A',
                borderRadius: 999, letterSpacing: '0.02em',
              }}>↑ dans le vert</div>
            </div>

            {/* progress vs month */}
            <div style={{ marginTop: 16 }}>
              <div className="x-bar" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <i style={{ background: 'var(--x-saffron)', width: `${(totalDepenses / disponibleMensuel) * 100}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--x-ink-4)' }}>
                <span>Dépensé <span className="x-num" style={{ color: 'var(--x-paper)' }}>{fmtN(totalDepenses)}</span></span>
                <span>Budget <span className="x-num" style={{ color: 'var(--x-paper)' }}>{fmtN(disponibleMensuel)}</span></span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="x-btn x-btn-saffron" style={{
            width: '100%', marginTop: 14, padding: '18px 22px', fontSize: 16,
          }}>
            <Icon name="plus" size={20} stroke={2} /> Ajouter une dépense
          </button>

          {/* Goals header */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 28, padding: '0 4px' }}>
            <div className="x-display" style={{ fontSize: 18, fontWeight: 600 }}>Objectifs d'épargne</div>
            <div style={{ fontSize: 12, color: 'var(--x-ink-3)', fontWeight: 500 }}>Voir tout</div>
          </div>

          {/* goal cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            {SAMPLE.goals.slice(0, 2).map((g) => {
              const pct = Math.round((g.deja / g.cible) * 100);
              return (
                <div key={g.id} className="x-card" style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{g.emoji}</span>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--x-ink)' }}>{g.nom}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                        <span className="x-num" style={{ fontSize: 19, fontWeight: 600 }}>{fmtN(g.deja)}</span>
                        <span style={{ fontSize: 12, color: 'var(--x-ink-3)' }}>/ {fmtN(g.cible)} FCFA</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="x-num" style={{ fontSize: 18, fontWeight: 700, color: 'var(--x-saffron-deep)' }}>{pct}%</div>
                      <div style={{ fontSize: 10, color: 'var(--x-ink-3)', marginTop: 2 }}>{g.echeance}</div>
                    </div>
                  </div>
                  <div className="x-bar" style={{ marginTop: 14, height: 6 }}>
                    <i style={{ background: 'var(--x-saffron)', width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* quick categories pulse */}
          <div style={{ marginTop: 24, padding: '0 4px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div className="x-display" style={{ fontSize: 18, fontWeight: 600 }}>Ce mois</div>
              <div style={{ fontSize: 12, color: 'var(--x-ink-3)', fontWeight: 500 }}>{SAMPLE.depenses.length} dépenses</div>
            </div>
            <div style={{ display: 'flex', height: 8, marginTop: 12, borderRadius: 999, overflow: 'hidden', gap: 2 }}>
              {catRanked.map(([cid, val]) => {
                const cat = CAT_BY_ID[cid];
                const pct = (val / totalDepenses) * 100;
                return <div key={cid} style={{ flexBasis: `${pct}%`, background: cat.fg }} />;
              })}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {catRanked.slice(0, 4).map(([cid, val]) => {
                const cat = CAT_BY_ID[cid];
                return (
                  <div key={cid} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '5px 9px 5px 6px', borderRadius: 999,
                    background: cat.bg, color: cat.fg, fontSize: 11, fontWeight: 600,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: 3, background: cat.fg }} />
                    {cat.label}
                    <span className="x-num">{fmtN(val)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <TabBar active="home" />
      </div>
    </PhoneShell>
  );
}

// ════════════════════════════════════════════════════════════
// 4 · AJOUTER — quick-add expense
// ════════════════════════════════════════════════════════════
function ScreenAjouter() {
  const [amount, setAmount] = _us('2500');
  const [cat, setCat] = _us('nourriture');
  const [method, setMethod] = _us('wave');

  const push = (d) => {
    setAmount(prev => {
      if (prev === '0') return d;
      if (prev.length >= 7) return prev;
      return prev + d;
    });
  };
  const del = () => setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');

  const Key = ({ d, onClick, children }) => (
    <button onClick={onClick} style={{
      height: 56, background: 'transparent', border: 'none',
      fontFamily: 'var(--x-font-display)', fontSize: 26, fontWeight: 500,
      color: 'var(--x-ink)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 14,
    }}>{children ?? d}</button>
  );

  return (
    <PhoneShell bg="var(--x-cream)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* header: close + title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 4px' }}>
          <button style={{ background: 'transparent', border: 'none', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--x-ink)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
          <div className="x-display" style={{ fontSize: 16, fontWeight: 600 }}>Nouvelle dépense</div>
          <div style={{ width: 36 }} />
        </div>

        {/* amount big */}
        <div style={{ textAlign: 'center', padding: '24px 12px 8px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--x-ink-3)', fontWeight: 600 }}>
            Montant
          </div>
          <div className="x-num" style={{ marginTop: 10, fontSize: 64, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em' }}>
            {fmtN(Number(amount))}
            <span style={{ fontSize: 22, color: 'var(--x-ink-3)', marginLeft: 8, fontWeight: 500 }}>FCFA</span>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--x-ink-3)' }}>
            Restera <span className="x-num" style={{ color: 'var(--x-ink-2)', fontWeight: 600 }}>{fmtN(resteAdepenser - Number(amount))}</span> FCFA ce mois
          </div>
        </div>

        {/* category picker */}
        <div style={{ padding: '12px 14px 0' }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }} className="x-scroll">
            {CATS.map(c => {
              const sel = c.id === cat;
              return (
                <button key={c.id} onClick={() => setCat(c.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 14px 9px 10px', borderRadius: 999,
                  background: sel ? c.fg : c.bg,
                  color: sel ? '#fff' : c.fg,
                  border: 'none', whiteSpace: 'nowrap',
                  fontFamily: 'var(--x-font-body)', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', flexShrink: 0,
                  boxShadow: sel ? '0 4px 12px ' + c.fg + '55' : 'none',
                  transition: 'all 0.15s',
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: sel ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: sel ? '#fff' : c.fg,
                  }}>
                    <Icon name={c.icon} size={14} stroke={1.8} />
                  </span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* method toggle */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{
            display: 'flex', background: 'var(--x-paper)',
            border: '1px solid var(--x-line)', borderRadius: 14, padding: 4,
          }}>
            {[
              { id: 'cash', label: 'Espèces', icon: 'cash' },
              { id: 'wave', label: 'Wave',    icon: 'wave' },
            ].map(m => {
              const sel = m.id === method;
              return (
                <button key={m.id} onClick={() => setMethod(m.id)} style={{
                  flex: 1, padding: '10px 12px',
                  background: sel ? 'var(--x-ink)' : 'transparent',
                  color: sel ? 'var(--x-paper)' : 'var(--x-ink-2)',
                  border: 'none', borderRadius: 11,
                  fontFamily: 'var(--x-font-body)', fontSize: 14, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  <Icon name={m.icon} size={16} stroke={1.8} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* note */}
        <div style={{ padding: '10px 18px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--x-paper)', borderRadius: 14,
            border: '1px solid var(--x-line)',
            padding: '10px 14px', color: 'var(--x-ink-3)', fontSize: 14,
          }}>
            <Icon name="edit" size={16} stroke={1.6} />
            <span>Ajouter une note (facultatif)</span>
          </div>
        </div>

        {/* keypad + cta */}
        <div style={{ marginTop: 'auto', padding: '10px 14px 8px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4,
            background: 'transparent',
          }}>
            {['1','2','3','4','5','6','7','8','9'].map(d => (
              <Key key={d} d={d} onClick={() => push(d)} />
            ))}
            <Key onClick={() => push('000')}>000</Key>
            <Key onClick={() => push('0')}>0</Key>
            <Key onClick={del}>
              <svg width="24" height="18" viewBox="0 0 26 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 1L1 10l7 9h16a1 1 0 001-1V2a1 1 0 00-1-1z"/><path d="M13 7l6 6M19 7l-6 6"/>
              </svg>
            </Key>
          </div>
          <button className="x-btn" style={{ width: '100%', marginTop: 4, padding: '16px' }}>
            <Icon name="check" size={20} stroke={2.2} /> Valider la dépense
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}

// ════════════════════════════════════════════════════════════
// 5 · HISTORIQUE
// ════════════════════════════════════════════════════════════
function ScreenHistorique() {
  const [view, setView] = _us('liste');

  // group dépenses by day
  const grouped = {};
  for (const d of SAMPLE.depenses) {
    (grouped[d.date] = grouped[d.date] || []).push(d);
  }
  const days = Object.keys(grouped);

  // cat totals
  const byCat = {};
  for (const d of SAMPLE.depenses) {
    if (!byCat[d.cat]) byCat[d.cat] = { total: 0, count: 0 };
    byCat[d.cat].total += d.montant;
    byCat[d.cat].count += 1;
  }
  const catTotals = Object.entries(byCat).sort((a, b) => b[1].total - a[1].total);

  return (
    <PhoneShell bg="var(--x-cream)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 22px 6px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--x-ink-3)' }}>
            Historique · mai 2026
          </div>
          <div className="x-display" style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>
            <span className="x-num">{fmtN(totalDepenses)}</span> <span style={{ fontSize: 16, color: 'var(--x-ink-3)' }}>FCFA</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--x-ink-3)', marginTop: 2 }}>{SAMPLE.depenses.length} dépenses · {fmtN(Math.round(totalDepenses/17))} FCFA / jour moyen</div>
        </div>

        {/* segmented */}
        <div style={{ padding: '10px 22px 6px' }}>
          <div style={{ display: 'flex', background: 'var(--x-paper)', borderRadius: 12, padding: 4, border: '1px solid var(--x-line)' }}>
            {[
              { id: 'liste', label: 'Liste' },
              { id: 'categories', label: 'Catégories' },
            ].map(t => {
              const sel = t.id === view;
              return (
                <button key={t.id} onClick={() => setView(t.id)} style={{
                  flex: 1, padding: '8px 10px',
                  background: sel ? 'var(--x-ink)' : 'transparent',
                  color: sel ? 'var(--x-paper)' : 'var(--x-ink-2)',
                  border: 'none', borderRadius: 9, cursor: 'pointer',
                  fontFamily: 'var(--x-font-body)', fontSize: 13, fontWeight: 600,
                }}>{t.label}</button>
              );
            })}
          </div>
        </div>

        <div className="x-scroll" style={{ flex: 1, padding: '4px 14px 80px' }}>
          {view === 'liste' && days.map(date => (
            <div key={date} style={{ marginTop: 12 }}>
              <div style={{
                position: 'sticky', top: 0,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--x-ink-3)', padding: '6px 8px 6px',
                background: 'var(--x-cream)',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>{date}</span>
                <span className="x-num">{fmtN(grouped[date].reduce((s,d) => s+d.montant, 0))} FCFA</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--x-paper)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--x-line)' }}>
                {grouped[date].map((d, i) => {
                  const c = CAT_BY_ID[d.cat];
                  return (
                    <div key={d.id} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 14px',
                      borderBottom: i < grouped[date].length - 1 ? '1px solid var(--x-line)' : 'none',
                    }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 12,
                        background: c.bg, color: c.fg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Icon name={c.icon} size={18} stroke={1.7} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--x-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.label}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                          <span style={{ fontSize: 11, color: 'var(--x-ink-3)' }}>{c.label}</span>
                          <span style={{ fontSize: 11, color: 'var(--x-ink-4)' }}>·</span>
                          <span className={'x-chip ' + d.methode} style={{ padding: '2px 7px', fontSize: 10 }}>
                            <Icon name={d.methode === 'wave' ? 'wave' : 'cash'} size={11} stroke={1.8} />
                            {d.methode === 'wave' ? 'Wave' : 'Espèces'}
                          </span>
                        </div>
                      </div>
                      <div className="x-num" style={{ fontSize: 15, fontWeight: 600 }}>
                        −{fmtN(d.montant)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {view === 'categories' && (
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* total bar */}
              <div className="x-card" style={{ padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--x-ink-3)' }}>
                  Répartition
                </div>
                <div style={{ display: 'flex', height: 12, marginTop: 12, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
                  {catTotals.map(([cid, v]) => {
                    const cat = CAT_BY_ID[cid];
                    return <div key={cid} style={{ flexBasis: `${(v.total/totalDepenses)*100}%`, background: cat.fg }} />;
                  })}
                </div>
              </div>
              {catTotals.map(([cid, v]) => {
                const cat = CAT_BY_ID[cid];
                const pct = Math.round(v.total / totalDepenses * 100);
                return (
                  <div key={cid} className="x-card" style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: cat.bg, color: cat.fg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon name={cat.icon} size={20} stroke={1.7} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{cat.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--x-ink-3)' }}>{v.count} dépense{v.count > 1 ? 's' : ''}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="x-num" style={{ fontSize: 16, fontWeight: 700 }}>{fmtN(v.total)}</div>
                        <div className="x-num" style={{ fontSize: 11, color: 'var(--x-ink-3)' }}>{pct}%</div>
                      </div>
                    </div>
                    <div className="x-bar" style={{ marginTop: 10, height: 5 }}>
                      <i style={{ background: cat.fg, width: pct + '%' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <TabBar active="history" />
      </div>
    </PhoneShell>
  );
}

Object.assign(window, { ScreenAccueil, ScreenAjouter, ScreenHistorique });
