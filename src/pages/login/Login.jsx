import React from 'react'
import style from './Login.module.css'
import heroSection from '../../assets/login-section.png'
import { IoRemoveOutline } from "react-icons/io5"

const Login = () => {
  return (
    <main className={style.loginContainer}>
        <section className={style.loginHeroSection}>
            <h1 className={style.loginHeroSectionTitle}>
                <span className={style.indexOne}>I</span>
                <span className={style.indexTwo}>D</span>
                <span className={style.indexThree}>O</span>
                <div className={style.square}>
                    <IoRemoveOutline className={style.lineLeft} />
                    <IoRemoveOutline className={style.lineMiddle} />
                    <IoRemoveOutline className={style.lineRight} />
            </div>
            </h1>
            <h2 className={style.loginHeroSectionSlogan}>i can do it!</h2>
            <img src={heroSection} className={style.loginHeroSectionImage} alt='hero section' />
        </section>
        <form className={style.loginForm}>
            <h3 className={style.loginFormTitle}>Time to work!</h3>
            <div className={style.inputGroups}>
                <div className={style.inputGroup}>
                    <label htmlFor='email' className={style.label}>email</label>
                    <input type='text' id='email' name='email' className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor='password' className={style.label}>password</label>
                    <input type='password' id='password' name='password' className={style.input} />
                </div>
            </div>
            <button type='submit' className={style.submitButton}>sign in</button>
        </form>
    </main>
  )
}

export default Login