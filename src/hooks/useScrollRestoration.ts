import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router's BrowserRouter never resets scroll position on navigation
 * (unlike a full page load) — without this, clicking a nav tab while
 * scrolled down on the previous page leaves the new page scrolled down too.
 *
 * Two behaviors, chosen by whether the target URL carries a hash:
 *  - no hash (general nav — header tabs, footer links, "Voir tous les
 *    événements"...): jump to the top of the new page, instantly.
 *  - a hash (e.g. an event card linking to /evenements#event-3, from the
 *    home page or the news sidebar): scroll to that element instead. The
 *    target often hasn't rendered yet — its list loads from the API after
 *    mount — so this watches the DOM until the id shows up rather than
 *    scrolling too early.
 */
export function useScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const id = hash.slice(1);

    const existing = document.getElementById(id);
    if (existing) {
      existing.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const observer = new MutationObserver(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, hash]);
}
