// Xaalis — screens 6-7 (Objectifs, Réglages)

// ════════════════════════════════════════════════════════════
// 6 · OBJECTIFS
// ════════════════════════════════════════════════════════════
function ScreenObjectifs() {
  const totalCible = SAMPLE.goals.reduce((s, g) => s + g.cible, 0);
  const totalDeja = SAMPLE.goals.reduce((s, g) => s + g.deja, 0);
  const pctTotal = Math.round(totalDeja / totalCible * 100);

  return (
    <PhoneShell bg="var(--x-cream)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 22px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--x-ink-3)' }}>
              Mes objectifs
            </div>
            <div className="x-display" style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>Épargne</div>
          </div>
          <button style={{
            width: 40, height: 40, borderRadius: 20,
            background: 'var(--x-ink)', color: 'var(--x-paper)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <Icon name="plus" size={20} stroke={2.2} />
          </button>
        </div>

        {/* roll-up card */}
        <div style={{ padding: '6px 14px' }}>
          <div className="x-card" style={{
            background: 'linear-gradient(135deg, var(--x-saffron) 0%, #D87A1B 100%)',
            border: 'none', color: 'var(--x-ink)',
            padding: '18px 20px',
            position: 'relative', overflow: 'hidden',
          }}>
            <svg style={{ position: 'absolute', bottom: -30, right: -30, opacity: 0.18 }} width="140" height="140" viewBox="0 0 100 100">
              <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="var(--x-ink)" />
              <circle cx="50" cy="50" r="20" fill="var(--x-cream)" />
            </svg>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
              Total épargne · 3 objectifs
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
              <span className="x-num x-display" style={{ fontSize: 36, fontWeight: 600, lineHeight: 1 }}>{fmtN(totalDeja)}</span>
              <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.7 }}>/ {fmtN(totalCible)} FCFA</span>
            </div>
            <div className="x-bar" style={{ marginTop: 14, height: 6, background: 'rgba(26,22,17,0.18)' }}>
              <i style={{ background: 'var(--x-ink)', width: pctTotal + '%' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, fontWeight: 600 }}>
              <span>{pctTotal}% atteint</span>
              <span>Épargne mensuelle <span className="x-num">{fmtN(SAMPLE.epargneMensuelle)}</span></span>
            </div>
          </div>
        </div>

        <div className="x-scroll" style={{ flex: 1, padding: '4px 14px 80px' }}>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 4px' }}>
            <div className="x-display" style={{ fontSize: 16, fontWeight: 600 }}>En cours</div>
            <div style={{ fontSize: 11, color: 'var(--x-ink-3)', fontWeight: 500 }}>Trier · récents</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
            {SAMPLE.goals.map((g, idx) => {
              const pct = Math.round(g.deja / g.cible * 100);
              // mock "required pace" — assume different months until échéance
              const moisRestants = [3, 7, 13][idx];
              const paceRequis = Math.ceil((g.cible - g.deja) / moisRestants / 100) * 100;
              const onTrack = paceRequis <= SAMPLE.epargneMensuelle;
              return (
                <div key={g.id} className="x-card" style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: 'var(--x-cream-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, flexShrink: 0,
                    }}>{g.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{g.nom}</div>
                      <div style={{ fontSize: 11, color: 'var(--x-ink-3)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icon name="calendar" size={11} stroke={1.8} /> {g.echeance}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="x-num" style={{ fontSize: 19, fontWeight: 700, color: 'var(--x-ink)' }}>{pct}%</div>
                    </div>
                  </div>

                  <div className="x-bar" style={{ marginTop: 14, height: 8 }}>
                    <i style={{
                      background: onTrack ? 'var(--x-sage)' : 'var(--x-clay)',
                      width: pct + '%',
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12 }}>
                    <span className="x-num" style={{ color: 'var(--x-ink-2)', fontWeight: 600 }}>{fmtN(g.deja)} FCFA</span>
                    <span style={{ color: 'var(--x-ink-3)' }}>cible <span className="x-num" style={{ color: 'var(--x-ink-2)' }}>{fmtN(g.cible)}</span></span>
                  </div>

                  {/* pace row */}
                  <div style={{
                    marginTop: 14, padding: '10px 12px',
                    background: 'var(--x-cream)', borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                        background: onTrack ? 'rgba(92,127,60,0.2)' : 'rgba(200,75,49,0.2)',
                        color: onTrack ? 'var(--x-sage)' : 'var(--x-clay)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {onTrack
                          ? <Icon name="check" size={12} stroke={2.4} />
                          : <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 700 }}>!</span>}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: onTrack ? 'var(--x-sage)' : 'var(--x-clay)' }}>
                          {onTrack ? 'Sur la bonne voie' : 'Rythme insuffisant'}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--x-ink-3)' }}>
                          Rythme requis · <span className="x-num">{fmtN(paceRequis)}</span> / mois
                        </div>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={16} stroke={1.6} color="var(--x-ink-4)" />
                  </div>
                </div>
              );
            })}

            {/* add new goal */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px', borderRadius: 18,
              border: '1.5px dashed var(--x-line-2)',
              background: 'transparent', color: 'var(--x-ink-2)',
              fontFamily: 'var(--x-font-body)', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', marginTop: 4,
            }}>
              <span style={{
                width: 32, height: 32, borderRadius: 10,
                background: 'var(--x-cream-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="sparkle" size={16} stroke={1.7} />
              </span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: 'var(--x-ink)' }}>Nouvel objectif</div>
                <div style={{ fontSize: 11, color: 'var(--x-ink-3)' }}>Maison, voyage, équipement…</div>
              </div>
              <div style={{ flex: 1 }} />
              <Icon name="plus" size={18} stroke={2} />
            </button>
          </div>
        </div>

        <TabBar active="goals" />
      </div>
    </PhoneShell>
  );
}

