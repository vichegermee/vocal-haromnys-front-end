import { useEffect, useState } from 'react';

type PhotoFadeCarouselProps = {
  images: string[];
  alt: string;
  shape?: 'rounded' | 'circle' | 'rect';
  radius?: number;
  style?: React.CSSProperties;
  intervalMs?: number;
  /** Where object-fit: cover anchors its crop. Defaults to centered. */
  objectPosition?: string;
  /** Per-image override of objectPosition, keyed by the image's src. */
  objectPositions?: Record<string, string>;
};

export function PhotoFadeCarousel({
  images,
  alt,
  shape = 'rounded',
  radius = 20,
  style,
  intervalMs = 4500,
  objectPosition = 'center',
  objectPositions,
}: PhotoFadeCarouselProps) {
  const [index, setIndex] = useState(0);
  const borderRadius = shape === 'circle' ? '50%' : shape === 'rect' ? 0 : radius;

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius, ...style }}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === index ? alt : ''}
          aria-hidden={i === index ? undefined : true}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: objectPositions?.[src] ?? objectPosition,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 1000ms ease',
          }}
        />
      ))}
    </div>
  );
}
