import React from 'react'
import style from './LoadingFallback.module.css'

const LoadingFallback = () => {
  return (
    <div className={style.loadingFallbackContainer}>
        <div className={style.spinner}></div>
    </div>
  )
}

export default LoadingFallback