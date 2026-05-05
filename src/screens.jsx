import React from 'react';
import { CONTRACTORS } from './data.js';
import {
  Avatar, Numerals, SectionLabel, TimeTabs, StatusChip, LiftedStatusBar,
} from './primitives.jsx';

function TopBar({ onClose, label }) {
  return (
    <div className="row between" style={{ padding: '8px 0 16px' }}>
      <button onClick={onClose} style={{
        border: 0, background: 'rgba(10,10,10,0.05)', borderRadius: 18, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600
      }}>
        <svg width="12" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Today
      </button>
    </div>
  );
}

export function OnboardingFlow({ onClose }) {
  const [step, setStep] = React.useState(0);
  const steps = ['Welcome', 'Company', 'Admin', 'Verify', 'Funding', 'Done'];
  const progress = step / (steps.length - 1);

  return (
    <>
      <LiftedStatusBar tone="ink" />
      <div className="lifted-content">
        <TopBar onClose={onClose} label={`Onboarding · ${step + 1}/${steps.length}`} />

        <div style={{ height: 2, background: 'var(--mist)', marginBottom: 24, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress * 100}%`,
            background: 'var(--yellow)', transition: 'width .5s var(--ease)'
          }} />
        </div>

        {step === 0 &&
          <div style={{ minHeight: 580, display: 'flex', flexDirection: 'column' }}>
            <div className="grow" />
            <div className="display" style={{ fontSize: 56, letterSpacing: '-0.035em', lineHeight: 0.95 }}>
              Work with<br />anyone,<br />anywhere,<br />compliantly.
            </div>
            <div className="meta" style={{ marginTop: 24, maxWidth: 280 }}>
              Hire and pay independent contractors in 150+ countries. From your phone.
            </div>
            <div className="grow" />
            <button onClick={() => setStep(1)} style={{
              width: '100%', height: 60, borderRadius: 30, border: 0,
              background: 'var(--ink)', color: 'var(--bone)',
              fontWeight: 700, fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase',
              marginBottom: 24
            }}>Get started</button>
          </div>
        }

        {step === 1 &&
          <FormStep
            heading="What's the legal entity?"
            sub="We'll use this for contracts and tax reporting."
            fields={[
              { label: 'Legal entity name', value: 'Construct Labs, Inc.' },
              { label: 'Country of incorporation', value: 'United States · Delaware' },
              { label: 'Industry', value: 'Software · B2B SaaS' }
            ]}
            cta="Continue"
            onNext={() => setStep(2)}
          />
        }
        {step === 2 &&
          <FormStep
            heading="And about you?"
            sub="Account owner details for KYC."
            fields={[
              { label: 'Full legal name', value: 'Adriana Whitfield' },
              { label: 'Email', value: 'adriana@construct.co' },
              { label: 'Phone', value: '+1 (415) 555-0143' },
              { label: 'Role', value: 'COO' }
            ]}
            cta="Continue"
            onNext={() => setStep(3)}
          />
        }
        {step === 3 && <VerifyStep onNext={() => setStep(4)} />}
        {step === 4 && <FundingStep onNext={() => setStep(5)} />}
        {step === 5 && <OnboardingDone onClose={onClose} />}
      </div>
    </>
  );
}

function FormStep({ heading, sub, fields, cta, onNext }) {
  const [focused, setFocused] = React.useState(0);
  return (
    <div>
      <div className="display-md" style={{ fontSize: 36, letterSpacing: '-0.03em' }}>{heading}</div>
      <div className="meta" style={{ marginTop: 8, color: 'var(--shadow-c)' }}>{sub}</div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {fields.map((f, i) =>
          <div key={i}
            onClick={() => setFocused(i)}
            className="card"
            style={{
              opacity: focused === i ? 1 : 0.5,
              transform: focused === i ? 'scale(1)' : 'scale(0.98)',
              transition: 'all .3s var(--ease)',
              borderColor: focused === i ? 'rgba(10,10,10,0.18)' : 'rgba(10,10,10,0.04)',
              cursor: 'pointer'
            }}>
            <div className="label-muted" style={{ marginBottom: 6 }}>{f.label}</div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{f.value}</div>
          </div>
        )}
      </div>
      <button onClick={onNext} style={{
        width: '100%', height: 56, borderRadius: 28, border: 0, marginTop: 28,
        background: 'var(--ink)', color: 'var(--bone)',
        fontWeight: 700, fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase'
      }}>{cta}</button>
    </div>
  );
}

function VerifyStep({ onNext }) {
  const [done, setDone] = React.useState(false);
  return (
    <div>
      <div className="display-md" style={{ fontSize: 36, letterSpacing: '-0.03em' }}>Verify your business.</div>
      <div className="meta" style={{ marginTop: 8, color: 'var(--shadow-c)' }}>Upload your certificate of incorporation. We'll OCR the details automatically.</div>
      <button onClick={() => setDone(true)} style={{
        width: '100%', minHeight: 220, marginTop: 24,
        border: done ? '0' : '1.5px dashed var(--fog)',
        borderRadius: 20, padding: 22,
        background: done ? '#FAF9F2' : 'transparent',
        color: 'var(--ink)', textAlign: 'left', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16,
        transition: 'all .4s var(--ease)'
      }}>
        {done ?
          <>
            <div className="row gap-10">
              <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="var(--yellow)" /><path d="M6 11l4 4 6-7" stroke="#0A0A0A" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="label">Verified</span>
            </div>
            <div>
              <div className="meta" style={{ color: 'var(--shadow-c)' }}>certificate-of-incorporation.pdf</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>Construct Labs, Inc. · Delaware</div>
              <div className="meta" style={{ color: 'var(--shadow-c)', marginTop: 4 }}>3 pages · DE File 7891234</div>
            </div>
          </> :
          <>
            <div className="label-muted">Required</div>
            <div className="display-md" style={{ fontSize: 22, letterSpacing: '-0.02em' }}>
              Tap to upload<br />certificate of incorporation
            </div>
            <div className="meta" style={{ color: 'var(--shadow-c)' }}>PDF or image, 25 MB max</div>
          </>
        }
      </button>
      <button onClick={onNext} disabled={!done} style={{
        width: '100%', height: 56, borderRadius: 28, border: 0, marginTop: 24,
        background: done ? 'var(--ink)' : 'rgba(10,10,10,0.18)', color: 'var(--bone)',
        fontWeight: 700, fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase',
        cursor: done ? 'pointer' : 'not-allowed'
      }}>Continue</button>
    </div>
  );
}

function FundingStep({ onNext }) {
  return (
    <div>
      <div className="display-md" style={{ fontSize: 36, letterSpacing: '-0.03em' }}>Connect funding.</div>
      <div className="meta" style={{ marginTop: 8, color: 'var(--shadow-c)' }}>
        ACH, SEPA, SWIFT, plus local rails in 150 countries.
      </div>
      <div className="card" style={{ marginTop: 24, padding: 0, overflow: 'hidden' }}>
        {['Mercury · Business checking', 'Brex · Operating account', 'Wire transfer · Manual'].map((label, i) =>
          <div key={i} style={{
            padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: i ? '0.5px solid var(--mist)' : 0
          }}>
            <div className="row gap-12">
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--mist)' }} />
              <div style={{ fontWeight: 600, fontSize: 15 }}>{label}</div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke="var(--shadow-c)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        )}
      </div>
      <button onClick={onNext} style={{
        width: '100%', height: 56, borderRadius: 28, border: 0, marginTop: 24,
        background: 'var(--ink)', color: 'var(--bone)',
        fontWeight: 700, fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase'
      }}>Continue</button>
    </div>
  );
}

function OnboardingDone({ onClose }) {
  return (
    <div>
      <div className="hero-yellow" style={{ paddingBottom: 32 }}>
        <span className="label">Welcome to Lifted</span>
        <div className="display" style={{ fontSize: 88, letterSpacing: '-0.04em', lineHeight: 0.85, marginTop: 22 }}>
          <Numerals text="00" />
        </div>
        <div className="meta" style={{ color: 'rgba(10,10,10,0.7)', marginTop: 6 }}>
          contractors engaged
        </div>
        <div className="display-md" style={{ fontSize: 22, letterSpacing: '-0.02em', marginTop: 22 }}>
          Invite your first.
        </div>
      </div>
      <button onClick={onClose} style={{
        width: '100%', height: 56, borderRadius: 28, border: 0, marginTop: 20,
        background: 'var(--ink)', color: 'var(--bone)',
        fontWeight: 700, fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase'
      }}>Open Today</button>
    </div>
  );
}

const WORLD_PATH_FULL = [
  "M 8 22 L 14 18 L 20 16 L 24 18 L 26 22 L 24 26 L 28 28 L 30 32 L 28 36 L 24 38 L 22 36 L 18 36 L 14 32 L 12 28 L 10 26 Z M 22 40 L 26 42 L 24 46 L 22 44 Z",
  "M 24 40 L 28 42 L 30 46 L 28 48 L 26 46 Z",
  "M 30 50 L 34 48 L 36 52 L 38 58 L 36 64 L 32 68 L 28 64 L 28 58 Z",
  "M 36 14 L 40 12 L 42 16 L 40 20 L 36 18 Z",
  "M 46 22 L 52 20 L 56 22 L 58 26 L 56 30 L 50 30 L 46 28 Z",
  "M 48 36 L 54 34 L 58 36 L 60 42 L 58 50 L 54 56 L 50 58 L 48 54 L 46 46 L 46 40 Z",
  "M 58 32 L 64 30 L 66 34 L 64 38 L 60 38 Z",
  "M 56 18 L 64 16 L 72 18 L 80 20 L 86 24 L 88 30 L 84 34 L 78 34 L 74 32 L 68 32 L 64 30 L 60 28 L 58 26 Z",
  "M 66 36 L 72 36 L 74 42 L 72 46 L 68 46 L 66 42 Z",
  "M 78 44 L 84 44 L 86 48 L 82 50 L 78 48 Z",
  "M 80 56 L 88 56 L 92 60 L 90 64 L 84 66 L 80 64 L 78 60 Z",
].join(' ');

export function EngageScreen({ onClose }) {
  return (
    <>
      <LiftedStatusBar tone="ink" />
      <div className="lifted-content">
        <TopBar onClose={onClose} label="Contractors" />

        <div className="display" style={{ fontSize: 48, letterSpacing: '-0.03em', lineHeight: 0.92 }}>
          Where work<br />happens.
        </div>

        <div className="card" style={{ marginTop: 20, padding: 0, overflow: 'hidden' }}>
          <div className="minimap gmap" style={{ height: 240, position: 'relative' }}>
            <svg viewBox="0 0 100 80" width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block', position: 'absolute', inset: 0 }}>
              <defs>
                <pattern id="gmap-tex" patternUnits="userSpaceOnUse" width="6" height="6">
                  <rect width="6" height="6" fill="#E8EEF4" />
                  <circle cx="1" cy="1" r="0.18" fill="#D6DEE6" />
                  <circle cx="4" cy="3" r="0.14" fill="#D6DEE6" />
                </pattern>
              </defs>
              <rect width="100" height="80" fill="#AAD3DF" />
              <path d={WORLD_PATH_FULL} fill="url(#gmap-tex)" />
              <path d={WORLD_PATH_FULL} fill="none" stroke="#C7CDD3" strokeWidth="0.22" />
              <g stroke="#BFC4CA" strokeWidth="0.15" strokeDasharray="0.6 0.4" fill="none" opacity="0.85">
                <path d="M 10 22 L 26 22" />
                <path d="M 16 30 L 26 32" />
                <path d="M 32 50 L 32 64" />
                <path d="M 50 22 L 52 30" />
                <path d="M 54 22 L 54 28" />
                <path d="M 50 38 L 56 40" />
                <path d="M 50 46 L 58 48" />
                <path d="M 64 18 L 66 30" />
                <path d="M 76 20 L 76 32" />
              </g>
              <g stroke="#FFFFFF" strokeWidth="0.35" fill="none" opacity="0.7">
                <path d="M 14 24 Q 22 28 26 32" />
                <path d="M 32 56 L 34 62" />
                <path d="M 50 24 L 56 26" />
                <path d="M 50 38 L 54 50" />
                <path d="M 60 22 Q 70 22 80 24" />
                <path d="M 70 38 L 72 44" />
              </g>
              <g fill="#6B7480" fontFamily="system-ui, -apple-system, sans-serif" fontSize="2" fontWeight="500" textAnchor="middle" letterSpacing="0.08">
                <text x="18" y="28">USA</text>
                <text x="32" y="58">BRAZIL</text>
                <text x="52" y="42">AFRICA</text>
                <text x="70" y="26">ASIA</text>
                <text x="51" y="25">EU</text>
                <text x="85" y="61">AUSTRALIA</text>
              </g>
              <g fill="#7AA8B8" fontFamily="system-ui, -apple-system, sans-serif" fontSize="1.8" fontStyle="italic" textAnchor="middle" letterSpacing="0.1">
                <text x="78" y="50">INDIAN OCEAN</text>
                <text x="14" y="56">PACIFIC</text>
                <text x="42" y="20">ATLANTIC</text>
              </g>
            </svg>

            <div style={{
              position: 'absolute', top: 10, left: 10, right: 50,
              background: '#FFFFFF', borderRadius: 6,
              boxShadow: '0 1px 4px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
              fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 11, color: '#5F6368',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" stroke="#5F6368" strokeWidth="2" />
                <path d="M16 16L21 21" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Search team locations</span>
              <div style={{ width: 1, height: 14, background: '#E0E0E0', flexShrink: 0 }} />
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#4285F4" style={{ flexShrink: 0 }}>
                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
            </div>

            <div style={{
              position: 'absolute', right: 10, top: 10,
              background: '#FFFFFF', borderRadius: 4,
              boxShadow: '0 1px 4px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              <div style={{ width: 28, height: 28, display:'flex', alignItems:'center', justifyContent:'center', color: '#5F6368', fontSize: 16, borderBottom: '1px solid #E8E8E8', fontWeight: 300 }}>+</div>
              <div style={{ width: 28, height: 28, display:'flex', alignItems:'center', justifyContent:'center', color: '#5F6368', fontSize: 16, fontWeight: 300 }}>−</div>
            </div>

            {CONTRACTORS.map((c) => (
              <div key={c.id} style={{
                position: 'absolute',
                left: `${c.pinX}%`, top: `${c.pinY}%`,
                transform: 'translate(-50%, -100%)',
                width: 24, height: 30,
                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.25))',
              }}>
                <svg width="24" height="30" viewBox="0 0 24 30" style={{ position: 'absolute', inset: 0 }}>
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0z" fill="#0A0A0A" />
                  <circle cx="12" cy="12" r="9" fill="#FFFFFF" />
                </svg>
                <div style={{ position: 'absolute', left: 3, top: 3, width: 18, height: 18, borderRadius: '50%', overflow: 'hidden' }}>
                  <Avatar contractor={c} size="sm" />
                </div>
              </div>
            ))}
            <div style={{
              position: 'absolute',
              left: `${CONTRACTORS[0].pinX}%`, top: `${CONTRACTORS[0].pinY}%`,
              transform: 'translate(-50%, -100%)',
              width: 34, height: 42, zIndex: 3,
              filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.35))',
            }}>
              <svg width="34" height="42" viewBox="0 0 24 30" style={{ position: 'absolute', inset: 0 }}>
                <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0z" fill="#F4C842" />
                <circle cx="12" cy="12" r="9" fill="#FFFFFF" />
              </svg>
              <div style={{ position: 'absolute', left: 5, top: 5, width: 24, height: 24, borderRadius: '50%', overflow: 'hidden' }}>
                <Avatar contractor={CONTRACTORS[0]} size="sm" />
              </div>
            </div>

            <div style={{
              position: 'absolute', bottom: 4, right: 4,
              fontSize: 9, color: '#5F6368',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 0 2px #FFFFFF',
            }}>
              Map data ©2024
            </div>
            <div style={{
              position: 'absolute', bottom: 4, left: 8,
              fontFamily: '"Product Sans", "Google Sans", system-ui, sans-serif',
              fontSize: 14, fontWeight: 500,
              letterSpacing: '-0.01em',
            }}>
              <span style={{ color: '#4285F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC04' }}>o</span>
              <span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
            </div>
          </div>
          <div style={{ padding: 18 }}>
            <div className="meta" style={{ color: 'var(--shadow-c)' }}>9 contractors · 8 countries · 6 timezones</div>
            <div className="display-md" style={{ fontSize: 22, letterSpacing: '-0.02em', marginTop: 4 }}>
              Maya is online in Mexico City.
            </div>
          </div>
        </div>

        <div className="hero-yellow" style={{ marginTop: 12 }}>
          <span className="label">Spend · April</span>
          <div className="display tabular" style={{ fontSize: 64, letterSpacing: '-0.04em', lineHeight: 0.85, marginTop: 18 }}>
            $<Numerals text="142,308" />
          </div>
          <div className="row between" style={{ marginTop: 10 }}>
            <span className="meta" style={{ color: 'rgba(10,10,10,0.7)' }}>vs March $120,180</span>
            <span className="label tabular">+18.4%</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <div className="card">
            <span className="label-muted">Active</span>
            <div className="display-md tabular" style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 6 }}>
              <Numerals text="16" />
            </div>
            <div className="meta" style={{ color: 'var(--shadow-c)', marginTop: 4 }}>contractors</div>
          </div>
          <div className="card">
            <span className="label-muted">Compliant</span>
            <div className="display-md tabular" style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 6 }}>
              <Numerals text="12" /><span style={{ fontSize: 18, color: 'var(--shadow-c)' }}>/16</span>
            </div>
            <div className="row gap-4" style={{ marginTop: 4 }}>
              <span className="dot success" /><span className="meta" style={{ color: 'var(--shadow-c)' }}>3 pending · 1 reject</span>
            </div>
          </div>
          <div className="card">
            <span className="label-muted">Avg days to pay</span>
            <div className="display-md tabular" style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 6 }}>
              <Numerals text="1.2" />
            </div>
            <svg viewBox="0 0 60 18" width="100%" height="22" style={{ marginTop: 6 }} preserveAspectRatio="none">
              <polyline points="0,14 10,12 20,11 30,8 40,6 50,5 60,4" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
          </div>
          <div className="card">
            <span className="label-muted">Signed (30d)</span>
            <div className="display-md tabular" style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 6 }}>
              <Numerals text="08" />
            </div>
            <svg viewBox="0 0 60 18" width="100%" height="22" style={{ marginTop: 6 }} preserveAspectRatio="none">
              <polyline points="0,14 10,10 20,12 30,8 40,9 50,5 60,3" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
          </div>
        </div>

        <div style={{ marginTop: 32, fontSize: 48, letterSpacing: '-0.03em', lineHeight: 0.95 }} className="display">
          Bring someone<br />onto the roster.
        </div>

        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="hero-sand" style={{ border: 0, textAlign: 'left', cursor: 'pointer' }}>
            <div className="row between" style={{ marginBottom: 16, alignItems: 'center' }}>
              <span className="label">Direct invite</span>
              <span style={{ fontSize: 28, lineHeight: 1, fontWeight: 500, color: 'var(--ink)' }} aria-hidden="true">→</span>
            </div>
            <div className="display-md" style={{ fontSize: 28, letterSpacing: '-0.025em' }}>
              I have someone in mind.
            </div>
            <div className="meta" style={{ marginTop: 8, color: 'rgba(10,10,10,0.7)' }}>
              Add their details and we'll generate a locally compliant contract.
            </div>
          </button>

          <button className="card" style={{ textAlign: 'left', cursor: 'pointer' }}>
            <div className="row between" style={{ marginBottom: 14 }}>
              <span className="label-muted">Marketplace</span>
              <span className="label-muted"></span>
            </div>
            <div className="display-md" style={{ fontSize: 24, letterSpacing: '-0.02em' }}>
              Help me find talent.
            </div>
            <div className="meta" style={{ marginTop: 6, color: 'var(--shadow-c)' }}>
              Browse vetted contractors in 40+ roles.
            </div>
          </button>
        </div>

        <SectionLabel count={142}>Marketplace preview</SectionLabel>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[{ id: 'rin', name: 'Rin Sato', role: 'iOS Engineer', location: 'Tokyo · JP', rate: '$95/hr', bg: '#A39E85', initials: 'RS', verified: true, available: 'Now' },
            { id: 'omar', name: 'Omar Haddad', role: 'Brand Designer', location: 'Beirut · LB', rate: '$72/hr', bg: '#7C5A3A', initials: 'OH', fg: '#F5EFE3', verified: true, available: 'Tue' },
            { id: 'lena', name: 'Lena Kowalski', role: 'Product Manager', location: 'Warsaw · PL', rate: '$110/hr', bg: '#4A5547', initials: 'LK', fg: '#E8E4DA', verified: true, available: 'Mon' },
            { id: 'mira', name: 'Mira Patel', role: 'UX Researcher', location: 'Bengaluru · IN', rate: '$58/hr', bg: '#B5B4B0', initials: 'MP', verified: false, available: 'Now' },
            { id: 'felix', name: 'Felix Mensah', role: 'Backend Engineer', rate: '$88/hr', bg: '#7A7A70', initials: 'FM', fg: '#F5EFE3', verified: true, available: 'May 5', location: 'Accra · GH' },
            { id: 'eva', name: 'Eva Lindqvist', role: 'Content Strategist', location: 'Stockholm · SE', rate: '$78/hr', bg: '#A39E85', initials: 'EL', verified: true, available: 'Now' }
          ].map((c) =>
            <button key={c.id} style={{
              textAlign: 'left', border: 0, padding: 0, background: 'transparent', cursor: 'pointer'
            }}>
              <div className="card" style={{ padding: 14, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="row between" style={{ alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: c.bg, color: c.fg || '#0A0A0A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--display)', fontWeight: 700, fontSize: 16, letterSpacing: 0
                  }}>{c.initials}</div>
                  {c.verified &&
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 3,
                      padding: '3px 6px', borderRadius: 999,
                      background: 'var(--mist)', color: 'var(--ink)',
                      fontSize: 9, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase'
                    }}>
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6.5L5 9.5L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Vetted
                    </div>
                  }
                </div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                  {c.name}
                </div>
                <div className="meta" style={{ color: 'var(--ink)', marginTop: 2 }}>{c.role}</div>
                <div className="meta" style={{ color: 'var(--shadow-c)', marginTop: 4 }}>{c.location}</div>

                <div className="grow" />

                <div className="row between" style={{ marginTop: 14, alignItems: 'center' }}>
                  <div className="tabular" style={{
                    fontFamily: 'var(--display)', fontWeight: 700, fontSize: 14,
                    letterSpacing: '-0.01em', color: 'var(--ink)'
                  }}>{c.rate}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: c.available === 'Now' ? '#3F7A3F' : 'var(--shadow-c)'
                    }} />
                    <span className="meta" style={{ color: 'var(--shadow-c)', fontSize: 11 }}>
                      {c.available}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          )}
        </div>

        <button style={{
          marginTop: 14, width: '100%',
          background: 'transparent', border: '1px solid var(--shadow-c)', borderRadius: 999,
          padding: '14px 16px', cursor: 'pointer',
          fontFamily: 'var(--display)', fontWeight: 600, fontSize: 13, letterSpacing: '-0.005em',
          color: 'var(--ink)'
        }}>
          Browse 142 contractors →
        </button>

        <div style={{ height: 24 }} />
      </div>
    </>
  );
}

export function ContractsScreen({ onClose }) {
  return (
    <>
      <LiftedStatusBar tone="ink" />
      <div className="lifted-content">
        <TopBar onClose={onClose} label="Contracts" />

        <div className="display" style={{ fontSize: 56, letterSpacing: '-0.035em', lineHeight: 0.92 }}>
          Contracts.
        </div>

        <TimeTabs value="active" onChange={() => {}} items={[
          { key: 'active', label: 'Active', count: 12 },
          { key: 'draft', label: 'Draft', count: 3 },
          { key: 'archive', label: 'Archive', count: 47 }
        ]} />

        <div className="hero-yellow" style={{ marginTop: 6 }}>
          <span className="label">Awaiting signature</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 14 }}>
            <span className="display tabular" style={{ fontSize: 80, letterSpacing: '-0.04em', lineHeight: 0.85 }}>
              <Numerals text="02" />
            </span>
            <span className="label">days</span>
            <span className="display tabular" style={{ fontSize: 56, letterSpacing: '-0.03em', lineHeight: 0.85 }}>
              <Numerals text="04" />
            </span>
            <span className="label">hrs</span>
          </div>
          <div className="meta" style={{ color: 'rgba(10,10,10,0.7)', marginTop: 10 }}>
            to Maya Chen · MX Independent Services
          </div>
          <div className="rail" style={{ marginTop: 18 }}>
            <div className="rail-step done" />
            <div className="rail-step done" />
            <div className="rail-step now" />
            <div className="rail-step" />
          </div>
          <div className="row between" style={{ marginTop: 6 }}>
            <span className="label-muted" style={{ fontSize: 9 }}>Sent</span>
            <span className="label-muted" style={{ fontSize: 9 }}>Opened</span>
            <span className="label" style={{ fontSize: 9 }}>Signing</span>
            <span className="label-muted" style={{ fontSize: 9 }}>Signed</span>
          </div>
        </div>

        <SectionLabel count={4}>Recent</SectionLabel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { c: CONTRACTORS[3], status: 'Signed', tone: 'success', stage: 4, daysOut: 0, dayLabel: 'Apr 18',
              client: 'Atlas Health', title: 'iOS engineering · MSA 049', currentCost: 14400, estimatedCost: 21600, contractorIds: ['priya', 'koen'], next: 'Sprint 7 kickoff · May 5' },
            { c: CONTRACTORS[1], status: 'Awaiting countersig.', tone: 'warning', stage: 3, daysOut: 2, dayLabel: 'Apr 21',
              client: 'Atlas Health', title: 'AR contractor · MSA 042', currentCost: 6800, estimatedCost: 27200, contractorIds: ['carlos'], next: 'Countersignature pending' },
            { c: CONTRACTORS[6], status: 'Opened', tone: 'info', stage: 2, daysOut: 4, dayLabel: 'Apr 19',
              client: 'Lighthouse Capital', title: 'NL contractor · MSA 038', currentCost: 7320, estimatedCost: 29280, contractorIds: ['koen'], next: 'Awaiting signature · Maya Chen' },
            { c: CONTRACTORS[2], status: 'Sent', tone: 'ink', stage: 1, daysOut: 6, dayLabel: 'Apr 22',
              client: 'Cedar Books', title: 'PE ISA · MSA 051', currentCost: 0, estimatedCost: 18000, contractorIds: ['amaru'], next: 'Sent — awaiting open' }
          ].map((row, i) => {
            const contractors = row.contractorIds.map((id) => CONTRACTORS.find((c) => c.id === id)).filter(Boolean);
            return (
              <div key={i} className="card" style={{ padding: 16 }}>
                <div className="row between" style={{ alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="label-muted" style={{ marginBottom: 4 }}>{row.client}</div>
                    <div style={{
                      fontFamily: 'var(--display)', fontWeight: 700, fontSize: 18,
                      letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)'
                    }}>
                      {row.title}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, marginLeft: 12 }}>
                    <StatusChip tone={row.tone}>{row.status}</StatusChip>
                  </div>
                </div>

                <div className="row" style={{ marginTop: 14, gap: 18 }}>
                  <div style={{ flex: 1 }}>
                    <div className="label-muted" style={{ fontSize: 9 }}>Current</div>
                    <div className="tabular" style={{
                      fontFamily: 'var(--display)', fontWeight: 700, fontSize: 20,
                      letterSpacing: '-0.02em', color: 'var(--ink)', marginTop: 2
                    }}>
                      $<Numerals text={row.currentCost.toLocaleString()} />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="label-muted" style={{ fontSize: 9 }}>Estimated</div>
                    <div className="tabular" style={{
                      fontFamily: 'var(--display)', fontWeight: 600, fontSize: 20,
                      letterSpacing: '-0.02em', color: 'var(--shadow-c)', marginTop: 2
                    }}>
                      $<Numerals text={row.estimatedCost.toLocaleString()} />
                    </div>
                  </div>
                </div>

                <div className="rail" style={{ marginTop: 12 }}>
                  {[1, 2, 3, 4].map((n) =>
                    <div key={n} className={`rail-step ${n < row.stage ? 'done' : n === row.stage ? 'now' : ''}`} />
                  )}
                </div>
                <div className="row between" style={{ marginTop: 6 }}>
                  <span className="label-muted" style={{ fontSize: 9 }}>Sent</span>
                  <span className="label-muted" style={{ fontSize: 9 }}>Opened</span>
                  <span className="label-muted" style={{ fontSize: 9, color: row.stage === 3 ? 'var(--ink)' : undefined }}>Signing</span>
                  <span className="label-muted" style={{ fontSize: 9, color: row.stage === 4 ? 'var(--ink)' : undefined }}>Signed</span>
                </div>

                <div className="row between" style={{ marginTop: 14, alignItems: 'center' }}>
                  <div style={{ display: 'flex' }}>
                    {contractors.map((c, ci) =>
                      <div key={c.id} style={{
                        marginLeft: ci ? -8 : 0,
                        border: '2px solid var(--bone)', borderRadius: '50%'
                      }}>
                        <Avatar contractor={c} size="sm" />
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 0, flex: 1, marginLeft: 12 }}>
                    <div className="label-muted" style={{ fontSize: 9 }}>Next · {row.dayLabel}</div>
                    <div className="meta" style={{
                      color: 'var(--ink)', marginTop: 2,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>
                      {row.next}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 24 }} />
      </div>
    </>
  );
}

export function TimesheetsScreen({ onClose }) {
  const [approved, setApproved] = React.useState([]);
  const items = [
    { c: CONTRACTORS[0], hours: 38, amount: 4250, deadline: '14h 32m', sub: 'Apr 15-19 · weekly cycle' },
    { c: CONTRACTORS[3], hours: 42, amount: 5400, deadline: '1d 02h', sub: 'Apr 15-19 · weekly cycle' },
    { c: CONTRACTORS[4], hours: 36, amount: 3120, deadline: '1d 02h', sub: 'Apr 15-19 · weekly cycle' },
    { c: CONTRACTORS[5], hours: 18, amount: 2280, deadline: '1d 02h', sub: 'Milestone 03 of 06' }
  ];

  return (
    <>
      <LiftedStatusBar tone="ink" />
      <div className="lifted-content">
        <TopBar onClose={onClose} label="Timesheets" />

        <div className="display" style={{ fontSize: 48, letterSpacing: '-0.03em', lineHeight: 0.92 }}>
          Approve<br />before Sunday.
        </div>
        <div className="meta" style={{ marginTop: 12, color: 'var(--shadow-c)' }}>
          Swipe right to approve. Tap to review.
        </div>

        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((row, i) =>
            <SwipeCard
              key={i}
              row={row}
              approved={approved.includes(i)}
              onApprove={() => setApproved((prev) => prev.includes(i) ? prev : [...prev, i])}
              hero={i === 0} />
          )}
        </div>

        {approved.length > 0 &&
          <div className="card-mist card" style={{ marginTop: 20, animation: 'fadeIn .4s var(--ease)' }}>
            <span className="label-muted">{approved.length} approved this session</span>
            <div className="display-md tabular" style={{ fontSize: 32, letterSpacing: '-0.025em', marginTop: 8 }}>
              $<Numerals text={approved.reduce((a, idx) => a + items[idx].amount, 0).toLocaleString('en-US')} />
            </div>
            <div className="meta" style={{ color: 'var(--shadow-c)' }}>routed to next payroll run</div>
          </div>
        }

        <div style={{ height: 24 }} />
      </div>
    </>
  );
}

function SwipeCard({ row, approved, onApprove, hero }) {
  const [dx, setDx] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const onPointerDown = (e) => {
    if (approved) return;
    e.preventDefault();
    setDragging(true);
    const sx = e.clientX;
    const move = (ev) => {
      setDx(Math.max(0, Math.min(180, ev.clientX - sx)));
    };
    const up = (ev) => {
      const finalDx = Math.max(0, Math.min(180, ev.clientX - sx));
      setDragging(false);
      if (finalDx > 100) {
        onApprove();
        setDx(0);
      } else {
        setDx(0);
      }
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const cardClass = hero && !approved ? 'hero-yellow' : 'card';
  return (
    <div className="swipe-row" style={{ position: 'relative' }}>
      <div className="swipe-action">
        <span className="row gap-6">
          <svg width="18" height="18" viewBox="0 0 22 22"><path d="M5 11l4 4 8-8" stroke="#0A0A0A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Approve
        </span>
      </div>
      <div onPointerDown={onPointerDown}
        className={cardClass}
        style={{
          position: 'relative',
          transform: `translateX(${approved ? -340 : dx}px)`,
          opacity: approved ? 0 : 1,
          transition: dragging ? 'none' : 'transform .35s var(--ease), opacity .35s var(--ease)',
          padding: 16, cursor: 'grab',
          borderRadius: 'var(--card-radius)'
        }}>
        <div className="row gap-12">
          <Avatar contractor={row.c} size="md" />
          <div className="grow col gap-4">
            <div className="meta" style={{ color: hero ? 'rgba(10,10,10,0.7)' : 'var(--shadow-c)' }}>to {row.c.name}</div>
            <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>
              {row.hours}h · ${row.amount.toLocaleString('en-US')}
            </div>
            <div className="meta" style={{ color: hero ? 'rgba(10,10,10,0.7)' : 'var(--shadow-c)' }}>
              {row.sub}
            </div>
          </div>
          <div className="col" style={{ alignItems: 'flex-end' }}>
            <span className="label-muted" style={{ color: hero ? 'rgba(10,10,10,0.55)' : 'var(--shadow-c)' }}>cutoff</span>
            <span className="label tabular" style={{ marginTop: 4 }}>{row.deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardScreen({ onClose }) {
  return (
    <>
      <LiftedStatusBar tone="ink" />
      <div className="lifted-content">
        <TopBar onClose={onClose} label="Dashboard" />

        <div className="display" style={{ fontSize: 56, letterSpacing: '-0.035em', lineHeight: 0.92 }}>
          Where work<br />happens.
        </div>

        <div className="card" style={{ marginTop: 20, padding: 0, overflow: 'hidden' }}>
          <div className="minimap" style={{ height: 220 }}>
            <svg viewBox="0 0 100 80" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
              <rect width="100" height="80" fill="#C8C4B0" />
              <path d={WORLD_PATH_FULL} fill="#A39E85" />
              <g stroke="#B5B4B0" strokeWidth="0.2" opacity="0.5">
                <line x1="0" y1="20" x2="100" y2="20" />
                <line x1="0" y1="40" x2="100" y2="40" />
                <line x1="0" y1="60" x2="100" y2="60" />
              </g>
            </svg>
            {CONTRACTORS.map((c) =>
              <div key={c.id} className="map-pin"
                style={{ left: `${c.pinX}%`, top: `${c.pinY}%`, background: 'var(--ink)' }}>
                <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', overflow: 'hidden' }}>
                  <Avatar contractor={c} size="sm" />
                </div>
              </div>
            )}
            <div className="map-pin"
              style={{
                left: `${CONTRACTORS[0].pinX}%`, top: `${CONTRACTORS[0].pinY}%`,
                background: 'var(--yellow)', width: 32, height: 32, zIndex: 2
              }}>
              <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', overflow: 'hidden' }}>
                <Avatar contractor={CONTRACTORS[0]} size="sm" />
              </div>
            </div>
          </div>
          <div style={{ padding: 18 }}>
            <div className="meta" style={{ color: 'var(--shadow-c)' }}>9 contractors · 8 countries · 6 timezones</div>
            <div className="display-md" style={{ fontSize: 22, letterSpacing: '-0.02em', marginTop: 4 }}>
              Maya is online in Mexico City.
            </div>
          </div>
        </div>

        <div className="hero-yellow" style={{ marginTop: 12 }}>
          <span className="label">Spend · April</span>
          <div className="display tabular" style={{ fontSize: 64, letterSpacing: '-0.04em', lineHeight: 0.85, marginTop: 18 }}>
            $<Numerals text="142,308" />
          </div>
          <div className="row between" style={{ marginTop: 10 }}>
            <span className="meta" style={{ color: 'rgba(10,10,10,0.7)' }}>vs March $120,180</span>
            <span className="label tabular">+18.4%</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <div className="card">
            <span className="label-muted">Active</span>
            <div className="display-md tabular" style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 6 }}>
              <Numerals text="16" />
            </div>
            <div className="meta" style={{ color: 'var(--shadow-c)', marginTop: 4 }}>contractors</div>
          </div>
          <div className="card">
            <span className="label-muted">Compliant</span>
            <div className="display-md tabular" style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 6 }}>
              <Numerals text="12" /><span style={{ fontSize: 18, color: 'var(--shadow-c)' }}>/16</span>
            </div>
            <div className="row gap-4" style={{ marginTop: 4 }}>
              <span className="dot success" /><span className="meta" style={{ color: 'var(--shadow-c)' }}>3 pending · 1 reject</span>
            </div>
          </div>
          <div className="card">
            <span className="label-muted">Avg days to pay</span>
            <div className="display-md tabular" style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 6 }}>
              <Numerals text="1.2" />
            </div>
            <svg viewBox="0 0 60 18" width="100%" height="22" style={{ marginTop: 6 }} preserveAspectRatio="none">
              <polyline points="0,14 10,12 20,11 30,8 40,6 50,5 60,4" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
          </div>
          <div className="card">
            <span className="label-muted">Signed (30d)</span>
            <div className="display-md tabular" style={{ fontSize: 36, letterSpacing: '-0.03em', marginTop: 6 }}>
              <Numerals text="08" />
            </div>
            <svg viewBox="0 0 60 18" width="100%" height="22" style={{ marginTop: 6 }} preserveAspectRatio="none">
              <polyline points="0,14 10,10 20,12 30,8 40,9 50,5 60,3" fill="none" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
          </div>
        </div>

        <div style={{ height: 24 }} />
      </div>
    </>
  );
}

export function MessagesScreen({ onClose }) {
  const [thread, setThread] = React.useState(null);

  if (thread) return <MessageThread contractor={thread} onClose={() => setThread(null)} />;

  const threads = [
    { c: CONTRACTORS[0], preview: 'Got the comps — sending updates by EOD', time: '12m', pending: true },
    { c: CONTRACTORS[3], preview: 'Pushed the build, please review', time: '1h', pending: true },
    { c: CONTRACTORS[4], preview: 'Re: April milestone — looks good', time: '3h', pending: false },
    { c: CONTRACTORS[1], preview: 'Sent the AFIP form, it should be...', time: 'Yesterday', pending: false },
    { c: CONTRACTORS[2], preview: 'Thanks Adriana, looking forward.', time: '2d', pending: false }
  ];

  return (
    <>
      <LiftedStatusBar tone="ink" />
      <div className="lifted-content">
        <TopBar onClose={onClose} label="Messages" />

        <div className="display" style={{ fontSize: 64, letterSpacing: '-0.04em', lineHeight: 0.9 }}>
          You have<br /><Numerals text="07" /><br />unread.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 28 }}>
          {threads.map((t, i) =>
            <button key={t.c.id} onClick={() => setThread(t.c)} style={{
              border: 0, background: 'transparent', textAlign: 'left',
              padding: '14px 0', cursor: 'pointer',
              borderTop: i ? '0.5px solid var(--mist)' : 0,
              display: 'flex', gap: 12, alignItems: 'center'
            }}>
              <Avatar contractor={t.c} size="md" />
              <div className="grow col gap-4">
                <div className="row between">
                  <div className="meta" style={{ color: 'var(--shadow-c)' }}>to {t.c.name}</div>
                  <div className="label-muted" style={{ fontSize: 10 }}>{t.time}</div>
                </div>
                <div style={{ fontSize: 14, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t.preview}
                </div>
              </div>
              {t.pending && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--yellow)' }} />}
            </button>
          )}
        </div>

        <div style={{ height: 24 }} />
      </div>
    </>
  );
}

function MessageThread({ contractor, onClose }) {
  return (
    <>
      <LiftedStatusBar tone="ink" />
      <div className="lifted-content" style={{ paddingBottom: 110 }}>
        <div className="row between" style={{ padding: '8px 0 16px' }}>
          <button onClick={onClose} style={{
            border: 0, background: 'rgba(10,10,10,0.05)', borderRadius: 18, padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600
          }}>
            <svg width="12" height="14" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Inbox
          </button>
        </div>

        <div className="row gap-12" style={{ marginBottom: 18 }}>
          <Avatar contractor={contractor} size="lg" />
          <div className="col gap-4">
            <div className="meta" style={{ color: 'var(--shadow-c)' }}>to {contractor.name}</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{contractor.role}</div>
          </div>
        </div>

        <div className="card-mist card" style={{ marginBottom: 20 }}>
          <div className="row between">
            <span className="label-muted">Pinned · Timesheet</span>
            <span className="label tabular">$4,250.00</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, marginTop: 6 }}>Apr 15–19 · 38 hours</div>
          <div className="row gap-8" style={{ marginTop: 10 }}>
            <button style={{
              flex: 1, height: 36, border: 0, borderRadius: 18,
              background: 'var(--ink)', color: 'var(--bone)',
              fontWeight: 600, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase'
            }}>Approve</button>
            <button style={{
              flex: 1, height: 36, border: '1px solid rgba(10,10,10,0.1)', borderRadius: 18,
              background: 'transparent', color: 'var(--ink)',
              fontWeight: 600, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase'
            }}>Request changes</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Bubble side="them">Hi Adriana — sent the timesheet. Long week on the new comps.</Bubble>
          <Bubble side="them">Let me know if anything looks off.</Bubble>
          <SystemEvent>You opened the timesheet · 11:42</SystemEvent>
          <Bubble side="me">Looks great. About to approve — quick q on the 19th, the 9.5h block.</Bubble>
          <Bubble side="them">Pairing with Priya on the export flow.</Bubble>
          <Bubble side="me">Perfect. Approving now.</Bubble>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 88,
        padding: '10px 14px',
        background: 'rgba(242,240,232,0.94)',
        backdropFilter: 'blur(20px)',
        borderTop: '0.5px solid var(--mist)',
        display: 'flex', alignItems: 'center', gap: 8, zIndex: 25
      }}>
        <button style={{ width: 36, height: 36, border: 0, borderRadius: 18, background: 'var(--mist)' }}>＋</button>
        <div style={{
          flex: 1, height: 36, borderRadius: 18, background: '#FAF9F2',
          display: 'flex', alignItems: 'center', padding: '0 14px',
          color: 'var(--shadow-c)', fontSize: 14
        }}>Message Maya…</div>
        <button style={{ width: 36, height: 36, border: 0, borderRadius: 18, background: 'var(--ink)', color: 'var(--bone)' }}>↑</button>
      </div>
    </>
  );
}

function Bubble({ side, children }) {
  const me = side === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '78%', padding: '10px 14px', borderRadius: 18,
        background: me ? 'var(--ink)' : '#FAF9F2',
        color: me ? 'var(--bone)' : 'var(--ink)',
        fontSize: 14, lineHeight: 1.4,
        borderBottomRightRadius: me ? 6 : 18,
        borderBottomLeftRadius: me ? 18 : 6
      }}>{children}</div>
    </div>
  );
}

function SystemEvent({ children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
      <div className="label-muted" style={{ fontSize: 10 }}>{children}</div>
    </div>
  );
}
