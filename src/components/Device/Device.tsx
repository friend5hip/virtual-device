import styles from "./Device.module.css";

interface DeviceProps {
  upper: React.ReactNode;
  lower: React.ReactNode;
}

export function Device({ upper, lower }: DeviceProps) {
  return (
    <div className={styles.device}>
      <div className={styles.upper}>{upper}</div>
      <div className={styles.lower}>
        {/* <div className={styles.logo}>Virtual Device</div> */}
        {lower}
      </div>
    </div>
  );
}
