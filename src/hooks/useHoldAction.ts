import { useRef } from "react";

export function useHoldAction(action: () => void, delay = 150) {
  const intervalRef = useRef<number | null>(null);

  const onMouseDown = () => {
    action();
    intervalRef.current = window.setInterval(action, delay);
  };

  const onMouseUp = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return {
    onMouseDown,
    onMouseUp,
    onMouseLeave: onMouseUp,
  };
}
