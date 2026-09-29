import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useTrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    window.gtag('config', 'GTM-W8S2P6JG', { page_path: location.pathname });
  }, [location]);
};

export default useTrackPageView;
