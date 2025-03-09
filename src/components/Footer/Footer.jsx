import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => { //footer__text
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
        <div class={styles.footer__disclaimer}>
          <p class={styles.disclaimer__text}> 
            Disclaimer: This website does not promote or encourage death.
          </p>
          <p class={styles.disclaimer__full}>
            This website does not encourage or promote death in any form. It is
            simply a tool designed to estimate life expectancy based on
            user-provided data. The existential messages are intended to provoke
            thought and reflection on the nature of time, existence, and the
            human condition. Please remember that life is valuable, and if
            you're feeling overwhelmed or need support, it's important to seek
            help.
          </p>
        </div>
        <p className={styles.footer__text}>
          ©{new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
