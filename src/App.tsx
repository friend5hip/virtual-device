import { useReducer, useState } from "react";
import styles from "./App.module.css";
import { Device } from "./components/Device/Device";
import { Screen } from "./components/Screen/Screen";
import { Controls } from "./components/Controls/Controls";
import Footer from "./components/Footer/Footer";
import { LucideCircleQuestionMark } from "lucide-react";
import type { ScreenType } from "./components/types";
import Help from "./components/Help/Help";

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("title");
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
        <Device
          upper={<Screen currentScreen={currentScreen} />}
          lower={<Controls setCurrentScreen={setCurrentScreen} />}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
