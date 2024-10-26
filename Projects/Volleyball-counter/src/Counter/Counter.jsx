import React, { useState } from "react";
import style from "./Counter.module.css";

//counter for a volleyball game
const Counter = () => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [time, setTime] = useState(30);
  const [playedSets, setPlayedSets] = useState([]);

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

  // pressed when there's a timeout and starts a 30 second countdown
  const setTimeout = () => {
    let time = 30;
    const interval = setInterval(() => {
      time--;
      setTime(time);
      if (time === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  // pressed when a team wins a set and saves scores to be displayed in sets section
  const nextSet = () => {
    setPlayedSets([...playedSets, { home: homeScore, away: awayScore }]);
    setHomeScore(0);
    setAwayScore(0);
  };

  const reset = () => {
    setHomeScore(0);
    setAwayScore(0);
    setPlayedSets([]);
  };

  return (
    <>
      <section>
        <h1 className={style.title}>Sets</h1>
        <ul>
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
          <button className={style.main__button} onClick={setTimeout}>Timeout</button>
          <h2>{time}</h2>
        </div>
        <button className={style.main__button} onClick={nextSet}>Next Set</button>
        <button className={style.main__button} onClick={reset}>Reset</button>
      </section>
    </>
  );
};

export default Counter;
