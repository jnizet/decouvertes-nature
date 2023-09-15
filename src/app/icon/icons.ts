export function barredIcon(icon: string, viewBowSize = 16): string {
  return icon.replace(
    '</svg>',
    `<line x1="${viewBowSize}" y1="0" x2="0" y2="${viewBowSize}" stroke="currentColor" stroke-width="1" /></svg>`
  );
}
