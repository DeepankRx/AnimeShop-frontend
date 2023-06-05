import React from 'react';
import styles from '../styles/css/loader.module.css';
import backgrounds from '../styles/css/backgrounds.module.css';
const SplashScreen = () => {
  return (
    <>
      <div className="w-[100vw] h-[40vh] flex justify-center items-center flex-col">
        <div className={styles.loader}></div>
        <div className="mt-4 uppercase text-2xl font-bold text-black">Welcome to Animart</div>
      </div>
      <div className={`${backgrounds.bg_1} h-[60vh]`}></div>
    </>
  );
};

export default SplashScreen;
