import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimer, decreaseTimer, resetTimer } from "@store/actions";
import styles from "./Timer.module.scss";
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

  useEffect(() => {
    const remainingTime = endDate - Date.now();
    setTimeLeft(remainingTime);
    dispatch(decreaseTimer());
  })
  useEffect(() => {
    if (endDate) {
      const interval = setInterval(() => {
        const remainingTime = endDate - Date.now();
        setTimeLeft(remainingTime);
        dispatch(decreaseTimer());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [endDate, dispatch]);

  useEffect(() => {
    if (endDate) {
      const interval = setInterval(() => {
        const remainingTime = endDate - Date.now();
        setTimeLeft(remainingTime);
        dispatch(decreaseTimer());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [endDate, dispatch]);

  useEffect(() => {
    const updateQuote = () => {
      const quote =
        existentialQuotes[Math.floor(Math.random() * existentialQuotes.length)];
      const appendix =
        appendixes[Math.floor(Math.random() * appendixes.length)];
      setRandomMessage(
        quote.replace("{days}", Math.floor((endDate - Date.now()) / 86400 / 1000)) + appendix
      );
    };

    updateQuote();
    const interval = setInterval(updateQuote, 7500);

    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    const years = prompt("Enter years left:"); //TODO: should open a form to input user's age, and then calculate the "death" date for user.
    const dateEnd = Date.now() + years * 365 * 24 * 60 * 60 * 1000;
    if (years && !isNaN(years)) {
      dispatch(setTimer(dateEnd)); 
    }
  };

  const reset = () => dispatch(resetTimer());

  return (
    <section className={styles.timer}>
      <h1 className={styles.timer__title}>Existential Timer</h1>
      <h1 className={styles.timer__subtitle}>You approximately have around:</h1>
      <p className={styles.timer__time}>
        {Math.floor(timeLeft / (365 * 24 * 60 * 60 * 1000))} years {" "}
        {Math.floor((timeLeft % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000))} months{" "}
        {Math.floor((timeLeft % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000))} days{" "}
        {Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))} hours{" "}
        {Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))} minutes{" "} 
        {Math.floor(timeLeft % (60 * 1000) / 1000)} seconds left.
        {/* {Math.floor(timeLeft / (365 * 24 * 60 * 60))}:
        {Math.floor((timeLeft % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60))}:
        {Math.floor((timeLeft % (30 * 24 * 60 * 60)) / (24 * 60 * 60))}:
        {Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60))}:
        {Math.floor((timeLeft % (60 * 60)) / 60)}:{Math.floor(timeLeft % 60)} */}
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
