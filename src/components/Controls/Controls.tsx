import { playSound } from "../../util/playSound";
import type { ScreenType } from "../Screen/types";
import styles from "./Controls.module.css";
import clickSound from "../../assets/click-tap-computer-mouse-352734.mp3";
import { useHoldAction } from "../../hooks/useHoldAction";

interface ControlsProps {
  setCurrentScreen: (screen: ScreenType) => void;
  actions: {
    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
    onA?: () => void;
    onB?: () => void;
  };
}

export function Controls({ setCurrentScreen, actions }: ControlsProps) {
  const playClickSound = () => playSound({ sound: clickSound });

  const handleSelectBtn = () => {
    playClickSound();
    setCurrentScreen("title");
  };
  const handleStartBtn = () => {
    playClickSound();
    setCurrentScreen("timer");
  };

  const createSoundAction = (action?: () => void) => {
    return () => {
      if (action) {
        playClickSound();
        action();
      }
    };
  };

  const up = useHoldAction(createSoundAction(actions.onUp));
  const down = useHoldAction(createSoundAction(actions.onDown));
  const left = useHoldAction(createSoundAction(actions.onLeft));
  const right = useHoldAction(createSoundAction(actions.onRight));

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.dPad}>
        <button className={`${styles.dPadBtn} ${styles.up}`} {...up}></button>
        <button
          className={`${styles.dPadBtn} ${styles.down}`}
          {...down}
        ></button>
        <button
          className={`${styles.dPadBtn} ${styles.left}`}
          {...left}
        ></button>
        <button
          className={`${styles.dPadBtn} ${styles.right}`}
          {...right}
        ></button>
        <div className={styles.dPadCenter}></div>
      </div>

      <div className={styles.abButtons}>
        <button
          className={`${styles.button} ${styles.bButton}`}
          onMouseDown={createSoundAction(actions.onB)}
        >
          B
        </button>
        <button
          className={`${styles.button} ${styles.aButton}`}
          onMouseDown={createSoundAction(actions.onA)}
        >
          A
        </button>
      </div>

      <div className={styles.systemButtons}>
        <button className={styles.selectButton} onClick={handleSelectBtn}>
          SELECT
        </button>
        <button className={styles.startButton} onClick={handleStartBtn}>
          START
        </button>
      </div>
    </div>
  );
}
