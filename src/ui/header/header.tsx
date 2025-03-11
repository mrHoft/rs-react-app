import React from 'react';

import styles from './header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        {/* <img height="100" src="/images/logo.png" alt="logo" /> */}
        <h3>RS React App</h3>
      </div>
      <div className={styles.header__right}></div>
    </header>
  );
};
