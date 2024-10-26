import React, { useRef, useState, useEffect } from "react";
import style from "./Counter.module.css";

const getLocalStorage = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

/**
 * Counter component for tracking volleyball scores and sets.
 *
 * @component
 * @example
 * return (
 *   <Counter />
 * )
 *
 * @returns {JSX.Element} The Counter component.
 *
 * @description
 * This component maintains the state for home and away scores, the time for a timeout, and the sets played.
 * It provides functionality to increment and decrement scores, set a timeout, move to the next set, remove the latest set, and reset all scores and sets.
 *
 * @function
 * @name Counter
 *
 * @state {number} homeScore - The score of the home team.
 * @state {function} setHomeScore - Function to update the home score.
 * @state {number} awayScore - The score of the away team.
 * @state {function} setAwayScore - Function to update the away score.
 * @state {number} time - The timeout countdown time.
 * @state {function} setTime - Function to update the timeout countdown time.
 * @state {Array} playedSets - The list of played sets with scores.
 * @state {function} setPlayedSets - Function to update the list of played sets.
 *
 * @ref {object} timeRef - Reference to the timeout button element.
 * @constant {object} audio - Audio object for playing notification sound.
 *
 * @useEffect
 * Updates localStorage with the current home score, away score, and played sets whenever they change.
 *
 * @function homeScoreUp - Increments the home score by 1.
 * @function homeScoreDown - Decrements the home score by 1, if it's greater than 0.
 * @function awayScoreUp - Increments the away score by 1.
 * @function awayScoreDown - Decrements the away score by 1, if it's greater than 0.
 * @function setTimeout - Starts a 30-second timeout countdown and plays a notification sound when the countdown ends.
 * @function nextSet - Adds the current scores to the list of played sets and resets the scores.
 * @function removeSet - Removes the latest set from the list of played sets.
 * @function reset - Resets the home score, away score, played sets, and timeout countdown time to their initial values.
 */
const Counter = () => {
  const [homeScore, setHomeScore] = useState(() =>
    getLocalStorage("homeScore", 0)
  );
  const [awayScore, setAwayScore] = useState(() =>
    getLocalStorage("awayScore", 0)
  );
  const [time, setTime] = useState(() => getLocalStorage("time", 30));
  const [playedSets, setPlayedSets] = useState(() =>
    getLocalStorage("playedSets", [])
  );
  const timeRef = useRef();
  const audio = new Audio("./audio/notification.mp3");

  useEffect(() => {
    localStorage.setItem("homeScore", JSON.stringify(homeScore));
    localStorage.setItem("awayScore", JSON.stringify(awayScore));
    localStorage.setItem("playedSets", JSON.stringify(playedSets));
  }, [homeScore, awayScore, playedSets]);

  const homeScoreUp = () => {
    setHomeScore(homeScore + 1);
  };

  const homeScoreDown = () => {
    if (homeScore === 0) return;
    setHomeScore(homeScore - 1);
  };

  const awayScoreUp = () => {
    setAwayScore(awayScore + 1);
  };

  const awayScoreDown = () => {
    if (awayScore === 0) return;
    setAwayScore(awayScore - 1);
  };

  const setTimeout = () => {
    let countdownTime = 30;
    timeRef.current.disabled = true;
    timeRef.current.style.backgroundColor = "#f1f1f1";
    const interval = setInterval(() => {
      countdownTime--;
      setTime(countdownTime);
      if (countdownTime === 0) {
        clearInterval(interval);
        timeRef.current.disabled = false;
        audio.play();
      }
    }, 1000);
  };

  const nextSet = () => {
    setPlayedSets([...playedSets, { home: homeScore, away: awayScore }]);
    setHomeScore(0);
    setAwayScore(0);
  };
  const removeSet = () => {
    const newSets = [...playedSets];
    newSets.pop();
    setPlayedSets(newSets);
  };

  const reset = () => {
    setHomeScore(0);
    setAwayScore(0);
    setPlayedSets([]);
    setTime(30);
  };

  return (
    <>
      <section>
        <h1 className={style.title}>Sets</h1>
        <ul className={style.setList}>
          {playedSets.map((set, index) => (
            <li key={index}>
              {set.home} - {set.away}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1 className={style.title}>Scores</h1>
        <div className={style.score}>
          <div className={style.score__container}>
            <h2>Home</h2>
            <h2>{homeScore}</h2>
            <div className={style.score__count}>
              <button onClick={homeScoreUp}>+</button>
              <button onClick={homeScoreDown}>-</button>
            </div>
          </div>
          <div className={style.score__container}>
            <h2>Away</h2>
            <h2>{awayScore}</h2>
            <div className={style.score__count}>
              <button onClick={awayScoreUp}>+</button>
              <button onClick={awayScoreDown}>-</button>
            </div>
          </div>
        </div>
      </section>
      <section className={style.button__container}>
        <div className={style.time__container}>
          <button
            ref={timeRef}
            className={style.main__button}
            onClick={setTimeout}
          >
            Timeout
          </button>
          <h2>{time}</h2>
        </div>
        <button className={style.main__button} onClick={nextSet}>
          Next Set
        </button>
        <button className={style.main__button} onClick={removeSet}>
          Remove latest set
        </button>
        <button
          className={`${style.main__button} ${style.red}`}
          onClick={reset}
        >
          Reset
        </button>
      </section>

      <footer>
        Made with ❤️ by <a href="lennertvg.be">Lennert Van Geert</a>
      </footer>
    </>
  );
};

export default Counter;
