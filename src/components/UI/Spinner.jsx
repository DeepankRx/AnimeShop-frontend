import React from 'react';
import styles from '../../styles/css/Spinner.module.css';
const Spinner = () => {
  return (
    <div className={styles.three_body}>
      <div className={styles.three_body__dot}></div>
      <div className={styles.three_body__dot}></div>
      <div className={styles.three_body__dot}></div>
    </div>
  );
};

export default Spinner;
