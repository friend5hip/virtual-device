import React, { useEffect, useState } from "react";
import styles from "./PomodoroTimer.module.css";
import type { TimerMode } from "./types";
import { pickRandomPhrase } from "../../util/pickRandomPhrase";

interface PomodoroTimerProps {
  timeLeft: number;
  mode: TimerMode;
  pomodoroCount: number;
  formatTime: (seconds: number) => string;
  isActive: boolean;
  isPaused: boolean;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  timeLeft,
  mode,
  pomodoroCount,
  formatTime,
  isActive,
  isPaused,
}) => {
  const [phrase, setPhrase] = useState<string>("");
  useEffect(
    function pickPhrase() {
      setPhrase(pickRandomPhrase());
    },
    [isActive, isPaused]
  );

  return (
    <div className={styles.pomodoroContainer}>
      {isActive ? (
        <div className={styles.phrase}>{phrase}</div>
      ) : isPaused ? (
        <div className={styles.phrase}>Paused</div>
      ) : (
        <div className={styles.modeDisplay}>
          <span className={mode === "pomodoro" ? styles.activeMode : ""}>
            Pomodoro
          </span>
          <span className={mode === "shortBreak" ? styles.activeMode : ""}>
            Short Break
          </span>
          <span className={mode === "longBreak" ? styles.activeMode : ""}>
            Long Break
          </span>
        </div>
      )}
      <div className={styles.timerDisplay}>
        <h1>{formatTime(timeLeft)}</h1>
      </div>
      <p className={styles.pomodoroCount}>Completed: {pomodoroCount}</p>
    </div>
  );
};

export default PomodoroTimer;