// ════════════════════════════════════════════════════════════
// 7 · RÉGLAGES
// ════════════════════════════════════════════════════════════
function ScreenReglages() {
  const Row = ({ icon, label, value, danger, last, onClick }) => (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
      padding: '13px 14px',
      background: 'transparent', border: 'none', cursor: 'pointer',
      borderBottom: last ? 'none' : '1px solid var(--x-line)',
      textAlign: 'left', fontFamily: 'var(--x-font-body)',
    }}>
      <span style={{
        width: 32, height: 32, borderRadius: 10,
        background: danger ? 'rgba(200,75,49,0.12)' : 'var(--x-cream-2)',
        color: danger ? 'var(--x-clay)' : 'var(--x-ink-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={icon} size={16} stroke={1.7} />
      </span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: danger ? 'var(--x-clay)' : 'var(--x-ink)' }}>{label}</span>
      {value && <span className={typeof value === 'number' ? 'x-num' : ''} style={{ fontSize: 13, color: 'var(--x-ink-3)' }}>{value}</span>}
      {!danger && <Icon name="chevron-right" size={16} stroke={1.6} color="var(--x-ink-4)" />}
    </button>
  );

  const Group = ({ title, children }) => (
    <div style={{ marginTop: 18 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--x-ink-3)', padding: '0 18px 8px',
      }}>{title}</div>
      <div style={{ background: 'var(--x-paper)', border: '1px solid var(--x-line)', borderRadius: 18, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );

  return (
    <PhoneShell bg="var(--x-cream)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 22px 4px' }}>
          <div className="x-display" style={{ fontSize: 28, fontWeight: 600 }}>Réglages</div>
        </div>

        <div className="x-scroll" style={{ flex: 1, padding: '6px 14px 80px' }}>
          {/* cloud sync card */}
          <div className="x-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'rgba(92,127,60,0.16)', color: 'var(--x-sage)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="cloud-check" size={22} stroke={1.7} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Synchronisé</div>
              <div style={{ fontSize: 12, color: 'var(--x-ink-3)', marginTop: 2 }}>
                aissa@orange.sn · il y a 2 min
              </div>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, padding: '4px 8px',
              background: 'rgba(92,127,60,0.16)', color: 'var(--x-sage)',
              borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>en ligne</div>
          </div>

          <Group title="Compte">
            <Row icon="mail"     label="Revenu mensuel"      value={fmtN(SAMPLE.revenuMensuel) + ' FCFA'} />
            <Row icon="calendar" label="Jour de paie"        value={'le ' + SAMPLE.jourPaie} />
            <Row icon="sparkle"  label="Épargne engagée"     value={fmtN(SAMPLE.epargneMensuelle) + ' FCFA'} last />
          </Group>

          <Group title="Charges fixes">
            <Row icon="home2" label="Modifier mes charges" value={SAMPLE.charges.length + ' actives'} last />
          </Group>

          <Group title="Sécurité">
            <Row icon="lock"        label="Modifier le code PIN" />
            <Row icon="fingerprint" label="Empreinte digitale" value="Activée" last />
          </Group>

          <Group title="Données">
            <Row icon="export" label="Exporter en JSON"  value="12,4 ko" />
            <Row icon="import" label="Importer une sauvegarde" last />
          </Group>

          <Group title="Compte cloud">
            <Row icon="cloud" label="Se déconnecter" danger last />
          </Group>

          <div style={{ textAlign: 'center', padding: '24px 20px 0', fontSize: 11, color: 'var(--x-ink-4)' }}>
            Xaalis · version 1.0.3 · « xaalis » signifie argent en wolof
          </div>
        </div>

        <TabBar active="settings" />
      </div>
    </PhoneShell>
  );
}

Object.assign(window, { ScreenObjectifs, ScreenReglages });
