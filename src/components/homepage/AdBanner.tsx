import styles from "./AdBanner.module.css";

interface AdBannerProps {
  text: string;
}

export default function AdBanner({ text }: AdBannerProps) {
  return <div className={styles.banner}>{text}</div>;
}
export {};
