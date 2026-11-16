export function ArrowRight({ size = 12 }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M1 6h10M7 2l4 4-4 4" />
    </svg>
  );
}

export function ArrowDiag({ size = 12 }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 10 10 2M4 2h6v6" />
    </svg>
  );
}

export function IconGrid() {
  return (
    <svg viewBox="0 0 18 18" width="16" height="16" fill="currentColor">
      <rect x="1" y="1" width="7" height="7" />
      <rect x="10" y="1" width="7" height="7" />
      <rect x="1" y="10" width="7" height="7" />
      <rect x="10" y="10" width="7" height="7" />
    </svg>
  );
}

export function IconList() {
  return (
    <svg viewBox="0 0 18 18" width="16" height="16" fill="currentColor">
      <rect x="1" y="2" width="16" height="2" />
      <rect x="1" y="8" width="16" height="2" />
      <rect x="1" y="14" width="16" height="2" />
    </svg>
  );
}
