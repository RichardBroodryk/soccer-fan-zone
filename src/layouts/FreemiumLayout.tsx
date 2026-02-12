import { Outlet } from "react-router-dom";
import styles from "./FreemiumLayout.module.css";

export default function FreemiumLayout() {
  return (
    <div className={styles.app}>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
