import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimer, decreaseTimer, resetTimer } from "@store/actions";
import styles from "./Timer.module.scss";
//TODO: Make a settings modal to select theme, language and timer output view (full like right now or just numbers)
//TODO: More quotes




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
  const timeLeft = useSelector((state) => state.timer.timeLeft);
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        dispatch(decreaseTimer());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft, dispatch]);

  useEffect(() => {
    const updateQuote = () => {
      const quote =
        existentialQuotes[Math.floor(Math.random() * existentialQuotes.length)];
      const appendix =
        appendixes[Math.floor(Math.random() * appendixes.length)];
      setRandomMessage(
        quote.replace("{days}", Math.floor(timeLeft / 86400)) + appendix
      );
    };

    updateQuote();
    const interval = setInterval(updateQuote, 10000);

    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    const years = prompt("Enter years left:"); //TODO: should open a form to input user's age, and then calculate the "death" date for user.
    if (years && !isNaN(years)) {
      dispatch(setTimer(years * 365 * 24 * 60 * 60));
    }
  };

  const reset = () => dispatch(resetTimer());

  return (
    <section className={styles.timer}>
      <h1 className={styles.timer__title}>Existential Timer</h1>
      <h1 className={styles.timer__subtitle}>You approximately have around:</h1>
      <p className={styles.timer__time}>
        {Math.floor(timeLeft / (365 * 24 * 60 * 60))} years{" "}
        {Math.floor((timeLeft % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60))}
        months {Math.floor(
          (timeLeft % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
        )}{" "}
        days {Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60))} hours{" "}
        {Math.floor((timeLeft % (60 * 60)) / 60)} minutes{" "}
        {Math.floor(timeLeft % 60)} seconds
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
