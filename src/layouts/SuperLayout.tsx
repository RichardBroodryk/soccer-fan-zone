import { Outlet } from "react-router-dom";
import PrimaryNav from "../components/nav/PrimaryNav";
import styles from "./SuperLayout.module.css";

export default function SuperLayout() {
  return (
    <div className={styles.app}>
      <PrimaryNav variant="super" />

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}