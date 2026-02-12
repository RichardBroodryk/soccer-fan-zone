import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopNavBar.module.css";

import logo from "../../assets/images/ui/raz-logo.png";
import { ArrowLeft, Bell, UserCircle } from "phosphor-react";

interface TopNavBarProps {
  showBackButton?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
}

const TopNavBar: FC<TopNavBarProps> = ({
  showBackButton = false,
  showNotifications = true,
  showProfile = true,
}) => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      {/* LEFT */}
      <div className={styles.left}>
        <img
          src={logo}
          alt="Rugby Anthem Zone"
          className={styles.logo}
          onClick={() => navigate("/home")}
        />

        {showBackButton && (
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={24} weight="bold" />
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        {showNotifications && (
          <button
            className={styles.iconButton}
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <Bell size={22} weight="fill" />
          </button>
        )}

        {showProfile && (
          <button
            className={styles.iconButton}
            onClick={() => navigate("/profile")}
            aria-label="Profile"
          >
            <UserCircle size={22} weight="fill" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopNavBar;
