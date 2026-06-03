import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export const SITE_URL = 'https://fuserrsolutions.com';
export const SITE_NAME = 'Fuserr Solutions';
export const SITE_DESCRIPTION =
  'White-label software development agency. We build web, mobile & SaaS under your brand — NDA-backed, invisible to your clients.';

export function isColorLight(hex: string) {
  if (!hex) return false;
  const cleaned = hex.replace('#', '').trim();
  const bigint = parseInt(cleaned.length === 3 ? cleaned.split('').map(c => c + c).join('') : cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  // relative luminance
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  return lum > 0.6; // threshold; tweakable
}
