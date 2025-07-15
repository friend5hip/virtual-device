import styles from "./Footer.module.css";
import GithubIcon from "../../assets/logo_github.png";

function Footer() {
  return (
    <footer className={styles.container}>
      <p className={styles.text}>Copyright@ 2025 friend5hip</p>
      <div className={styles.iconContainer}>
        <a href="https://github.com/friend5hip">
          <img src={GithubIcon}></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
