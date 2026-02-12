import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SplashPage.module.css';

import razSplash from '../assets/images/raz/raz-splash.png';

const SPLASH_DURATION = 4000; // 4 seconds total

const SplashPage = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, SPLASH_DURATION - 800); // longer, smoother fade window

    const navTimer = setTimeout(() => {
      navigate('/splash-intro');
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`${styles.splash} ${fadeOut ? styles.fadeOut : ''}`}>
      <img
        src={razSplash}
        alt="Rugby Anthem Zone"
        className={styles.image}
      />
    </div>
  );
};

export default SplashPage;
