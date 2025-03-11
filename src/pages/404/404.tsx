import React from 'react';
import { useNavigate } from 'react-router';

import styles from './404.module.css';

const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.nothing}>
      <div className={styles.nothing__frame}>
        <h2>(404) No such page</h2>
        {/* <img src="/images/nothing.png" alt="nothing" /> */}
      </div>
      <div className={styles.nothing__btns}>
        <button className="button" onClick={() => navigate('/')}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default Page404;
