import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdBanner from "../components/homepage/AdBanner";
import styles from "./FreemiumLayout.module.css";

export default function FreemiumLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSplashPage = location.pathname === "/";

  return (
    <div className={styles.app}>
      {/* TOP SPONSOR */}
      {!isSplashPage && (
        <div className={styles.adTop}>
          <AdBanner text="🏉 Official Rugby Partner" />
        </div>
      )}

      {/* PAGE CONTENT */}
      <main className={styles.content}>
        <Outlet />
      </main>

      {/* 🔥 BOTTOM UPGRADE BAR (CLICKABLE CTA) */}
      {!isSplashPage && (
        <div
          className={styles.adBottom}
          onClick={() => navigate("/what-you-get/premium")}
          style={{ cursor: "pointer" }}
        >
          <AdBanner text="⭐ Go Premium — Unlock the Full Rugby Experience" />
        </div>
      )}
    </div>
  );
}