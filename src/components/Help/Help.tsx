import styles from "./Help.module.css";

function Help() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>SELECT: Go to title</p>
        <p>START: Pomodoro Timer</p>
        <p>UP / DOWN: Change mode</p>
        <p>LEFT / RIGHT: Adjust time</p>
        <p>A: Start / Pause</p>
        <p>B: Initialize</p>
      </div>
    </div>
  );
}

export default Help;
