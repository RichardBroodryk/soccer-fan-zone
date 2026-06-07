// src/layouts/AppLayout.tsx

import type { ReactNode } from "react";

import {
  Outlet,
  useLocation,
} from "react-router-dom";

import PrimaryNav from "../components/nav/PrimaryNav";

import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children?: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const location =
    useLocation();

  /* ======================================================
     SOCCER DETECTION
     ====================================================== */

  const isSoccer =
    location.pathname.startsWith(
      "/soccer"
    ) ||
    location.pathname.startsWith(
      "/anthems"
    ) ||
    location.pathname.startsWith(
      "/heritage"
    ) ||
    location.pathname.startsWith(
      "/defining-moments"
    );

  return (
    <div className={styles.app}>
      {/* ======================================================
          PRIMARY NAV
          ====================================================== */}

      <PrimaryNav
        isSoccer={isSoccer}
      />

      {/* ======================================================
          PAGE CONTENT
          ====================================================== */}

      <main
        className={
          styles.content
        }
      >
        {children || <Outlet />}
      </main>
    </div>
  );
}