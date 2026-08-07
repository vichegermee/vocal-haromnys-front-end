type ImageSlotProps = {
  label: string;
  src?: string;
  shape?: 'rounded' | 'circle' | 'rect';
  radius?: number;
  style?: React.CSSProperties;
};

export function ImageSlot({ label, src, shape = 'rounded', radius = 20, style }: ImageSlotProps) {
  const borderRadius = shape === 'circle' ? '50%' : shape === 'rect' ? 0 : radius;

  if (src) {
    return (
      <img
        src={src}
        alt={label}
        style={{
          borderRadius,
          objectFit: 'cover',
          display: 'block',
          ...style,
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      style={{
        borderRadius,
        background:
          'repeating-linear-gradient(135deg, rgba(21,33,61,0.06) 0px, rgba(21,33,61,0.06) 10px, rgba(21,33,61,0.02) 10px, rgba(21,33,61,0.02) 20px)',
        border: '1px dashed rgba(21,33,61,0.22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          padding: 12,
          textAlign: 'center',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(21,33,61,0.35)" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span style={{ fontSize: 11, color: 'rgba(21,33,61,0.45)', lineHeight: 1.3 }}>{label}</span>
      </div>
    </div>
  );
}
