import React from 'react';
import { CONTRACTORS } from './data.js';
import { Avatar, Numerals, SectionLabel, LiftedStatusBar } from './primitives.jsx';

export function PayrollFlow({ onClose }) {
  const [step, setStep] = React.useState('preview');
  const [paidIds, setPaidIds] = React.useState([]);
  const [payingIdx, setPayingIdx] = React.useState(-1);
  const [expanded, setExpanded] = React.useState(null);

  const runContractors = CONTRACTORS;
  const total = runContractors.reduce((a, c) => a + c.amount, 0);

  React.useEffect(() => {
    if (step !== 'processing') return;
    let i = 0;
    setPayingIdx(0);
    setPaidIds([]);
    const tick = () => {
      if (i >= runContractors.length) {
        setPayingIdx(-1);
        setTimeout(() => setStep('done'), 600);
        return;
      }
      setPayingIdx(i);
      setTimeout(() => {
        setPaidIds(prev => [...prev, runContractors[i].id]);
        i += 1;
        setTimeout(tick, 60);
      }, 280);
    };
    const id = setTimeout(tick, 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (step === 'processing' || step === 'done') {
    return (
      <ProcessingScreen
        contractors={runContractors}
        paidIds={paidIds}
        payingId={payingIdx >= 0 ? runContractors[payingIdx].id : null}
        done={step === 'done'}
        total={total}
        onClose={onClose}
      />
    );
  }

  return (
    <>
      <LiftedStatusBar tone="ink" />

      <div className="lifted-content" style={{ paddingBottom: 200 }}>
        <div className="row between" style={{ padding: '8px 0 16px' }}>
          <button onClick={onClose} style={{
            border:0, background:'rgba(10,10,10,0.05)', borderRadius: 18, padding:'8px 12px',
            display:'flex', alignItems:'center', gap: 6, fontSize: 13, fontWeight: 600,
          }}>
            <svg width="12" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Today
          </button>
        </div>

        <div className="hero-yellow">
          <div className="row between">
            <span className="label">Next run</span>
            <span className="label">12 contractors</span>
          </div>
          <div className="display" style={{ fontSize: 48, marginTop: 14, letterSpacing:'-0.04em', lineHeight: 0.85, display:'flex', alignItems:'baseline', flexWrap:'nowrap' }}>
            <span>$</span><Numerals text={total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
            <span style={{ fontSize: 20, fontWeight: 600, color: 'rgba(10,10,10,0.5)', marginLeft: 4 }}>.00</span>
          </div>
          <div className="row between" style={{ marginTop: 10 }}>
            <span className="meta" style={{ color: 'rgba(10,10,10,0.7)' }}>in 2d · 14h · 32m · across 8 countries</span>
            <span className="label">No hidden margin</span>
          </div>
        </div>

        <SectionLabel count={runContractors.length}>Line items</SectionLabel>

        <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
          {runContractors.map(c => {
            const isOpen = expanded === c.id;
            return (
              <div key={c.id} className="card" style={{ padding: 0, overflow:'hidden' }}>
                <button onClick={() => setExpanded(isOpen ? null : c.id)} style={{
                  width:'100%', textAlign:'left', border:0, background:'transparent', padding: 14,
                  cursor:'pointer',
                }}>
                  <div className="row gap-12">
                    <Avatar contractor={c} size="md" />
                    <div className="grow col gap-4">
                      <div className="meta" style={{ color: 'var(--shadow-c)' }}>to {c.name}</div>
                      <div style={{ fontWeight: 700, fontSize: 16, letterSpacing:'-0.01em' }}>
                        ${c.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="meta" style={{ color: 'var(--shadow-c)' }}>
                        {c.localAmount} · {c.rail}
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 14px 16px', animation: 'fadeIn .3s var(--ease)' }}>
                    <div style={{ height: 1, background: 'var(--mist)', margin: '0 0 14px' }} />
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', rowGap: 10, columnGap: 14 }}>
                      <div>
                        <div className="label-muted">FX rate</div>
                        <div className="tabular" style={{ fontWeight: 600, marginTop: 2 }}>1 USD = {c.fx} {c.currency}</div>
                      </div>
                      <div>
                        <div className="label-muted">Lifted fee</div>
                        <div className="tabular" style={{ fontWeight: 600, marginTop: 2 }}>{c.fee}</div>
                      </div>
                      <div>
                        <div className="label-muted">Rail</div>
                        <div style={{ fontWeight: 600, marginTop: 2 }}>{c.rail}</div>
                      </div>
                      <div>
                        <div className="label-muted">Delivery</div>
                        <div style={{ fontWeight: 600, marginTop: 2 }}>{c.eta}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 14, padding: 12, background: 'var(--mist)', borderRadius: 10 }}>
                      <div className="label-muted">Compliance</div>
                      <div className="meta" style={{ color: 'var(--ink)', marginTop: 2 }}>
                        Verified — {c.country} contractor agreement on file ({c.msa})
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ height: 80 }} />
      </div>

      <div style={{
        position:'absolute', left: 0, right: 0, bottom: 88,
        padding: '14px 20px 16px',
        background: 'linear-gradient(180deg, rgba(242,240,232,0) 0%, var(--bone) 32%)',
        zIndex: 25,
      }}>
        <div className="row gap-10">
          <button onClick={() => {}} style={{
            flex: 1, height: 56, borderRadius: 28, border:'1px solid rgba(10,10,10,0.12)',
            background: 'transparent', color: 'var(--ink)',
            fontWeight: 700, fontSize: 14, letterSpacing:'0.04em', textTransform:'uppercase',
          }}>Schedule</button>
          <button onClick={() => setStep('confirm')} style={{
            flex: 1.4, height: 56, borderRadius: 28, border: 0,
            background: 'var(--ink)', color: 'var(--bone)',
            fontWeight: 700, fontSize: 14, letterSpacing:'0.04em', textTransform:'uppercase',
          }}>Run now</button>
        </div>
      </div>

      {step === 'confirm' && (
        <ConfirmSheet
          contractors={runContractors}
          total={total}
          onCancel={() => setStep('preview')}
          onConfirm={() => setStep('processing')}
        />
      )}
    </>
  );
}

function ConfirmSheet({ contractors, total, onCancel, onConfirm }) {
  const trackRef = React.useRef(null);
  const [x, setX] = React.useState(0);
  const [committed, setCommitted] = React.useState(false);

  const onPointerDown = (e) => {
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const max = rect.width - 64;
    const sx = e.clientX;
    const startX = x;
    const move = (ev) => {
      const dx = ev.clientX - sx;
      const next = Math.max(0, Math.min(max, startX + dx));
      setX(next);
      if (next >= max - 4 && !committed) {
        setCommitted(true);
        setTimeout(onConfirm, 220);
      }
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      setX(prev => prev >= (rect.width - 68) ? rect.width - 64 : 0);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <>
      <div className="sheet-backdrop" onClick={onCancel} />
      <div className="sheet">
        <div className="sheet-handle" />
        <div className="label-muted">Confirm payroll run</div>
        <div className="display" style={{ fontSize: 48, marginTop: 8, letterSpacing:'-0.03em' }}>
          $<Numerals text={total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
        </div>
        <div className="meta" style={{ color: 'var(--shadow-c)', marginTop: 4 }}>
          to {contractors.length} contractors · across 8 countries
        </div>

        <div style={{ marginTop: 22, padding: 14, background:'var(--mist)', borderRadius: 14 }}>
          <div className="row between">
            <span className="label-muted">Funding source</span>
            <span className="label">Mercury · ••3047</span>
          </div>
          <div style={{ height: 1, background: 'rgba(10,10,10,0.08)', margin: '12px 0' }} />
          <div className="row between">
            <span className="label-muted">Estimated delivery</span>
            <span className="label">Within 6 hours</span>
          </div>
          <div style={{ height: 1, background: 'rgba(10,10,10,0.08)', margin: '12px 0' }} />
          <div className="row between">
            <span className="label-muted">Total Lifted fees</span>
            <span className="label tabular">$13.50</span>
          </div>
        </div>

        <div ref={trackRef} className="slide-track" style={{ marginTop: 22 }}>
          <div className="slide-track-fill" style={{ width: `${x + 64}px` }} />
          <div className="slide-track-label" style={{ opacity: 1 - x / 200 }}>
            Slide to send  →
          </div>
          <div className="slide-knob"
               onPointerDown={onPointerDown}
               style={{ transform: `translateX(${x}px)`, transition: committed ? 'transform .18s var(--ease)' : 'none' }}>
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 11h16M13 5l6 6-6 6" stroke="#0A0A0A" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        <button onClick={onCancel} style={{
          width:'100%', marginTop: 16, height: 48, border: 0, background: 'transparent',
          color: 'var(--shadow-c)', fontWeight: 600, fontSize: 13, letterSpacing:'0.04em', textTransform:'uppercase',
        }}>Cancel</button>
      </div>
    </>
  );
}

function ProcessingScreen({ contractors, paidIds, payingId, done, total, onClose }) {
  const sentCount = paidIds.length;
  const allDone = sentCount === contractors.length && done;

  return (
    <div style={{
      position:'absolute', inset: 0,
      background: allDone ? 'var(--bone)' : 'var(--sand)',
      display:'flex', flexDirection:'column',
      transition:'background .6s var(--ease)',
    }}>
      <LiftedStatusBar tone={allDone ? 'ink' : 'ink'} />

      <div style={{ flex: 1, display:'flex', flexDirection:'column', padding: '24px 24px 0' }}>

        <div className="label" style={{ color: allDone ? 'var(--shadow-c)' : 'rgba(10,10,10,0.6)' }}>
          {allDone ? 'Run complete' : 'Sending payments'}
        </div>

        <div className="display" style={{ fontSize: 88, marginTop: 16, letterSpacing:'-0.04em', lineHeight: 0.9 }}>
          <Numerals text={String(sentCount).padStart(2,'0')} />
          <span style={{ fontSize: 42, color: 'rgba(10,10,10,0.45)', fontWeight: 600 }}> of {contractors.length}</span>
        </div>
        <div className="meta" style={{ color: 'rgba(10,10,10,0.7)', marginTop: 6 }}>
          {allDone ? `$${total.toLocaleString('en-US',{minimumFractionDigits:2})} sent across 8 countries` : 'each payment cleared on its local rail'}
        </div>

        <div style={{ flex: 1, position:'relative', marginTop: 24 }}>
          <ProcessingDial
            contractors={contractors}
            paidIds={paidIds}
            payingId={payingId}
          />
        </div>

        {allDone ? (
          <div style={{ paddingBottom: 120 }}>
            <div className="hero-ink" style={{ marginBottom: 12 }}>
              <div className="row between" style={{ marginBottom: 10 }}>
                <span className="label" style={{ color: 'rgba(242,240,232,0.55)' }}>Receipt</span>
                <span className="label" style={{ color: 'var(--yellow)' }}>All paid</span>
              </div>
              <div className="display" style={{ fontSize: 36, color: 'var(--bone)', letterSpacing:'-0.03em' }}>
                $<Numerals text={total.toLocaleString('en-US',{minimumFractionDigits:0, maximumFractionDigits:0})} />
              </div>
              <div className="meta" style={{ color:'rgba(242,240,232,0.7)', marginTop: 4 }}>
                Total fees $13.50 · 12 of 12 cleared
              </div>
            </div>
            <button onClick={onClose} style={{
              width:'100%', height: 56, borderRadius: 28, border:0,
              background: 'var(--ink)', color: 'var(--bone)',
              fontWeight: 700, fontSize: 14, letterSpacing:'0.04em', textTransform:'uppercase',
            }}>Back to today</button>
          </div>
        ) : (
          <div style={{ paddingBottom: 120 }}>
            <div className="meta" style={{ color: 'rgba(10,10,10,0.6)', textAlign:'center' }}>
              Each payment is sent on its destination's local rail.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProcessingDial({ contractors, paidIds, payingId }) {
  const n = contractors.length;
  const positions = contractors.map((c, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const angle = Math.PI * (1 - t);
    const r = 42;
    const cx = 50;
    const x = cx + r * Math.cos(angle);
    const y = 80 - r * Math.sin(angle) * 0.9;
    return { x, y, c };
  });
  return (
    <div style={{ position:'absolute', inset: 0 }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" style={{ position:'absolute', inset:0 }}>
        <path d={`M 8 80 A 42 42 0 0 1 92 80`} fill="none" stroke="rgba(10,10,10,0.12)" strokeWidth="0.3" strokeDasharray="0.6 1.6" />
      </svg>
      {positions.map(({ x, y, c }) => {
        const paid = paidIds.includes(c.id);
        const paying = payingId === c.id;
        return (
          <div key={c.id} style={{
            position:'absolute', left: `${x}%`, top: `${y}%`,
            transform: `translate(-50%,-50%) scale(${paying ? 1.15 : paid ? 1.0 : 0.95})`,
            transition:'transform .35s var(--ease)',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', position:'relative',
              background: paid ? 'var(--yellow)' : '#FAF9F2',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'background .35s var(--ease)',
              boxShadow: paying ? '0 0 0 2px var(--ink)' : '0 1px 3px rgba(0,0,0,0.06)',
            }}>
              {paid ? (
                <svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 11l4 4 8-8" stroke="#0A0A0A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <Avatar contractor={c} size="md" />
              )}
              {paying && (
                <div style={{
                  position:'absolute', inset: -6, borderRadius: '50%',
                  border:'1.5px solid var(--ink)', animation:'ringPulse 1s var(--ease) infinite',
                }} />
              )}
            </div>
            <div className="label-muted" style={{
              textAlign:'center', marginTop: 6, fontSize: 9,
              color: paid ? 'var(--ink)' : 'rgba(10,10,10,0.5)',
            }}>
              {c.initials}
            </div>
          </div>
        );
      })}
    </div>
  );
}
