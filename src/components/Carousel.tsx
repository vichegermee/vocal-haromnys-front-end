import { useRef, type ReactNode } from 'react';

type CarouselProps = {
  children: ReactNode;
  height?: number;
  prevLabel?: string;
  nextLabel?: string;
};

export function Carousel({ children, height = 280, prevLabel = 'Précédent', nextLabel = 'Suivant' }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * (height * 0.9), behavior: 'auto' });
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={trackRef}
        className="carousel-track"
        style={{
          display: 'flex',
          gap: 13.2,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          height,
        }}
      >
        {children}
      </div>
      <button
        type="button"
        aria-label={prevLabel}
        onClick={() => scrollByAmount(-1)}
        style={navBtnStyle('left')}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => scrollByAmount(1)}
        style={navBtnStyle('right')}
      >
        ›
      </button>
    </div>
  );
}

function navBtnStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: -6,
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 'none',
    background: 'var(--navy)',
    color: 'var(--text-on-dark)',
    fontSize: 22,
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(21,33,61,0.25)',
    zIndex: 2,
  };
}
