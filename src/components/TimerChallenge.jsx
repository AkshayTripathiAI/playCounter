import { useState, useRef, useEffect } from "react";
import ResultModal from "./ResultModal";

function bestScoreKey(targetTime) {
  return `playCounter.best.${targetTime}`;
}

function readBestScore(targetTime) {
  try {
    const stored = localStorage.getItem(bestScoreKey(targetTime));
    return stored === null ? null : Number(stored);
  } catch {
    return null;
  }
}

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const startedAt = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => readBestScore(targetTime));
  const [isNewBest, setIsNewBest] = useState(false);

  const timerIsActive =
    !finished && timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // Clear any running interval when the component unmounts.
  useEffect(() => () => clearInterval(timer.current), []);

  // Side effects (stopping the interval, opening the dialog, saving the best
  // score) belong in an effect, not in the render body.
  useEffect(() => {
    if (!finished) return;
    clearInterval(timer.current);

    if (timeRemaining > 0) {
      const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
      const previousBest = readBestScore(targetTime);
      if (previousBest === null || score > previousBest) {
        setBestScore(score);
        setIsNewBest(true);
        try {
          localStorage.setItem(bestScoreKey(targetTime), String(score));
        } catch {
          // ignore storage errors
        }
      }
    }
    dialog.current.open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function handleReset() {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    setFinished(false);
    setIsNewBest(false);
  }

  function handleStart() {
    clearInterval(timer.current);
    startedAt.current = performance.now();
    // Measure real elapsed time instead of assuming each tick is exactly
    // 10 ms (browsers throttle intervals, especially in background tabs).
    timer.current = setInterval(() => {
      const elapsed = performance.now() - startedAt.current;
      const remaining = targetTime * 1000 - elapsed;
      setTimeRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(timer.current);
        setFinished(true);
      }
    }, 10);
    setTimeRemaining(targetTime * 1000 - 1);
  }

  function handleStop() {
    clearInterval(timer.current);
    const elapsed = performance.now() - startedAt.current;
    setTimeRemaining(targetTime * 1000 - elapsed);
    setFinished(true);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        bestScore={bestScore}
        isNewBest={isNewBest}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? "Stop" : "Start"} Challenge
        </button>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running ..." : "Timer inactive"}
        </p>
        <p className="best-score">
          Best: {bestScore === null ? "-" : bestScore}
        </p>
      </section>
    </>
  );
}

// A ref is a good fit for values (like the interval id) that don't affect the
// UI directly but must survive re-renders.
