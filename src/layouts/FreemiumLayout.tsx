import { Outlet, useLocation } from "react-router-dom";
import AdBanner from "../components/homepage/AdBanner";
import styles from "./FreemiumLayout.module.css";

export default function FreemiumLayout() {
  const location = useLocation();
  const isSplashPage = location.pathname === "/";

  return (
    <div className={styles.app}>
      {/* TOP SPONSOR */}
      {!isSplashPage && (
        <div className={styles.adTop}>
          <AdBanner text="🏉 Official Rugby Partner" />
        </div>
      )}

      <main className={styles.content}>
        <Outlet />
      </main>

      {/* BOTTOM UPGRADE BAR */}
      {!isSplashPage && (
        <div className={styles.adBottom}>
          <AdBanner text="⭐ Go Premium — Unlock the Full Rugby Experience" />
        </div>
      )}
    </div>
  );
}