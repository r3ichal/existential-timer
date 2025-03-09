import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimer, decreaseTimer, resetTimer, setStyle } from "@store/actions";
import styles from "./Timer.module.scss";
import { getStyle } from "../../store/selectors";
//TODO: Make a settings modal to select theme, language and timer output view (full like right now or just numbers)
//TODO: store the final date rather than just seconds left, so that when you return to the timer you would still have up-to-date info

const existentialQuotes = [
  "Time is slipping, better do something.",
  "While you're here, why not get some coffee?",
  "You have {days} days left, use them wisely... or don't.",
  "Existence is pain, but at least you have a countdown.",
  "Enjoying your sweet time? Tick-tock.",
  "Entropy wins. Might as well do something fun.",
  "Doesn't seem like you have that much time left. huh?",
  "You're closer to the end than you think. Make it count.",
  "Each second that passes is a second you'll never get back. Think about that.",
  "Time waits for no one, not even you.",
  "You're still here, which means you're doing something... sort of.",
  "Every day is another opportunity... or just another day.",
  "Do you really want to waste the little time you have left?",
  "Your clock is ticking, don't let it run out.",
  "Life's a race, but nobody told you where the finish line is.",
  "Don't worry, it's all part of the process... whatever that is.",
  "The countdown never stops, but do you care?",
  "Life is measured in moments, but do any of them matter?",
  "The future is a mystery, but you can feel it slipping away.",
  "There's always time... until there isn't.",
  "Does it really matter if you stop the clock for a while?",
  "The more time you waste, the more you question time itself.",
  "You're still here. That's something... right?",
  "You can't escape time, but can you escape the thoughts that it brings?",
  "The clock ticks, and so do you. But for how long?",
  "Tick-tock, and with every tick, you're closer to... what?",
  "Is time running out, or is it just running in circles?",
];

const appendixes = [
  " But hey, no pressure.",
  " At least it's your choice.",
  " Or you could just stare at this timer.",
  " Maybe start that project you've been putting off.",
  " Nothing matters, but you can still pretend it does.",
  " Don't worry, you're definitely not running out of time... or are you?",
  " You could be doing something more productive, but why?",
  " Don't rush, there's always time... until there isn't.",
  " You're doing great, or at least you're here.",
  " Who needs to worry about the end when you have a timer counting it down?",
  " No pressure, just an existential crisis and a ticking clock.",
  " Time is a concept... and so is everything else, probably.",
  " Live fast, die... at some point.",
  " You know, procrastination is a way of taking control of your time... or something.",
  " Embrace Nihilism, while you still can.",
  " While we at it, how was your day?",
  " Enjoy the fleeting seconds while they last.",
  " Just keep counting, eventually, it'll all be over.",
  " Seconds turn into minutes, minutes turn into hours... but who's counting?",
  " The clock's ticking. Are you still trying to figure it all out?",
  " Do what you love... if you even know what that is.",
  " Time flies when you're not looking. But when you are, it's terrifying.",
  " Maybe the clock is your friend... or your enemy, depends on your perspective.",
  " Time is relative, but your deadline is not.",
  " Maybe you're running out of time... maybe you're just running in place.",
  " Is the timer your guide, or is it just a reminder?",
  " This timer is here, whether you're ready or not.",
  " The end is near... but it might be closer than you think.",
  " Time is the cruelest cut.",
  " Birth is a promise - death its fulfillment.",
  " I have seen the future - you're not in it.",
  " Live, Laugh, Love Factorio",
];

const Timer = () => {
  const dispatch = useDispatch();
  const endDate = useSelector((state) => state.timer.endDate);
  const isShortFormat = useSelector(getStyle);
  const [randomMessage, setRandomMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

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

  const reset = () => dispatch(resetTimer());

  return (
    <section className={styles.timer}>
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
