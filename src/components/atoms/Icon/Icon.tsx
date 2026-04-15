import { type CSSProperties } from 'react';

export type IconSize = 16 | 20 | 24 | 32;
export type IconStyle = 'outline' | 'filled';

/* -----------------------------------------------------------------------
 * Built-in icon paths — subset SVG paths for taille 24×24 viewBox.
 * Chaque icône expose deux variantes : outline et filled.
 * Pour ajouter une icône custom, passer `children` à la place de `name`.
 * --------------------------------------------------------------------- */
const ICONS: Record<string, Record<IconStyle, string>> = {
  arrow_right: {
    outline:
      'M5 12h14M12 5l7 7-7 7',
    filled:
      'M5 12h14M12 5l7 7-7 7',
  },
  arrow_left: {
    outline: 'M19 12H5M12 19l-7-7 7-7',
    filled:  'M19 12H5M12 19l-7-7 7-7',
  },
  check: {
    outline: 'M20 6L9 17l-5-5',
    filled:  'M20 6L9 17l-5-5',
  },
  close: {
    outline: 'M18 6 6 18M6 6l12 12',
    filled:  'M18 6 6 18M6 6l12 12',
  },
  plus: {
    outline: 'M12 5v14M5 12h14',
    filled:  'M12 5v14M5 12h14',
  },
  minus: {
    outline: 'M5 12h14',
    filled:  'M5 12h14',
  },
  search: {
    outline: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
    filled:  'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
  },
  home: {
    outline: 'M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z',
    filled:  'M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z',
  },
  user: {
    outline:
      'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    filled:
      'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  },
  settings: {
    outline:
      'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.07-1.66a7 7 0 0 0 .06-.86c0-.3-.02-.59-.06-.86l1.87-1.46a.45.45 0 0 0 .11-.57l-1.77-3.06a.45.45 0 0 0-.55-.2l-2.2.88a6.6 6.6 0 0 0-1.49-.86l-.33-2.34A.45.45 0 0 0 14 4h-3.55a.45.45 0 0 0-.44.38l-.33 2.34c-.53.22-1.02.52-1.49.86l-2.2-.88a.45.45 0 0 0-.55.2L3.67 9.96a.45.45 0 0 0 .1.57l1.88 1.46c-.04.27-.07.56-.07.86s.03.59.07.86L3.77 15.17a.45.45 0 0 0-.1.57l1.77 3.06c.12.2.36.27.55.2l2.2-.88c.47.34.96.64 1.49.86l.33 2.34c.06.22.26.38.44.38h3.55c.22 0 .4-.16.44-.38l.33-2.34c.53-.22 1.02-.52 1.49-.86l2.2.88c.2.07.43 0 .55-.2l1.77-3.06a.45.45 0 0 0-.1-.57l-1.88-1.46z',
    filled:
      'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.07-1.66a7 7 0 0 0 .06-.86c0-.3-.02-.59-.06-.86l1.87-1.46a.45.45 0 0 0 .11-.57l-1.77-3.06a.45.45 0 0 0-.55-.2l-2.2.88a6.6 6.6 0 0 0-1.49-.86l-.33-2.34A.45.45 0 0 0 14 4h-3.55a.45.45 0 0 0-.44.38l-.33 2.34c-.53.22-1.02.52-1.49.86l-2.2-.88a.45.45 0 0 0-.55.2L3.67 9.96a.45.45 0 0 0 .1.57l1.88 1.46c-.04.27-.07.56-.07.86s.03.59.07.86L3.77 15.17a.45.45 0 0 0-.1.57l1.77 3.06c.12.2.36.27.55.2l2.2-.88c.47.34.96.64 1.49.86l.33 2.34c.06.22.26.38.44.38h3.55c.22 0 .4-.16.44-.38l.33-2.34c.53-.22 1.02-.52 1.49-.86l2.2.88c.2.07.43 0 .55-.2l1.77-3.06a.45.45 0 0 0-.1-.57l-1.88-1.46z',
  },
  bell: {
    outline:
      'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
    filled:
      'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  },
  mail: {
    outline:
      'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6',
    filled:
      'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6',
  },
  external_link: {
    outline:
      'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    filled:
      'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
  },
  trash: {
    outline:
      'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
    filled:
      'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
  },
  edit: {
    outline:
      'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
    filled:
      'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  },
  heart: {
    outline:
      'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z',
    filled:
      'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z',
  },
  star: {
    outline:
      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    filled:
      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  },
  info: {
    outline:
      'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
    filled:
      'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  },
  warning: {
    outline:
      'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01',
    filled:
      'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01',
  },
  menu: {
    outline: 'M3 6h18M3 12h18M3 18h18',
    filled:  'M3 6h18M3 12h18M3 18h18',
  },
  link: {
    outline: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
    filled:  'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  },
  code: {
    outline: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    filled:  'M16 18l6-6-6-6M8 6l-6 6 6 6',
  },
  filter: {
    outline: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
    filled:  'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  },
  chart: {
    outline: 'M18 20V10M12 20V4M6 20v-6',
    filled:  'M18 20V10M12 20V4M6 20v-6',
  },
  drag: {
    outline: 'M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01',
    filled:  'M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01',
  },
  trend_up: {
    outline: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
    filled:  'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  },
  trend_down: {
    outline: 'M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6',
    filled:  'M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6',
  },
};

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export interface IconProps {
  /** Nom de l'icône built-in. Si absent, passer des chemins SVG via `children`. */
  name?: IconName;
  size?: IconSize;
  iconStyle?: IconStyle;
  color?: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export const Icon = ({
  name,
  size = 24,
  iconStyle = 'outline',
  color = 'currentColor',
  label,
  className,
  style,
}: IconProps) => {
  const d = name ? ICONS[name]?.[iconStyle] : undefined;
  const strokeWidth = iconStyle === 'filled' ? 0 : 2;
  const fill = iconStyle === 'filled' ? color : 'none';

  const svgStyle: CSSProperties = {
    width: size,
    height: size,
    display: 'inline-block',
    flexShrink: 0,
    verticalAlign: 'middle',
    ...style,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      className={className}
      style={svgStyle}
    >
      {d && <path d={d} />}
    </svg>
  );
};
