import { useEffect } from 'react';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/utils';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (!title) {
      document.title = `${SITE_NAME} — Custom Software Development Company`;
      return;
    }
    document.title = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  }, [title]);
}

/** Sets <meta name="description"> for the current page; restores the site default on unmount. */
export function useMetaDescription(description?: string) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) return;
    meta.content = description || SITE_DESCRIPTION;
    return () => {
      meta.content = SITE_DESCRIPTION;
    };
  }, [description]);
}
