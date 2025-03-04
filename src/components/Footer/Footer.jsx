import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        {/* <p className={styles.footer__text}>
          Better make the best of your time here, dont you? Code brought by
          r3ichal
        </p> */}
        <a
          href="https://github.com/r3ichal"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          GitHub
        </a>
        <p className={styles.footer__text}>
          ©{new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
