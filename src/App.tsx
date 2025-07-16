import { useReducer } from "react";
import styles from "./App.module.css";
import { Device } from "./components/Device/Device";
import Footer from "./components/Footer/Footer";
import { LucideCircleQuestionMark } from "lucide-react";
import Help from "./components/Help/Help";

function App() {
  const [isHelpVisible, setIsHelpVisible] = useReducer((v) => !v, false);

  return (
    <>
      <LucideCircleQuestionMark
        width={48}
        height={48}
        className={styles.questionIcon}
        onMouseEnter={setIsHelpVisible}
        onMouseLeave={setIsHelpVisible}
      />
      {isHelpVisible && <Help />}
      <div className={styles.container}>
        <Device />
        <Footer />
      </div>
    </>
  );
}

export default App;
