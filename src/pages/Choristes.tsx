import { useEffect, useState } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import { fetchChoristers, type Chorister } from '../api/choristers';
import { ACCENT_PAIR } from '../constants';

export function Choristes() {
  const [choristers, setChoristers] = useState<Chorister[]>([]);

  useEffect(() => {
    fetchChoristers().then(setChoristers);
  }, []);

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--teal)' }}>La chorale</h6>
      <h1 style={{ fontSize: 44, marginBottom: 13.2 }}>Nos choristes</h1>
      <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 44, maxWidth: 600 }}>
        Des voix et des parcours différents, réunis chaque semaine autour du même chant.
      </p>
      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 26.4 }}>
        {choristers.map((c, i) => (
          <div key={c.id} className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 8.8 }}>
            <ImageSlot label="Photo du choriste" src={c.imageUrl} shape="rounded" radius={20} style={{ width: '100%', aspectRatio: '1/1' }} />
            <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 17, marginTop: 8.8 }}>{c.name}</div>
            <span className="badge" style={{ background: ACCENT_PAIR[i % 2] }}>{c.voicePart}</span>
            <p style={{ fontSize: 13, opacity: 0.8, margin: '4.4px 0 0' }}>{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
