import React, { useState, useEffect, useContext } from 'react'
import style from './Login.module.css'
import heroSection from '../../assets/login-section.png'
import { IoRemoveOutline } from "react-icons/io5"
import axios from 'axios'
import { useUserContext } from '../../contexts/UserProvider'
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import Typed from 'typed.js'
import { Helmet } from 'react-helmet'

const Login = () => {

    const fetchUser = useContext(useUserContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const visiblePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
          ...formData,
          [name]: value
        })
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const response = await axios.post(`http://localhost:4000/User/Login`, formData, { withCredentials: true })
        const token = response.data.token
        localStorage.setItem('token', token)
        await fetchUser()
        setTimeout(() => { navigate('/ido', { replace: true }) }, 1000)
        console.error('False Credentials')
        }
        catch (error) {
            console.error("Error Logging in", error.response.data.error)
          }
    }

    useEffect(() => {
        const options = {
            strings: ['i can do it!'],
            typeSpeed: 80,
            backspeed: 30,
            showCursor: true
        }
        const typed = new Typed('.loginHeroSectionSlogan', options)
    }, [])

  return (
    <>
    <Helmet>
        <meta name='despription' content='Securely sign in into IDO account, Access personalized features and services designed for you, Log in now to enjoy a seamless experience!' />
        <meta name='keywords' content='sign in, login, user authetication' />
    </Helmet>
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
            <h2 className={`${style.loginHeroSectionSlogan} loginHeroSectionSlogan`}></h2>
            <img src={heroSection} className={style.loginHeroSectionImage} alt='hero section' />
        </section>
        <form className={style.loginForm} onSubmit={handleSubmit}>
            <h3 className={style.loginFormTitle}>Time to work!</h3>
            <div className={style.inputGroups}>
                <div className={style.inputGroup}>
                    <label htmlFor='email' className={style.label}>email</label>
                    <input type='text' id='email' name='email' className={style.input} onChange={handleInputChange} required />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor='password' className={style.label}>password</label>
                    <input type={ showPassword ? 'text' : 'password' } id='password' name='password' className={style.input} onChange={handleInputChange} required />
                    {
                        showPassword ? <span className={style.visibilityIcon} onClick={visiblePassword}><FiEyeOff /></span> :
                            <span className={style.visibilityIcon} onClick={visiblePassword}><FiEye /></span>
                    }
                </div>
            </div>
            <button type='submit' className={style.submitButton}>sign in</button>
        </form>
    </main>
    </>
  )
}

export default Login