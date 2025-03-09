import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimer, decreaseTimer, resetTimer, setStyle } from "@store/actions";
import styles from "./Timer.module.scss";
import { getStyle } from "../../store/selectors";
//TODO: Make a settings modal to select theme, language and timer output view (full like right now or just numbers)
//TODO: More quotes
//TODO: store the final date rather than just seconds left, so that when you return to the timer you would still have up-to-date info

const existentialQuotes = [
  "Time is slipping, better do something.",
  "While you're here, why not get some coffee?",
  "You have {days} days left, use them wisely... or don't.",
  "Existence is pain, but at least you have a countdown.",
  "Enjoying your sweet time? Tick-tock.",
  "Entropy wins. Might as well do something fun.",
  "Doesn't seem like you have that much time left. huh?",
];

const appendixes = [
  " But hey, no pressure.",
  " At least it's your choice.",
  " Or you could just stare at this timer.",
  " Maybe start that project you've been putting off.",
  " Nothing matters, but you can still pretend it does.",
];

const Timer = () => {
  const dispatch = useDispatch();
  const endDate = useSelector((state) => state.timer.endDate);
  const [randomMessage, setRandomMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const initialStyle = useSelector(getStyle);
  const [isShortFormat, setShortFormat] = useState(initialStyle);

  useEffect(() => {
    const remainingTime = endDate - Date.now();
    setTimeLeft(remainingTime);
    dispatch(decreaseTimer());
  }, []);
  useEffect(() => {
    if (endDate) {
      const remainingTime = endDate - Date.now();
      setTimeLeft(remainingTime > 0 ? remainingTime : 0);
    } else {
      setTimeLeft(0);
    }
  }, [endDate]);

  useEffect(() => {
    if (endDate) {
      const interval = setInterval(() => {
        const remainingTime = endDate - Date.now();
        setTimeLeft(remainingTime > 0 ? remainingTime : 0);
        dispatch(decreaseTimer());
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeLeft(0);
    }
  }, [endDate, dispatch]);

  useEffect(() => {
    console.log(endDate);
  }, [endDate]);

  useEffect(() => {
    const updateQuote = () => {
      const quote =
        existentialQuotes[Math.floor(Math.random() * existentialQuotes.length)];
      const appendix =
        appendixes[Math.floor(Math.random() * appendixes.length)];
      setRandomMessage(
        quote.replace(
          "{days}",
          Math.floor((endDate - Date.now()) / 86400 / 1000)
        ) + appendix
      );
    };

    updateQuote();
    const interval = setInterval(updateQuote, 7500);

    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    const years = prompt("Enter years left:");
    const dateEnd = Date.now() + years * 365 * 24 * 60 * 60 * 1000;
    if (years && !isNaN(years)) {
      dispatch(setTimer(dateEnd));
    }
  };

  const toggleStyle = () => {
    const newStyle = !isShortFormat;
    setShortFormat(newStyle);
    dispatch(setStyle(newStyle));
    console.log(timeLeft);
  };

  const reset = () => dispatch(resetTimer());

  return (
    <section className={styles.timer}>
      <label htmlFor="timerStyleToggle" className={styles.toggleLabel}>
        Switch Timer Style
      </label>
      <input
        type="checkbox"
        id="timerStyleToggle"
        checked={isShortFormat}
        onChange={toggleStyle}
        className={styles.toggleInput}
      />
      <h1 className={styles.timer__title}>Existential Timer</h1>
      <h1 className={styles.timer__subtitle}>You approximately have around:</h1>
      <p className={styles.timer__time}>
        {isShortFormat ? (
          <>
            {Math.floor(timeLeft / (365 * 24 * 60 * 60 * 1000))}:
            {Math.floor(
              (timeLeft % (365 * 24 * 60 * 60 * 1000)) /
                (30 * 24 * 60 * 60 * 1000)
            )}
            :
            {Math.floor(
              (timeLeft % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
            )}
            :{Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))}
            :{Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))}:
            {Math.floor((timeLeft % (60 * 1000)) / 1000)}
            <br />
            left
          </>
        ) : (
          <>
            {Math.floor(timeLeft / (365 * 24 * 60 * 60 * 1000))} years{" "}
            {Math.floor(
              (timeLeft % (365 * 24 * 60 * 60 * 1000)) /
                (30 * 24 * 60 * 60 * 1000)
            )}{" "}
            months{" "}
            {Math.floor(
              (timeLeft % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
            )}{" "}
            days{" "}
            {Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))}{" "}
            hours {Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))}{" "}
            minutes {Math.floor((timeLeft % (60 * 1000)) / 1000)} seconds left.
          </>
        )}
      </p>
      <p className={styles.timer__quote}>{randomMessage}</p>
      <div className={styles["timer__button-wrapper"]}>
        <button className={styles.timer__button} onClick={startTimer}>
          Set Timer
        </button>
        <button className={styles.timer__button} onClick={reset}>
          Reset Timer
        </button>
      </div>
    </section>
  );
};

export default Timer;
