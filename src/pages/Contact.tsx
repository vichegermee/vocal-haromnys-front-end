import { useState } from 'react';
import { submitReservation } from '../api/reservations';
import { submitJoinApplication } from '../api/joinApplications';
import { ApiError } from '../api/client';
import type { VoicePart } from '../api/choristers';
import { CollapsibleSection } from '../components/CollapsibleSection';

const pupitres: { value: VoicePart; label: string }[] = [
  { value: 'SOPRANO', label: 'Soprano' },
  { value: 'ALTO', label: 'Alto' },
  { value: 'TENOR', label: 'Ténor' },
  { value: 'BASSE', label: 'Basse' }
];

export function Contact() {
  const [reservationSent, setReservationSent] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);
  const [reservationSubmitting, setReservationSubmitting] = useState(false);

  const [joinSent, setJoinSent] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinSubmitting, setJoinSubmitting] = useState(false);
  const [pupitre, setPupitre] = useState<VoicePart | null>(null);

  async function handleReservationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setReservationSubmitting(true);
    setReservationError(null);
    try {
      await submitReservation({
        eventType: String(data.get('eventType') ?? ''),
        desiredDate: String(data.get('desiredDate') ?? ''),
        budget: String(data.get('budget') ?? '') || undefined,
        location: String(data.get('location') ?? ''),
        choristerCount: String(data.get('choristerCount') ?? '') || undefined,
        message: String(data.get('message') ?? '') || undefined,
        requesterName: String(data.get('requesterName') ?? ''),
        requesterEmail: String(data.get('requesterEmail') ?? ''),
      });
      setReservationSent(true);
    } catch (err) {
      setReservationError(err instanceof ApiError ? err.message : 'Une erreur est survenue, réessayez.');
    } finally {
      setReservationSubmitting(false);
    }
  }

  async function handleJoinSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pupitre) {
      setJoinError('Merci de choisir un pupitre vocal.');
      return;
    }
    const data = new FormData(e.currentTarget);
    setJoinSubmitting(true);
    setJoinError(null);
    try {
      await submitJoinApplication({
        voicePart: pupitre,
        experience: String(data.get('experience') ?? '') || undefined,
        availability: String(data.get('availability') ?? '') || undefined,
        audioLink: String(data.get('audioLink') ?? '') || undefined,
        motivation: String(data.get('motivation') ?? ''),
        applicantName: String(data.get('applicantName') ?? ''),
        applicantEmail: String(data.get('applicantEmail') ?? ''),
      });
      setJoinSent(true);
    } catch (err) {
      setJoinError(err instanceof ApiError ? err.message : 'Une erreur est survenue, réessayez.');
    } finally {
      setJoinSubmitting(false);
    }
  }

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--teal)' }}>Contact</h6>
      <h1 style={{ fontSize: 44, marginBottom: 35.2 }}>Parlons-en</h1>

      <div style={{ display: 'flex', gap: 35.2, flexWrap: 'wrap', marginBottom: 52.8, fontSize: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8.8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6257" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 6l-10 7L2 6" />
            <path d="M2 6h20v12H2z" />
          </svg>
          groupeharmonys1@gmail.com
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8.8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6257" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.99.36 1.96.68 2.89a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.19-1.25a2 2 0 0 1 2.11-.45c.93.32 1.9.55 2.89.68A2 2 0 0 1 22 16.92z" />
          </svg>
          +33 6 95 14 97 31
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8.8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6257" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Reims, France
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26.4 }}>
        <CollapsibleSection title="Réserver une prestation">
          {reservationSent ? (
            <div className="confirm-box">
              Merci ! Votre demande de prestation a bien été envoyée — nous revenons vers vous rapidement.
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="field" style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}>
              {reservationError && (
                <div style={{ padding: '10px 14px', borderRadius: 16, background: 'var(--coral)', color: 'var(--text-on-dark)', fontSize: 13 }}>
                  {reservationError}
                </div>
              )}
              <div>
                <label>Votre nom</label>
                <input name="requesterName" required placeholder="Nom complet" />
              </div>
              <div>
                <label>Votre email</label>
                <input name="requesterEmail" required type="email" placeholder="pour vous répondre" />
              </div>
              <div>
                <label>Type d'événement</label>
                <input name="eventType" required placeholder="Culte, mariage, festival…" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13.2 }}>
                <label>Date souhaitée</label>
                <input name="desiredDate"
                  type="date"
                  required
                  onClick={(e) => e.currentTarget.showPicker?.()}
                />
              </div>
              <div>
                <label>Lieu</label>
                <input name="location" required placeholder="Ville, salle, église…" />
              </div>
              <div>
                <label>Nombre de choristes souhaité</label>
                <input name="choristerCount" placeholder="Optionnel" />
              </div>
              <div>
                <label>Message</label>
                <textarea name="message" placeholder="Parlez-nous de votre projet" />
              </div>
              <button type="submit" disabled={reservationSubmitting} className="btn btn-coral" style={{ marginTop: 8.8, width: '100%' }}>
                {reservationSubmitting ? 'Envoi…' : 'Envoyer la demande'}
              </button>
            </form>
          )}
        </CollapsibleSection>

        <CollapsibleSection id="rejoindre" title="Rejoindre la chorale">
          {joinSent ? (
            <div className="confirm-box">
              Merci pour votre message ! Nous vous recontacterons pour organiser une écoute.
            </div>
          ) : (
            <form onSubmit={handleJoinSubmit} className="field" style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}>
              {joinError && (
                <div style={{ padding: '10px 14px', borderRadius: 16, background: 'var(--coral)', color: 'var(--text-on-dark)', fontSize: 13 }}>
                  {joinError}
                </div>
              )}
              <div>
                <label>Votre nom</label>
                <input name="applicantName" required placeholder="Nom complet" />
              </div>
              <div>
                <label>Votre email</label>
                <input name="applicantEmail" required type="email" placeholder="pour vous répondre" />
              </div>
              <div>
                <label>Pupitre vocal</label>
                <div style={{ display: 'inline-flex', overflow: 'hidden', border: '1px solid rgba(21,33,61,0.16)', borderRadius: 999 }}>
                  {pupitres.map((p, i) => (
                    <label
                      key={p.value}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '7px 12px',
                        fontSize: 13,
                        cursor: 'pointer',
                        borderLeft: i > 0 ? '1px solid rgba(21,33,61,0.16)' : 'none',
                        background: pupitre === p.value ? 'var(--navy)' : 'transparent',
                        color: pupitre === p.value ? 'var(--text-on-dark)' : 'var(--navy)',
                      }}
                    >
                      <input
                        type="radio"
                        name="pupitre"
                        value={p.value}
                        checked={pupitre === p.value}
                        onChange={() => setPupitre(p.value)}
                        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label>Expérience musicale</label>
                <input name="experience" placeholder="Chorale, conservatoire, autodidacte…" />
              </div>
              <div>
                <label>Disponibilités</label>
                <input name="availability" placeholder="Jours et soirs disponibles pour répéter" />
              </div>
              <div>
                <label>Lien audio/vidéo (optionnel)</label>
                <input name="audioLink" placeholder="Un extrait de vous en train de chanter" />
              </div>
              <div>
                <label>Votre motivation</label>
                <textarea name="motivation" required placeholder="Pourquoi souhaitez-vous rejoindre Vocal Harmony's ?" />
              </div>
              <button type="submit" disabled={joinSubmitting} className="btn btn-teal" style={{ marginTop: 8.8, width: '100%' }}>
                {joinSubmitting ? 'Envoi…' : 'Envoyer ma candidature'}
              </button>
            </form>
          )}
        </CollapsibleSection>
      </div>
    </section>
  );
}
