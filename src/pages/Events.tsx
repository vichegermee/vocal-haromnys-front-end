import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents, type EventItem } from '../api/events';
import { ACCENT_PAIR } from '../constants';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

function formatEventDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

/** The overview grid gets a one-line teaser; the full text lives in the "En détail" section below. */
function firstSentence(text: string): string {
  const end = text.indexOf('. ');
  return end === -1 ? text : text.slice(0, end + 1);
}

export function Events() {
  const [upcoming, setUpcoming] = useState<EventItem[]>([]);
  const [past, setPast] = useState<EventItem[]>([]);

  useEffect(() => {
    fetchEvents('upcoming').then(setUpcoming);
    fetchEvents('past').then(setPast);
  }, []);

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--teal)' }}>Agenda</h6>
      <h1 style={{ fontSize: 44, marginBottom: 44 }}>Événements</h1>

      <h2 style={{ fontSize: 24, marginBottom: 22 }}>À venir</h2>
      <div className="grid-auto" style={{ marginBottom: 52.8 }}>
        {upcoming.map((ev, i) => (
          <div key={ev.id} className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 8.8 }}>
            <span className="badge" style={{ background: ACCENT_PAIR[i % 2] }}>{formatEventDate(ev.eventDate)}</span>
            <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 19 }}>{ev.title}</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>{ev.location}</div>
            <p style={{ fontSize: 13, opacity: 0.8, margin: '4.4px 0 0' }}>{ev.description && firstSentence(ev.description)}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 24, marginBottom: 22 }}>Prestations passées</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 52.8 }}>
        <thead>
          <tr>
            {['Date', 'Événement', 'Lieu'].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(21,33,61,0.6)',
                  padding: 8.8,
                  borderBottom: '1px solid rgba(21,33,61,0.16)',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {past.map((ev) => (
            <tr key={ev.id}>
              <td style={{ padding: 8.8, borderBottom: '1px solid rgba(21,33,61,0.08)' }}>{formatEventDate(ev.eventDate)}</td>
              <td style={{ padding: 8.8, borderBottom: '1px solid rgba(21,33,61,0.08)' }}>{ev.title}</td>
              <td style={{ padding: 8.8, borderBottom: '1px solid rgba(21,33,61,0.08)' }}>{ev.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card-dark" style={{ padding: 35.2, borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontSize: 20, color: 'var(--text-on-dark)', marginBottom: 4.4 }}>Envie de nous inviter ?</h3>
          <p style={{ fontSize: 14, color: 'var(--text-on-dark)', opacity: 0.8, margin: 0 }}>
            Réservez une prestation pour votre église, votre événement ou votre festival.
          </p>
        </div>
        <Link to="/contact" className="btn btn-light" style={{ whiteSpace: 'nowrap' }}>Faire une demande</Link>
      </div>

      {upcoming.length > 0 && (
        <>
          <h2 style={{ fontSize: 24, marginTop: 52.8, marginBottom: 22 }}>En détail</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {upcoming.map((ev, i) => (
              <div
                key={ev.id}
                id={`event-${ev.id}`}
                className="card-dark"
                style={{ padding: 35.2, borderRadius: 32, scrollMarginTop: 96 }}
              >
                <span className="badge" style={{ background: ACCENT_PAIR[i % 2], marginBottom: 13.2 }}>
                  {formatEventDate(ev.eventDate)}
                </span>
                <h3 style={{ fontSize: 22, color: 'var(--text-on-dark)', margin: '8.8px 0 4.4px' }}>{ev.title}</h3>
                <div style={{ fontSize: 13, color: 'var(--text-on-dark)', opacity: 0.7, marginBottom: 13.2 }}>{ev.location}</div>
                <p style={{ fontSize: 14, color: 'var(--text-on-dark)', opacity: 0.85, margin: 0, lineHeight: 1.6, maxWidth: 640 }}>
                  {ev.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
