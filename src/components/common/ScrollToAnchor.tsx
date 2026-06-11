import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to ensure the element is rendered and the browser has finished any initial scroll
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [hash, pathname]);

  return null;
};

export default ScrollToAnchor;
