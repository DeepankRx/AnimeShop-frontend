import React from 'react'
import { DATA } from '../constant'
import styles from '../styles/css/loader.module.css'
const SplashScreen = () => {
  return (
    <div className='w-[100vw] h-[400px] flex justify-center items-center flex-col'>
      <div className={styles.loader}></div>
      <div className='mt-4 uppercase text-2xl font-bold text-black'>Welcome to {DATA.site_name}</div>
    </div>
  )
}

export default SplashScreen