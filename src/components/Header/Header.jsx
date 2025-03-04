import React from "react";
import styles from "./Header.module.scss";
const Header = () => {
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
        <a href="https://github.com/r3ichal" target="_blank" className={styles.navLink}>by r3ichal</a>
      </div>
    </header>
  );
};

export default Header;
