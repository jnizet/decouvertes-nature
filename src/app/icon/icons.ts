export function barredIcon(icon: string, viewBowSize = 16): string {
  return icon.replace(
    '</svg>',
    `<line x1="${viewBowSize}" y1="0" x2="0" y2="${viewBowSize}" stroke="currentColor" stroke-width="1" /></svg>`
  );
}

export const wheelchair = `<svg width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="miter" fill="none" color="currentColor">
  <path d="M15 17C15 19.7614 12.7614 22 10 22C7.23858 22 5 19.7614 5 17C5 14.9497 6.2341 13.1876 8 12.416"/>
  <circle cx="11" cy="3" r="1"/>
  <path d="M19 21.5L17.3959 15.4847C17.1624 14.6092 16.3695 14 15.4634 14H11V7L17 10"/>
</svg>`;
export const barredWheelchair = barredIcon(wheelchair, 24);
