import { useEffect, useState } from 'react';
import config from './config';
import styles from './trafficlight.module.css';

type TrafficLightKey = keyof typeof config;

const App = () => {
  const [currentActiveLight, setCurrentActiveLight] = useState<TrafficLightKey>('red');
  const [currentDuration, setCurrentDuration] = useState<number>(config[currentActiveLight].duration);

  useEffect(() => {
    let timerId: number | null = null;

    if (currentDuration <= 0) {
      if (timerId !== null) clearInterval(timerId);
      const nextLight = config[currentActiveLight].next;
      setCurrentActiveLight(nextLight);
      setCurrentDuration(config[nextLight].duration);
    } else {
      timerId = window.setInterval(() => {
        setCurrentDuration((prevDuration) => prevDuration - 1000);
      }, 1000);
    }

    return () => {
      if (timerId !== null) clearInterval(timerId);
    };
  }, [currentDuration, currentActiveLight]);

  return (
    <div className={styles.AppContainer}>
      <div className={styles.trafficWrapper}>
        {Object.keys(config).map((light) => (
          <div
            key={config[light as TrafficLightKey].id}
            className={styles.light}
            style={{ background: currentActiveLight === light ? light : '' }}
          ></div>
        ))}
      </div>
      <div className={styles.countdownContainer}>
        <span className={`${styles.countdownTime} ${styles.active}`}>
          {Math.floor(currentDuration / 1000)} Seconds
        </span>
      </div>
    </div>
  );
};

export default App;
