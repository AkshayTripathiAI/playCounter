import { useState, useRef } from "react";

const STORAGE_KEY = "playCounter.playerName";

function readStoredName() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(readStoredName);

  function handleSubmit(event) {
    event.preventDefault();
    const name = playerName.current.value.trim();
    setEnteredPlayerName(name);
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      // storage unavailable (private mode etc.) - name just won't persist
    }
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName || "unknown entity"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="player-name" className="visually-hidden">
          Player name
        </label>
        <input
          id="player-name"
          ref={playerName}
          type="text"
          placeholder="Your name"
          maxLength={30}
        />
        <button type="submit">Set Name</button>
      </form>
    </section>
  );
}
