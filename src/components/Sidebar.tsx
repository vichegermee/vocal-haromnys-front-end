import { useEffect, useState } from 'react';
import { fetchEvents, type EventItem } from '../api/events';
import { ACCENT_PAIR } from '../constants';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

function formatEventDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

const COLLAPSED_SIZE = 52;
const PANEL_WIDTH = 352.8;

export function Sidebar() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchEvents('upcoming').then(setEvents);
  }, []);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: 'fixed',
        top: 90,
        right: 0,
        zIndex: 30,
        width: expanded ? PANEL_WIDTH : COLLAPSED_SIZE,
        maxHeight: 'calc(100vh - 110px)',
        overflow: 'hidden',
        borderRadius: '24px 0 0 24px',
        background: 'var(--bg)',
        boxShadow: expanded ? '-8px 8px 32px rgba(21,33,61,0.2)' : '0 1px 2px rgba(21,33,61,0.14)',
        transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease',
      }}
    >
      <div
        aria-hidden={expanded}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: COLLAPSED_SIZE,
          height: COLLAPSED_SIZE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--coral)',
          borderRadius: '24px 0 0 24px',
          opacity: expanded ? 0 : 1,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 5h11a3 3 0 0 1 3 3v10.5a1.5 1.5 0 0 1-2.5 1.12L15 18H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            stroke="var(--text-on-dark)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M7 9.5h8M7 13h5" stroke="var(--text-on-dark)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      <div
        style={{
          width: PANEL_WIDTH,
          padding: '35.2px 26.4px',
          maxHeight: 'calc(100vh - 110px)',
          overflowY: 'auto',
          opacity: expanded ? 1 : 0,
          transition: 'opacity 0.25s ease',
          transitionDelay: expanded ? '0.1s' : '0s',
        }}
      >
        <h6 className="eyebrow" style={{ color: 'var(--teal)', fontSize: 12 }}>Actualités</h6>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}>
          {events.map((ev, i) => (
            <div key={ev.id} className="card-dark" style={{ padding: 17.6, borderRadius: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT_PAIR[i % 2], marginBottom: 6 }}>
                {formatEventDate(ev.eventDate)}
              </div>
              <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 14, lineHeight: 1.3 }}>{ev.title}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
