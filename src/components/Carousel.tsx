import { Children, cloneElement, isValidElement, useEffect, useRef, type ReactNode } from 'react';

type CarouselProps = {
  children: ReactNode;
  height?: number;
  prevLabel?: string;
  nextLabel?: string;
  /** Scrolls sideways on its own, in a seamless loop — no buttons, no user action needed. */
  autoScroll?: boolean;
  /** Pixels per second when autoScroll is on. */
  autoScrollSpeed?: number;
};

export function Carousel({
  children,
  height = 280,
  prevLabel = 'Précédent',
  nextLabel = 'Suivant',
  autoScroll = false,
  autoScrollSpeed = 40,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * (height * 0.9), behavior: 'auto' });
  }

  useEffect(() => {
    if (!autoScroll) return;
    const track = trackRef.current;
    if (!track) return;

    let frame: number;
    let last: number | null = null;

    function tick(now: number) {
      if (track) {
        const dt = last === null ? 0 : (now - last) / 1000;
        last = now;
        // Content is duplicated below, so the track's real width is exactly
        // twice one set — looping there is seamless, the second copy lines
        // up pixel-for-pixel with where the first one started.
        const loopPoint = track.scrollWidth / 2;
        track.scrollLeft += autoScrollSpeed * dt;
        if (track.scrollLeft >= loopPoint) {
          track.scrollLeft -= loopPoint;
        }
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoScroll, autoScrollSpeed]);

  const items = autoScroll ? duplicate(children) : children;

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={trackRef}
        className="carousel-track"
        style={{
          display: 'flex',
          gap: 13.2,
          overflowX: 'auto',
          scrollSnapType: autoScroll ? 'none' : 'x mandatory',
          height,
        }}
      >
        {items}
      </div>
      {!autoScroll && (
        <>
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
        </>
      )}
    </div>
  );
}

/** Renders the children twice back to back, so a track that loops at the
 * halfway point never shows a gap or a jump. */
function duplicate(children: ReactNode): ReactNode {
  const items = Children.toArray(children);
  return [
    ...items,
    ...items.map((child, i) =>
      isValidElement(child) ? cloneElement(child, { key: `dup-${i}` }) : child
    ),
  ];
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
