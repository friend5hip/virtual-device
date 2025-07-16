import { useMemo, useState } from "react";
import styles from "./Device.module.css";
import { Screen } from "../Screen/Screen";
import { Controls } from "../Controls/Controls";
import type { ScreenType } from "../Screen/types";
import { usePomodoroTimer } from "../../features/PomodoroTimer/usePomodoroTimer.ts";
import { formatTime } from "../../util/formatTime.ts";

export function Device() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("title");
  const pomodoroTimer = usePomodoroTimer();

  const actions = useMemo(() => {
    switch (currentScreen) {
      case "timer":
        return {
          onA: pomodoroTimer.handleAButton,
          onB: pomodoroTimer.handleBButton,
          onUp: pomodoroTimer.handleUpButton,
          onDown: pomodoroTimer.handleDownButton,
          onLeft: pomodoroTimer.handleLeftButton,
          onRight: pomodoroTimer.handleRightButton,
        };
      case "title":
        return {
          onA: () => {},
          onB: () => {},
          onUp: () => {},
          onDown: () => {},
          onLeft: () => {},
          onRight: () => {},
        };
      default:
        return {};
    }
  }, [currentScreen, pomodoroTimer]);

  return (
    <div className={styles.device}>
      <div className={styles.upper}>
        <Screen
          currentScreen={currentScreen}
          timeLeft={pomodoroTimer.timeLeft}
          mode={pomodoroTimer.mode}
          pomodoroCount={pomodoroTimer.pomodoroCount}
          formatTime={formatTime}
          isActive={pomodoroTimer.isActive}
          isPaused={pomodoroTimer.isPaused}
        />
      </div>
      <div className={styles.lower}>
        <Controls setCurrentScreen={setCurrentScreen} actions={actions} />
      </div>
    </div>
  );
}
