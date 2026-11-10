import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const HEADER_OFFSET = -96;

/**
 * Scrolls to the top on route change, or to the element named in the URL hash
 * (e.g. /services#web). The target may not exist yet while the page transition
 * runs, so we retry for a short while.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      return;
    }

    let timer: number | undefined;
    let tries = 0;
    const id = decodeURIComponent(hash.slice(1));

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET });
        else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET, behavior: 'smooth' });
        return;
      }
      if (tries++ < 20) timer = window.setTimeout(tryScroll, 100);
    };

    tryScroll();
    return () => window.clearTimeout(timer);
  }, [pathname, hash, lenis]);

  return null;
}
