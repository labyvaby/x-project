type IconName =
  | 'logo'
  | 'home'
  | 'article'
  | 'trophy'
  | 'user'
  | 'rocket'
  | 'flame'
  | 'book'
  | 'target'
  | 'medal'
  | 'star'
  | 'brain'
  | 'clock'
  | 'shield'
  | 'bolt'
  | 'crown';

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'logo':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 12v7h14v-7" />
        </svg>
      );
    case 'article':
      return (
        <svg {...common}>
          <rect x="6" y="4" width="12" height="16" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case 'trophy':
      return (
        <svg {...common}>
          <path d="M7 4h10v4a5 5 0 0 1-10 0V4z" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M5 7a3 3 0 0 0 2 3" />
          <path d="M19 7a3 3 0 0 1-2 3" />
        </svg>
      );
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20a6 6 0 0 1 12 0" />
        </svg>
      );
    case 'rocket':
      return (
        <svg {...common}>
          <path d="M12 2c3 2 5 5 5 9 0 4-2 7-5 11-3-4-5-7-5-11 0-4 2-7 5-9z" />
          <circle cx="12" cy="9" r="2" />
          <path d="M10 15l-2 2-3 1 1-3 2-2" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...common}>
          <path d="M8 14c0 3 2 6 4 6s4-3 4-6c0-4-4-6-4-10 0 3-4 6-4 10z" />
        </svg>
      );
    case 'book':
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M20 22H6.5a2.5 2.5 0 0 1 0-5H20V22z" />
          <path d="M20 2H6.5A2.5 2.5 0 0 0 4 4.5v15" />
        </svg>
      );
    case 'target':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" />
        </svg>
      );
    case 'medal':
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="4" />
          <path d="M8 13l-2 7 6-3 6 3-2-7" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <path d="M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
        </svg>
      );
    case 'brain':
      return (
        <svg {...common}>
          <path d="M8 6a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4" />
          <path d="M16 6a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4" />
          <path d="M12 4v16" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...common}>
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      );
    case 'crown':
      return (
        <svg {...common}>
          <path d="M3 10l4-4 5 5 5-5 4 4-2 8H5l-2-8z" />
        </svg>
      );
    default:
      return null;
  }
}

export type { IconName };
