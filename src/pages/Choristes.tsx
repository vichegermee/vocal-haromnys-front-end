import { useEffect, useMemo, useState } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import { JoinChoirCta } from '../components/JoinChoirCta';
import { fetchChoristers, type Chorister } from '../api/choristers';
import { ACCENT_PAIR } from '../constants';

const PUPITRE_ORDER = ['Soprano', 'Alto', 'Ténor', 'Basse', 'Musiciens', 'Maestro', 'Autres'];

const MUSICIEN_VOICE_PARTS = new Set(['Batterie', 'Guitare', 'Pianiste']);
const MAESTRO_VOICE_PARTS = new Set(['Manager']);

/** Maps a chorister's free-text voicePart (e.g. "Batterie") to one of the fixed pupitre groups. */
function pupitreGroup(voicePart: string): string {
  if (voicePart === 'Soprano' || voicePart === 'Alto' || voicePart === 'Ténor' || voicePart === 'Basse') {
    return voicePart;
  }
  if (MAESTRO_VOICE_PARTS.has(voicePart)) return 'Maestro';
  if (MUSICIEN_VOICE_PARTS.has(voicePart)) return 'Musiciens';
  return 'Autres';
}

function groupChoristers(choristers: Chorister[]): [string, Chorister[]][] {
  const byGroup = new Map<string, Chorister[]>();
  for (const c of choristers) {
    const group = pupitreGroup(c.voicePart);
    if (!byGroup.has(group)) byGroup.set(group, []);
    byGroup.get(group)!.push(c);
  }
  for (const members of byGroup.values()) {
    members.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  }
  return PUPITRE_ORDER.filter((group) => byGroup.has(group)).map((group) => [group, byGroup.get(group)!]);
}

export function Choristes() {
  const [choristers, setChoristers] = useState<Chorister[]>([]);

  useEffect(() => {
    fetchChoristers().then(setChoristers);
  }, []);

  const groups = useMemo(() => groupChoristers(choristers), [choristers]);

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--teal)' }}>La chorale</h6>
      <h1 style={{ fontSize: 44, marginBottom: 13.2 }}>Nos choristes</h1>
      <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 44 }}>
        Être choriste de Vocal Harmony’s, c’est avant tout un choix.
        Celui de rejoindre un collectif, de partager sa voix, son énergie et sa personnalité, mais aussi de progresser et de vivre pleinement une aventure humaine et musicale. Venus d’horizons et de parcours différents, nos choristes ont choisi de faire de leurs différences une force et de leurs voix une harmonie.
      </p>
      {groups.map(([group, members]) => (
        <div key={group} style={{ marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 17.6, marginBottom: 22 }}>
            <h2 style={{ fontSize: 20, whiteSpace: 'nowrap' }}>{group}</h2>
            <div style={{ flex: 1, height: 1, background: 'rgba(21,33,61,0.14)' }} />
          </div>
          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, 240px)', gap: 26.4 }}>
            {members.map((c, i) => (
              <div key={c.id} className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 8.8 }}>
                <ImageSlot label={`Photo de ${c.name}`} src={c.imageUrl} shape="rounded" radius={20} style={{ width: '100%', aspectRatio: '1/1' }} />
                <div style={{ fontFamily: "'Caprasimo',system-ui,sans-serif", fontSize: 17, marginTop: 8.8 }}>{c.name}</div>
                {c.voicePart && <span className="badge" style={{ background: ACCENT_PAIR[i % 2] }}>{c.voicePart}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}

      <JoinChoirCta />
    </section>
  );
}
