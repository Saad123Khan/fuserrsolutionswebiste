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
