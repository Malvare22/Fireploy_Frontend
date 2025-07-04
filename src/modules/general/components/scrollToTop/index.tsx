import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;

// export const ScrollToTopSpecial: React.FC = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     const targetDiv = document.getElementById('scroll-target');
//     if (targetDiv) {
//       targetDiv.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }
//   }, [pathname]);

//   return null;
// };