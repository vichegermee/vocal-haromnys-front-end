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
      <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 44 }}>
        Ils ont tous fait le choix de rejoindre la chorale, soit après avoir été présent à un concert, soit par l’intermédiaire d’un proche. Mais ce qui les anime toutes et tous, c’est le fait de participer à une aventure humaine extraordinaire et conviviale. Ce sont des choristes de bon niveau qui font partie de notre famille du chant traditionnel africain et gospel et qui ont la volonté de grandir artistiquement et vocalement.
      </p>
      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 26.4 }}>
        {choristers.map((c, i) => (
          <div key={c.id} className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 8.8 }}>
            <ImageSlot label={`Photo de ${c.name}`} src={c.imageUrl} shape="rounded" radius={20} style={{ width: '100%', aspectRatio: '1/1' }} />
            <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 17, marginTop: 8.8 }}>{c.name}</div>
            {c.voicePart && <span className="badge" style={{ background: ACCENT_PAIR[i % 2] }}>{c.voicePart}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
