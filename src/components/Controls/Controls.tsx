import styles from "./Controls.module.css";

interface ControlsProps {
  setCurrentScreen: (screen: "title" | "game") => void;
}

export function Controls({ setCurrentScreen }: ControlsProps) {
  const handleStartBtn = () => {
    setCurrentScreen("game");
  };

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.dPad}>
        <div className={`${styles.dPadBtn} ${styles.up}`}></div>
        <div className={`${styles.dPadBtn} ${styles.down}`}></div>
        <div className={`${styles.dPadBtn} ${styles.left}`}></div>
        <div className={`${styles.dPadBtn} ${styles.right}`}></div>
        <div className={styles.dPadCenter}></div>
      </div>

      <div className={styles.abButtons}>
        <div className={`${styles.button} ${styles.bButton}`}>B</div>
        <div className={`${styles.button} ${styles.aButton}`}>A</div>
      </div>

      <div className={styles.systemButtons}>
        <button
          className={styles.selectButton}
          onClick={() => setCurrentScreen("title")}
        >
          SELECT
        </button>
        <button className={styles.startButton} onClick={handleStartBtn}>
          START
        </button>
      </div>
    </div>
  );
}
