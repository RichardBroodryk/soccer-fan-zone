import styles from "./MerchStoreTile.module.css";

type MerchStoreTileProps = {
  name: string;
  logo: string;
  to: string;
  onVisit?: () => void;
};

export default function MerchStoreTile({
  name,
  logo,
  to,
  onVisit,
}: MerchStoreTileProps) {
  return (
    <a
      href={to}
      className={styles.tile}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onVisit}
    >
      <img src={logo} alt={`${name} logo`} />
      <div className={styles.meta}>
        <strong>{name}</strong>
        <span>Official Team Store</span>
      </div>
    </a>
  );
}
