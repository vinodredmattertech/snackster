import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Canonical URL helpers for SPA / local navigation.
 * - Strip trailing slash (except homepage)
 * - Redirect /party-snacks-Hyderabad -> /party-snacks-hyderabad (no redirect loop)
 */
function TrailingSlashRedirect() {
  const { pathname, search, hash } = useLocation();

  // Only redirect when URL still contains uppercase letters (avoids Windows case loops)
  useEffect(() => {
    if (
      pathname.toLowerCase() === '/party-snacks-hyderabad' &&
      /[A-Z]/.test(pathname)
    ) {
      window.history.replaceState(
        null,
        '',
        `/party-snacks-hyderabad${search}${hash}`
      );
    }
  }, [pathname, search, hash]);

  if (pathname !== '/' && pathname.endsWith('/')) {
    return <Navigate to={`${pathname.replace(/\/+$/, '')}${search}${hash}`} replace />;
  }

  return null;
}

export default TrailingSlashRedirect;
