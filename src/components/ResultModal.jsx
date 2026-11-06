import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, bestScore, isNewBest, onReset },
  ref,
) {
  const dialog = useRef(null);

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (Math.max(remainingTime, 0) / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        if (!dialog.current.open) {
          dialog.current.showModal();
        }
      },
    };
  });

  return createPortal(
    // onClose fires for the Close button *and* the Escape key, so the
    // challenge is always reset when the dialog goes away.
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You Lost !!!</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      {!userLost && isNewBest && <p className="new-best">New best score!</p>}
      <progress value={targetTime * 1000 - Math.max(remainingTime, 0)} max={targetTime * 1000} />
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      {bestScore != null && (
        <p>
          Best score for this challenge: <strong>{bestScore}</strong>
        </p>
      )}
      <form method="dialog">
        <button autoFocus>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal"),
  );
});

export default ResultModal;

// To expose functions from a component to the parent through a ref we use
// forwardRef together with useImperativeHandle.
