import { useEffect } from "react";
import type { ScreenType } from "./types";
import type { TimerMode } from "../../features/PomodoroTimer/types";
import PomodoroTimer from "../../features/PomodoroTimer/PomodoroTimer";
import styles from "./Screen.module.css";
import Title from "./Title";

interface ScreenProps {
  currentScreen: ScreenType;
  timeLeft: number;
  mode: TimerMode;
  pomodoroCount: number;
  formatTime: (seconds: number) => string;
  isActive: boolean;
  isPaused: boolean;
}

export function Screen({
  currentScreen,
  timeLeft,
  mode,
  pomodoroCount,
  formatTime,
  isActive,
  isPaused,
}: ScreenProps) {
  useEffect(() => {
    if (currentScreen === "timer") {
      const formattedTime = formatTime(timeLeft);
      let titleText = `${formattedTime}`;
      if (isPaused) {
        titleText = `PAUSED: ${titleText}`;
      } else if (isActive) {
        titleText = `${titleText}`;
      }
      document.title = `${titleText} | Virtual Device`;
    } else {
      document.title = "Virtual Device";
    }
  }, [timeLeft, mode, isActive, isPaused, currentScreen, formatTime]);

  return (
    <div className={styles.deviceScreen}>
      {currentScreen === "title" && <Title />}
      {currentScreen === "timer" && (
        <PomodoroTimer
          timeLeft={timeLeft}
          mode={mode}
          pomodoroCount={pomodoroCount}
          formatTime={formatTime}
          isActive={isActive}
          isPaused={isPaused}
        />
      )}
    </div>
  );
}
