// Image preloader utility for critical images
import headerPic1 from '../assets/headerPic1.png';
import logo from '../assets/logo.svg';
import missie from '../assets/missie.png';
import visie from '../assets/visie.png';
import laassaarateamover from '../assets/laassaarateamover.png';

// List of critical images to preload immediately
const criticalImages = [
  headerPic1,
  logo,
];

// Secondary images to preload after initial load
const secondaryImages = [
  missie,
  visie,
  laassaarateamover,
];

// Preload a single image
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to preload: ${src}`));
    img.src = src;
  });
};

// Preload critical images immediately
export const preloadCriticalImages = () => {
  return Promise.all(criticalImages.map(preloadImage));
};

// Preload secondary images after page load
export const preloadSecondaryImages = () => {
  return Promise.all(secondaryImages.map(preloadImage));
};

// Preload all images
export const preloadAllImages = async () => {
  await preloadCriticalImages();
  // Use requestIdleCallback for secondary images if available
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      preloadSecondaryImages();
    });
  } else {
    setTimeout(() => {
      preloadSecondaryImages();
    }, 100);
  }
};

export default { preloadCriticalImages, preloadSecondaryImages, preloadAllImages };
