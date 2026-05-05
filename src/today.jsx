import React from 'react';
import { CONTRACTORS, PROJECTS } from './data.js';
import {
  Avatar, Numerals, MapCard, SectionLabel, TimeTabs, StatusChip, LiftedStatusBar,
} from './primitives.jsx';

export function TodayScreen({ onNav, onOpenPayroll, density }) {
  const [period, setPeriod] = React.useState('today');

  return (
    <>
      <LiftedStatusBar tone="ink" />

      <div className="lifted-content">

        <div style={{ padding: '18px 0 8px' }}>
          <div className="row between" style={{ alignItems: 'center', marginBottom: 16 }}>
            <div className="label-muted">Friday · April 24</div>
            <button onClick={() => onNav('dashboard')} aria-label="Open profile" style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1.5px solid var(--ink)', padding: 0, background: 'var(--mist)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--display)', fontWeight: 700, fontSize: 13,
              color: 'var(--ink)', cursor: 'pointer'
            }}>AW</button>
          </div>
          <div className="display" style={{ lineHeight: 0.95, letterSpacing: '-0.03em', fontSize: '24px', whiteSpace: 'nowrap' }}>
            Good morning, Adriana.
          </div>
          <div className="meta" style={{ marginTop: 14, maxWidth: 280 }}>
            Four projects in motion, two contracts moving, three documents to clear.
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div className="row between" style={{ alignItems: 'center', padding: '0 2px 18px', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <span className="label-muted">Active projects</span>
              <div className="display-md" style={{ fontSize: 26, letterSpacing: '-0.025em', marginTop: 4, lineHeight: 1 }}>
                4 in flight.
              </div>
            </div>
            <button onClick={() => onNav('engage')} style={{
              background: 'var(--ink)', color: 'var(--bone)', border: 0, borderRadius: 999,
              padding: '10px 14px', fontSize: 11, letterSpacing: '0.04em', fontWeight: 600,
              cursor: 'pointer', textTransform: 'uppercase', flexShrink: 0,
              whiteSpace: 'nowrap'
            }}>
              + New project
            </button>
          </div>

          <div className="hero-yellow" style={{ padding: '18px 22px 16px', marginBottom: 12 }}>
            <div className="row between" style={{ alignItems: 'flex-end' }}>
              <div>
                <div className="label">Combined budget</div>
                <div className="display tabular" style={{ fontSize: 38, letterSpacing: '-0.035em', lineHeight: 0.9, marginTop: 6 }}>
                  $<Numerals text="94,580" />
                  <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(10,10,10,0.55)', marginLeft: 6 }}>spent</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="label-muted" style={{ color: 'rgba(10,10,10,0.55)' }}>of $157,500</div>
                <div className="meta tabular" style={{ color: 'var(--ink)', fontWeight: 600, marginTop: 4 }}>60% used</div>
              </div>
            </div>
            <div style={{ marginTop: 14, height: 8, background: 'rgba(10,10,10,0.12)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: 'var(--ink)', borderRadius: 999 }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PROJECTS.map((p) => {
              const contractors = p.contractorIds.map((id) => CONTRACTORS.find((c) => c.id === id)).filter(Boolean);
              const pct = Math.round(p.currentCost / p.estimatedCost * 100);
              const urgent = p.nextMilestone.daysOut <= 5;
              return (
                <button key={p.id} onClick={() => onNav('contracts')} style={{
                  width: '100%', textAlign: 'left', border: 0, padding: 0, background: 'transparent', cursor: 'pointer'
                }}>
                  <div className="card" style={{ padding: 16 }}>
                    <div className="row between" style={{ alignItems: 'flex-start' }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="label-muted" style={{ marginBottom: 4 }}>{p.client}</div>
                        <div style={{
                          fontFamily: 'var(--display)', fontWeight: 700, fontSize: 19,
                          letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)'
                        }}>
                          {p.title}
                        </div>
                      </div>
                      <div style={{
                        flexShrink: 0, marginLeft: 12, textAlign: 'right',
                        padding: '6px 10px', borderRadius: 999,
                        background: urgent ? 'var(--yellow)' : 'var(--mist)',
                        color: 'var(--ink)'
                      }}>
                        <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 14, lineHeight: 1, letterSpacing: '-0.01em' }}>
                          {p.nextMilestone.daysOut}d
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ marginTop: 14, gap: 18 }}>
                      <div style={{ flex: 1 }}>
                        <div className="label-muted" style={{ fontSize: 9 }}>Current</div>
                        <div className="tabular" style={{
                          fontFamily: 'var(--display)', fontWeight: 700, fontSize: 20,
                          letterSpacing: '-0.02em', color: 'var(--ink)', marginTop: 2
                        }}>
                          $<Numerals text={p.currentCost.toLocaleString()} />
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="label-muted" style={{ fontSize: 9 }}>Estimated</div>
                        <div className="tabular" style={{
                          fontFamily: 'var(--display)', fontWeight: 600, fontSize: 20,
                          letterSpacing: '-0.02em', color: 'var(--shadow-c)', marginTop: 2
                        }}>
                          $<Numerals text={p.estimatedCost.toLocaleString()} />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 10, height: 4, background: 'var(--mist)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        background: pct > 90 ? '#B65A3C' : 'var(--ink)',
                        borderRadius: 999, transition: 'width .6s var(--ease)'
                      }} />
                    </div>

                    <div className="row between" style={{ marginTop: 14, alignItems: 'center' }}>
                      <div style={{ display: 'flex' }}>
                        {contractors.map((c, i) =>
                          <div key={c.id} style={{
                            marginLeft: i ? -8 : 0,
                            border: '2px solid var(--bone)', borderRadius: '50%'
                          }}>
                            <Avatar contractor={c} size="sm" />
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right', minWidth: 0, flex: 1, marginLeft: 12 }}>
                        <div className="label-muted" style={{ fontSize: 9 }}>Next · {p.nextMilestone.due}</div>
                        <div className="meta" style={{
                          color: 'var(--ink)', marginTop: 2,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                        }}>
                          {p.nextMilestone.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <TimeTabs value={period} onChange={setPeriod} items={[
          { key: 'today', label: 'Today', count: 6 },
          { key: 'week', label: 'Week', count: 14 },
          { key: 'month', label: 'April', count: 38 },
          { key: 'quarter', label: 'Q2', count: 92 },
          { key: 'year', label: '2026', count: 312 }
        ]} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>

          <button onClick={() => onNav('compliance')} style={{
            gridColumn: '1 / 3', textAlign: 'left', border: 0, padding: 0, background: 'transparent',
            cursor: 'pointer'
          }}>
            <div className="hero-sand">
              <div className="row between" style={{ marginBottom: 14 }}>
                <span className="label">Compliance</span>
                <span className="label-muted" style={{ color: 'rgba(10,10,10,0.55)' }}>4 days left</span>
              </div>
              <div className="meta" style={{ color: 'rgba(10,10,10,0.65)', marginBottom: 4 }}>to Carlos Reyes</div>
              <div className="display-md" style={{ fontSize: 32, lineHeight: 1.04 }}>
                Tax form expires<br />in four days.
              </div>
              <div className="row between" style={{ marginTop: 18 }}>
                <div className="row gap-8">
                  <Avatar contractor={CONTRACTORS[1]} size="sm" />
                  <span className="meta" style={{ color: 'var(--ink)' }}>Buenos Aires · AFIP</span>
                </div>
                <span className="label">Nudge →</span>
              </div>
            </div>
          </button>

          <div style={{ gridColumn: '1 / 3', margin: '0 -20px' }}>
            <div className="ios-scroll" style={{
              display: 'flex', gap: 12, overflowX: 'auto', overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              padding: '2px 20px 2px'
            }}>

              <button onClick={() => onNav('contracts')} style={{
                flex: '0 0 64%', scrollSnapAlign: 'start',
                textAlign: 'left', border: 0, padding: 0, background: 'transparent', cursor: 'pointer'
              }}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <span className="label-muted">Awaiting signature</span>
                  <div className="display-md" style={{ fontSize: 28, lineHeight: 1, marginTop: 10, letterSpacing: '-0.025em' }}>
                    <Numerals text="02" /><span style={{ fontWeight: 500, color: 'var(--shadow-c)' }}>d</span> <Numerals text="04" /><span style={{ fontWeight: 500, color: 'var(--shadow-c)' }}>h</span>
                  </div>
                  <div className="meta" style={{ marginTop: 8, color: 'var(--shadow-c)' }}>to Maya Chen</div>
                  <div className="meta" style={{ color: 'var(--ink)' }}>MX Independent Services</div>
                  <div className="grow" />
                  <div className="rail" style={{ marginTop: 14 }}>
                    <div className="rail-step done" />
                    <div className="rail-step done" />
                    <div className="rail-step now" />
                    <div className="rail-step" />
                  </div>
                  <div className="row between" style={{ marginTop: 8 }}>
                    <span className="label-muted" style={{ fontSize: 9 }}>Sent</span>
                    <span className="label-muted" style={{ fontSize: 9 }}>Opened</span>
                    <span className="label-muted" style={{ fontSize: 9, color: 'var(--ink)' }}>Signing</span>
                    <span className="label-muted" style={{ fontSize: 9 }}>Signed</span>
                  </div>
                </div>
              </button>

              <button onClick={() => onNav('timesheets')} style={{
                flex: '0 0 64%', scrollSnapAlign: 'start',
                textAlign: 'left', border: 0, padding: 0, background: 'transparent', cursor: 'pointer'
              }}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <span className="label-muted">Timesheets</span>
                  <div className="display-md" style={{ fontSize: 28, lineHeight: 1, marginTop: 10, letterSpacing: '-0.025em' }}>
                    <Numerals text="04" /><span style={{ fontWeight: 500, color: 'var(--shadow-c)', fontSize: 18, marginLeft: 4 }}>pending</span>
                  </div>
                  <div className="meta" style={{ marginTop: 8, color: 'var(--shadow-c)' }}>cutoff Sunday 23:59</div>
                  <div className="grow" />
                  <div style={{ display: 'flex', marginTop: 14 }}>
                    {[CONTRACTORS[0], CONTRACTORS[3], CONTRACTORS[4], CONTRACTORS[6]].map((c, i) =>
                      <div key={c.id} style={{ marginLeft: i ? -8 : 0, border: '2px solid #FAF9F2', borderRadius: '50%' }}>
                        <Avatar contractor={c} size="sm" />
                      </div>
                    )}
                  </div>
                  <div className="meta tabular" style={{ marginTop: 10, color: 'var(--ink)', fontWeight: 600 }}>$12,840</div>
                </div>
              </button>

              <div style={{ flex: '0 0 8px' }} />
            </div>
          </div>

          <button onClick={() => onNav('engage')} style={{
            gridColumn: '1 / 3', textAlign: 'left', border: 0, padding: 0, background: 'transparent', cursor: 'pointer'
          }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <MapCard pinX={CONTRACTORS[0].pinX} pinY={CONTRACTORS[0].pinY} contractor={CONTRACTORS[0]} height={140} />
              <div style={{ padding: '16px 18px 18px' }}>
                <div className="meta" style={{ color: 'var(--shadow-c)' }}>from Mexico City</div>
                <div className="display-md" style={{ fontSize: 22, marginTop: 4, letterSpacing: '-0.02em' }}>
                  Maya joined the roster.
                </div>
                <div className="row between" style={{ marginTop: 10 }}>
                  <StatusChip tone="warning">3 documents pending</StatusChip>
                  <span className="label">Open profile →</span>
                </div>
              </div>
            </div>
          </button>

          <button onClick={() => onNav('messages')} style={{
            textAlign: 'left', border: 0, padding: 0, background: 'transparent', cursor: 'pointer'
          }}>
            <div className="card-mist card" style={{ height: '100%' }}>
              <span className="label-muted">Inbox</span>
              <div className="display-md" style={{ marginTop: 8, letterSpacing: '-0.03em', lineHeight: 0.95, fontSize: '32px' }}>
                You have<br /><Numerals text="07" /><br />unread.
              </div>
              <div className="meta" style={{ marginTop: 14, color: 'var(--shadow-c)' }}>to Nathaniel Mills</div>
              <div className="meta">Re: April milestone — looks good.</div>
            </div>
          </button>

          <button onClick={() => onNav('dashboard')} style={{
            textAlign: 'left', border: 0, padding: 0, background: 'transparent', cursor: 'pointer'
          }}>
            <div className="hero-ink" style={{ height: '100%' }}>
              <span className="label" style={{ color: 'rgba(242,240,232,0.6)' }}>Spend · April</span>
              <div className="display-md" style={{ marginTop: 14, letterSpacing: '-0.03em', color: 'var(--bone)', fontSize: '32px' }}>
                $<Numerals text="142,308" />
              </div>
              <svg viewBox="0 0 100 28" width="100%" height="40" style={{ marginTop: 10 }} preserveAspectRatio="none">
                <polyline points="0,22 10,18 20,20 30,14 40,16 50,10 60,12 70,6 80,8 90,4 100,5"
                  fill="none" stroke="var(--yellow)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="row between" style={{ marginTop: 8 }}>
                <span className="meta" style={{ color: 'rgba(242,240,232,0.6)' }}>vs last month</span>
                <span className="meta tabular" style={{ color: 'var(--yellow)' }}>+18.4%</span>
              </div>
            </div>
          </button>

        </div>

        <SectionLabel count={6}>Today's queue</SectionLabel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { c: CONTRACTORS[1], title: 'Tax form re-upload', sub: 'AFIP F.572 · expiring in 4 days', tone: 'warning' },
            { c: CONTRACTORS[3], title: 'Approve April milestone', sub: 'iOS Engineer · $5,400', tone: 'ink' },
            { c: CONTRACTORS[4], title: 'Countersign agreement', sub: 'Brand Strategist · MSA 044', tone: 'info' },
            { c: CONTRACTORS[5], title: 'Review invoice', sub: 'Content Editor · 18 hrs', tone: 'ink' }
          ].map((row, i) =>
            <div key={i} className="card row gap-12" style={{ padding: 14 }}>
              <Avatar contractor={row.c} size="md" />
              <div className="grow col gap-4">
                <div className="meta" style={{ color: 'var(--shadow-c)' }}>to {row.c.name}</div>
                <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.005em' }}>{row.title}</div>
                <div className="meta" style={{ color: 'var(--shadow-c)' }}>
                  <span className={`dot ${row.tone}`} />{row.sub}
                </div>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink: 0, color: 'var(--shadow-c)' }}>
                <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        <div style={{ height: 24 }} />
      </div>
    </>
  );
}
