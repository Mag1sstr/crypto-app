import { useTheme } from "../../contexts/ThemeContext";
import styles from "./style.module.css";

import sun from "../../images/sun.png";
import moon from "../../images/moon.png";

export default function ThemeToggle() {
  const { dark, setDark } = useTheme();
  return (
    <div
      onClick={() => setDark(!dark)}
      className={`${styles.btn} ${dark ? styles.dark : ""}`}
    >
      <div className={styles.circle}>
        <img className={styles.image} src={dark ? moon : sun} alt="" />
      </div>
    </div>
  );
}
