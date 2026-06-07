import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SplashPage.module.css";

import splashImage from "../assets/soccer/ui/splash-image.png";

const SPLASH_DURATION = 4000;

const SplashPage = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, SPLASH_DURATION - 800);

    const navTimer = setTimeout(() => {
      navigate("/splash-intro");
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`${styles.splash} ${fadeOut ? styles.fadeOut : ""}`}>
      <img
        src={splashImage}
        alt="Soccer Fan Zone"
        className={styles.image}
      />
    </div>
  );
};

export default SplashPage;