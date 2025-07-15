import type { ScreenType } from "../types";
import styles from "./Screen.module.css";

interface ScreenProps {
  currentScreen: ScreenType;
}

export function Screen({ currentScreen }: ScreenProps) {
  return (
    <div className={styles.deviceScreen}>
      {currentScreen === "title" && (
        <div className={styles.screenContent}>
          <h1>VIRTUAL DEVICE</h1>
          <p>Press START</p>
        </div>
      )}
      {currentScreen === "game" && (
        <div className={styles.screenContent}>
          <h1>GAME RUNNING</h1>
          <p>Enjoy the game!</p>
        </div>
      )}
    </div>
  );
}
