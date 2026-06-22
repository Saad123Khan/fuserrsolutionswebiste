import { useEffect } from 'react';
import { SITE_NAME } from '@/lib/utils';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (!title) {
      document.title = `${SITE_NAME} — Premium Software Development Agency`;
      return;
    }
    document.title = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  }, [title]);
}
