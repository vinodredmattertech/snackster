import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TrackPageView = () => {
    const location = useLocation();
  
    useEffect(() => {
      if (window.gtag) {
        window.gtag('config', 'GTM-W8S2P6JG', {
          page_path: location.pathname,
        });
      }
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    }, [location]);
  
    return null;
  };

export default TrackPageView;
