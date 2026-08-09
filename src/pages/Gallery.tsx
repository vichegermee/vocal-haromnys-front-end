import { useEffect, useState } from 'react';
import { ImageSlot } from '../components/ImageSlot';
import { Carousel } from '../components/Carousel';
import { fetchGalleryPhotos, fetchGalleryVideos, type GalleryPhoto, type GalleryVideo } from '../api/gallery';

const PHOTO_SIZE = 280;

export function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  useEffect(() => {
    fetchGalleryPhotos().then(setPhotos);
    fetchGalleryVideos().then(setVideos);
  }, []);

  return (
    <section className="section container">
      <h6 className="eyebrow" style={{ color: 'var(--coral)' }}>Galerie</h6>
      <h1 style={{ fontSize: 44, marginBottom: 44 }}>Photos &amp; vidéos de nos concerts</h1>

      <h2 style={{ fontSize: 22, marginBottom: 17.6 }}>Photos</h2>
      <div style={{ display: 'flex', gap: 35.2, flexWrap: 'wrap', alignItems: 'stretch', marginBottom: 52.8 }}>
        <div style={{ flex: '3 1 480px', minWidth: 0 }}>
          <Carousel height={PHOTO_SIZE} autoScroll autoScrollSpeed={30}>
            {photos.map((p) => (
              <div key={p.id} className="carousel-item" style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}>
                <ImageSlot label={p.label} src={p.imageUrl} shape="rounded" radius={20} style={{ width: '100%', height: '100%' }} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="card-dark" style={{ flex: '2 1 280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 13.2 }}>
          <h3 style={{ fontSize: 20 }}>Une seule voix, mille couleurs</h3>
          <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>
            Bienvenue dans l'univers du Groupe Vocal Harmony's, l'une des chorales les plus vibrantes de Reims, la Ville des sacres. Chant africain, gospel, negro-spiritual, classique ou liturgique : notre voix n'a pas de frontières, seulement de la passion à revendre.
          </p>
          <p>
            Fermez les yeux, ouvrez votre cœur, et laissez nos chants vous transporter.
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: 22, marginBottom: 17.6 }}>Vidéos</h2>
      <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
        {videos.map((v) => {
          const isPlaying = playingVideo === v.id;
          return (
            <div key={v.id} style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', aspectRatio: '16/9' }}>
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              ) : (
                <button
                  onClick={() => setPlayingVideo(v.id)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundImage: `url(https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(21,33,61,0.15)' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFDF8">
                        <polygon points="6,4 20,12 6,20" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', left: 13.2, bottom: 13.2, color: '#FFFDF8', fontSize: 13, fontFamily: "'Caprasimo',system-ui,sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                    {v.title}
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
