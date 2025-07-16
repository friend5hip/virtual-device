import { useState, useEffect } from "react";
import { playSound } from "../../util/playSound";
import completeSound from "../../assets/level-up-enhancement-8-bit-retro-sound-effect-153002.mp3";
import type { TimerMode } from "./types";

const POMODORO_DURATION = 25 * 60; // 25분
const SHORT_BREAK_DURATION = 5 * 60; // 5분
const LONG_BREAK_DURATION = 15 * 60; // 15분
const POMODOROS_UNTIL_LONG_BREAK = 4; // 긴 휴식까지 필요한 포모도로 횟수

interface UsePomodoroTimerResult {
  mode: TimerMode;
  timeLeft: number;
  pomodoroCount: number;
  handleAButton: () => void;
  handleBButton: () => void;
  handleUpButton: () => void;
  handleDownButton: () => void;
  handleLeftButton: () => void;
  handleRightButton: () => void;
  isActive: boolean;
  isPaused: boolean;
}

export function usePomodoroTimer(): UsePomodoroTimerResult {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [durations, setDurations] = useState({
    pomodoro: POMODORO_DURATION,
    shortBreak: SHORT_BREAK_DURATION,
    longBreak: LONG_BREAK_DURATION,
  });
  const [timeLeft, setTimeLeft] = useState(durations.pomodoro);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(
    function timerEffect() {
      let interval: NodeJS.Timeout | undefined = undefined;

      if (isActive && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        playSound({ sound: completeSound });

        // 다음 모드로 자동 전환
        if (mode === "pomodoro") {
          const newPomodoroCount = pomodoroCount + 1;
          setPomodoroCount(newPomodoroCount);
          if (newPomodoroCount % POMODOROS_UNTIL_LONG_BREAK === 0) {
            setMode("longBreak");
            setTimeLeft(durations.longBreak);
          } else {
            setMode("shortBreak");
            setTimeLeft(durations.shortBreak);
          }
        } else {
          // 휴식 시간이 끝났을 때
          setMode("pomodoro");
          setTimeLeft(durations.pomodoro);
        }
        setIsActive(false); // 다음 세션은 자동으로 시작하지 않도록 설정
        setIsPaused(false); // 타이머 완료 시 일시정지 상태 해제
      }

      // 컴포넌트가 언마운트되거나 isActive, timeLeft가 변경될 때 인터벌 정리
      return () => clearInterval(interval);
    },
    [isActive, timeLeft, mode, pomodoroCount, durations]
  );

  const toggleTimer = () => {
    if (isActive) {
      setIsActive(false);
      setIsPaused(true); // 활성 상태에서 A 버튼 누르면 일시정지
    } else if (isPaused) {
      setIsActive(true);
      setIsPaused(false); // 일시정지 상태에서 A 버튼 누르면 다시 시작
    } else {
      setIsActive(true);
      setIsPaused(false); // 비활성 상태에서 A 버튼 누르면 시작
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false); // 리셋 시 일시정지 상태 해제
    setTimeLeft(durations[mode]); // 현재 모드에 맞는 저장된 시간으로 리셋
  };

  // 수동으로 모드 변경하는 함수
  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setIsPaused(false); // 모드 변경 시 일시정지 상태 해제
    setTimeLeft(durations[newMode]);
  };

  // 각 버튼에 대한 핸들러 함수
  const handleAButton = () => {
    toggleTimer();
  };

  const handleBButton = () => {
    resetTimer();
  };

  const handleUpButton = () => {
    if (mode === "pomodoro") {
      switchMode("shortBreak");
    } else if (mode === "shortBreak") {
      switchMode("longBreak");
    } else {
      switchMode("pomodoro");
    }
  };

  const handleDownButton = () => {
    if (mode === "pomodoro") {
      switchMode("longBreak");
    } else if (mode === "longBreak") {
      switchMode("shortBreak");
    } else {
      switchMode("pomodoro");
    }
  };

  const handleLeftButton = () => {
    if (mode === "pomodoro") {
      setTimeLeft((prevTimeLeft) => {
        const newTime = Math.max(60, prevTimeLeft - 60);
        setDurations((prev) => ({ ...prev, [mode]: newTime }));
        return newTime;
      });
    }
  };

  const handleRightButton = () => {
    if (mode === "pomodoro") {
      setTimeLeft((prevTimeLeft) => {
        const newTime = Math.min(60 * 60, prevTimeLeft + 60);
        setDurations((prev) => ({ ...prev, [mode]: newTime }));
        return newTime;
      });
    }
  };

  return {
    mode,
    timeLeft,
    pomodoroCount,
    handleAButton,
    handleBButton,
    handleUpButton,
    handleDownButton,
    handleLeftButton,
    handleRightButton,
    isActive,
    isPaused,
  };
}
