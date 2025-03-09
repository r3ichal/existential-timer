import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setStyle } from "@store/actions";
import { getStyle } from "../../store/selectors";
import classNames from "classnames";

const Header = () => {
  const dispatch = useDispatch();
  const initialStyle = useSelector(getStyle);
  const [isShortFormat, setShortFormat] = useState(initialStyle);

  const toggleStyle = () => {
    const newStyle = !isShortFormat;
    setShortFormat(newStyle);
    dispatch(setStyle(newStyle));
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>EXT.TMR</h1>

      <div className={styles.navList}>
        <p className={styles.navLink}>How</p>
        <p className={styles.navLink}>Long</p>
        <p className={styles.navLink}>Do</p>
        <p className={styles.navLink}>You</p>
        <p className={styles.navLink}>Have</p>
        <p className={styles.navLink}>Left?</p>
        <p className={styles.navLink}></p>
        <button className={styles.navButton} onClick={toggleStyle}>
          <p htmlFor="timerStyleToggle" className={classNames(styles.navLink, styles["navLink--disabled"]) }>
            Short Format?
          </p>
          <input
            type="checkbox"
            id="timerStyleToggle"
            checked={isShortFormat}
            onChange={toggleStyle}
            className={styles.toggleInput}
          />
        </button>

        <p className={styles.navLink}></p>
        <a
          href="https://github.com/r3ichal"
          target="_blank"
          className={styles.navLink}
        >
          by r3ichal
        </a>
      </div>
    </header>
  );
};

export default Header;
