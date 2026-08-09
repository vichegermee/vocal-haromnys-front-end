import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { fetchSongs, type Song, type TrackType } from '../api/songs';

const TRACK_LABELS: Record<TrackType, string> = {
  SOPRANO: 'Soprano',
  ALTO: 'Alto',
  TENOR: 'Ténor',
  BASSE: 'Basse',
  CHOEUR: 'Chœur (toutes voix)',
  INSTRUMENTAL: 'Instrumentale seule',
};

export function Repertoire() {
  const { loggedIn, initializing, currentMember, logout } = useAuth();
  const navigate = useNavigate();
  const [expandedSong, setExpandedSong] = useState<number | null>(null);
  const [songs, setSongs] = useState<Song[] | null>(null);

  useEffect(() => {
    if (!loggedIn) return;
    fetchSongs().then(setSongs);
  }, [loggedIn]);

  if (initializing) return null;
  if (!loggedIn) {
    return <Navigate to="/connexion" replace />;
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <section className="section container" style={{ maxWidth: 900 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 13.2, marginBottom: 8.8 }}>
        <div>
          <h6 className="eyebrow" style={{ color: 'var(--amber)' }}>Espace membre</h6>
          <h1 style={{ fontSize: 36 }}>Répertoire de répétition</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, opacity: 0.7 }}>Connecté(e) en tant que</div>
          <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 16 }}>{currentMember?.fullName}</div>
          <button
            onClick={handleLogout}
            style={{ marginTop: 8.8, fontSize: 12, background: 'none', border: 'none', color: 'var(--coral)', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            Se déconnecter
          </button>
        </div>
      </div>
      <p style={{ fontSize: 14, opacity: 0.75, marginBottom: 35.2 }}>
        Écoutez la piste audio et retrouvez les paroles ou la partition de chaque chant du répertoire.
      </p>
      {!songs ? (
        <p style={{ fontSize: 14, opacity: 0.6 }}>Chargement du répertoire…</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13.2 }}>
          {songs.map((song) => {
            const expanded = expandedSong === song.id;
            return (
              <div key={song.id} className="card-dark" style={{ borderRadius: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 13.2 }}>
                  <div>
                    <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 18 }}>{song.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4.4 }}>
                      {song.voicing} · {song.musicalKey}
                    </div>
                  </div>
                  <button onClick={() => setExpandedSong(expanded ? null : song.id)} className="btn btn-outline">
                    {expanded ? 'Masquer' : 'Écouter / Paroles'}
                  </button>
                </div>
                {expanded && (
                  <div style={{ marginTop: 17.6, display: 'flex', flexDirection: 'column', gap: 13.2 }}>
                    <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,253,248,0.55)' }}>
                      Pistes audio
                    </div>
                    <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 8.8 }}>
                      {song.tracks.map((track) => (
                        <div
                          key={track.id}
                          style={{ display: 'flex', alignItems: 'center', gap: 13.2, padding: '8.8px 13.2px', borderRadius: 999, background: 'var(--bg)', color: 'var(--navy)' }}
                        >
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFDF8">
                              <polygon points="6,4 20,12 6,20" />
                            </svg>
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 13 }}>{TRACK_LABELS[track.trackType]}</div>
                            <div style={{ fontSize: 11, opacity: 0.55, fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              piste à ajouter — {track.fileUrl}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: 17.6, borderRadius: 20, background: 'var(--bg)', color: 'var(--navy)', fontFamily: 'monospace', fontSize: 12, opacity: 0.7, whiteSpace: 'pre-wrap' }}>
                      [ Paroles / partition de « {song.title} » à ajouter ]
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
