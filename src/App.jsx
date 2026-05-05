import React from 'react';
import { IOSDevice } from './ios-frame.jsx';
import { TodayScreen } from './today.jsx';
import { PayrollFlow } from './payroll.jsx';
import {
  OnboardingFlow, EngageScreen, ContractsScreen, TimesheetsScreen,
  DashboardScreen, MessagesScreen,
} from './screens.jsx';
import {
  useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle,
} from './tweaks-panel.jsx';

const TWEAK_DEFAULTS = {
  accent: '#F5F500',
  density: 'compact',
  reduceMotion: false,
  displayFont: 'Archivo',
};

const FONT_STACKS = {
  Manrope: "'Manrope', system-ui, sans-serif",
  Archivo: "'Archivo', system-ui, sans-serif",
  'Space Grotesk': "'Space Grotesk', system-ui, sans-serif",
};

const ACCENT_OPTS = [
  { value: '#F5F500', label: 'Lifted' },
  { value: '#FF7A1A', label: 'Ember' },
  { value: '#3DDC97', label: 'Mint' },
  { value: '#A6F0FF', label: 'Sky' },
];

const TABS = [
  { key: 'today', label: 'Today', glyph: <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="3.2" fill="currentColor" /><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> },
  { key: 'people', label: 'Contractors', glyph: <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M3 19c1.4-3.6 5-5 8-5s6.6 1.4 8 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg> },
  { key: 'pay', label: 'Pay', glyph: <svg width="22" height="22" viewBox="0 0 22 22"><rect x="3" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="11" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> },
  { key: 'contracts', label: 'Contracts', glyph: <svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 3h9l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" /><path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 12h8M7 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
];

function TabBar({ active, onChange }) {
  return (
    <div className="tabbar" data-screen-label="Tab bar">
      {TABS.map((t) => (
        <button key={t.key} className={'tab' + (active === t.key ? ' active' : '')}
                onClick={() => onChange(t.key)}>
          <span className="tab-glyph">{t.glyph}</span>
          <span>{t.label}</span>
          <span className="tab-dot" />
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = React.useState('today');
  const [overlay, setOverlay] = React.useState(null);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--yellow', t.accent);
    document.documentElement.style.setProperty('--display', FONT_STACKS[t.displayFont] || FONT_STACKS.Manrope);
  }, [t.accent, t.displayFont]);

  const handleTab = (key) => {
    setTab(key);
    if (key === 'today') setOverlay(null);
    else if (key === 'pay') setOverlay('payroll');
    else if (key === 'contracts') setOverlay('contracts');
    else if (key === 'people') setOverlay('engage');
  };

  const closeOverlay = () => { setOverlay(null); setTab('today'); };
  const onNav = (target) => setOverlay(target);

  let content;
  if (overlay === 'payroll') content = <PayrollFlow onClose={closeOverlay} />;
  else if (overlay === 'engage') content = <EngageScreen onClose={closeOverlay} />;
  else if (overlay === 'contracts') content = <ContractsScreen onClose={closeOverlay} />;
  else if (overlay === 'compliance') content = <ContractsScreen onClose={closeOverlay} />;
  else if (overlay === 'timesheets') content = <TimesheetsScreen onClose={closeOverlay} />;
  else if (overlay === 'dashboard') content = <DashboardScreen onClose={closeOverlay} />;
  else if (overlay === 'messages') content = <MessagesScreen onClose={closeOverlay} />;
  else if (overlay === 'onboarding') content = <OnboardingFlow onClose={closeOverlay} />;
  else content = <TodayScreen onNav={onNav} onOpenPayroll={() => setOverlay('payroll')} />;

  const cls = [
    'theme-display',
    `density-${t.density}`,
    t.reduceMotion ? 'reduce-motion' : '',
  ].join(' ').trim();

  const activeTab =
    overlay === 'payroll' ? 'pay' :
    overlay === 'contracts' ? 'contracts' :
    overlay === 'engage' || overlay === 'messages' ? 'people' :
    'today';

  return (
    <div className={cls}>
      <div className="page">
        <div style={{ color: '#A39E85', maxWidth: 280, fontFamily: FONT_STACKS[t.displayFont] }}>
          <div style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#7A7A70', marginBottom: 14
          }}>Lifted · Mobile · iOS</div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.95, color: '#F2F0E8' }}>
            Work with<br />anyone,<br />anywhere,<br />compliantly.
          </div>
          <div style={{ marginTop: 22, fontSize: 13, lineHeight: 1.5, color: '#A39E85', fontFamily: 'Inter, sans-serif' }}>
            Lifted is the all-in-one mobile workspace for distributed teams — run global payroll, sign compliant contracts, log hours, and keep every teammate engaged from one iOS app.
          </div>

          <div style={{
            marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 6,
            fontFamily: 'Inter, sans-serif'
          }}>
            {[
              { key: 'onboarding', label: 'Onboarding' },
              { key: 'payroll', label: 'Payroll' },
              { key: 'contracts', label: 'Contracts' },
              { key: 'compliance', label: 'Compliance' },
              { key: 'timesheets', label: 'Timesheets' },
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'engage', label: 'Engagement' },
              { key: 'messages', label: 'Messages' },
            ].map((c) => (
              <button key={c.key} onClick={() => setOverlay(c.key)} style={{
                height: 26, padding: '0 10px', borderRadius: 13,
                border: '1px solid #3a3a36', background: 'transparent',
                color: '#D8D4C2', fontSize: 11, fontWeight: 500, letterSpacing: '0.02em',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif'
              }}>{c.label}</button>
            ))}
          </div>
        </div>

        <IOSDevice width={402} height={874}>
          <div key={overlay || 'today'} className="screen-enter" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
            {content}
          </div>
          <TabBar active={activeTab} onChange={handleTab} />
        </IOSDevice>
      </div>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Accent" value={t.accent}
                    options={ACCENT_OPTS}
                    onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Display font" value={t.displayFont}
                    options={['Manrope', 'Archivo', 'Space Grotesk']}
                    onChange={(v) => setTweak('displayFont', v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density}
                    options={['compact', 'regular', 'spacious']}
                    onChange={(v) => setTweak('density', v)} />

        <TweakSection label="Motion" />
        <TweakToggle label="Reduce motion" value={t.reduceMotion}
                     onChange={(v) => setTweak('reduceMotion', v)} />
      </TweaksPanel>
    </div>
  );
}
