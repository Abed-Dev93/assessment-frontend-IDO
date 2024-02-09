import React, { useState } from 'react'
import style from './Quote.module.css'
import { FaCircleInfo } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

const Quote = () => {

  const [isCloseIconHovered, setIsCloseIconHovered] = useState(false)
  const [isCloseIconNotClicked, setIsCloseIconNotClicked] = useState(true)

  const toggleCloseIcon = () => {
    setIsCloseIconNotClicked(!isCloseIconNotClicked)
  }

  return (
    <section className={style.quoteContainer}>
    {isCloseIconNotClicked && <article className={style.quote} onMouseEnter={() => setIsCloseIconHovered(true)} onMouseLeave={() => setIsCloseIconHovered(false)}>
      <p className={style.quoteText}><i>"Anything that can go wrong, will go wrong!"</i></p>
      { isCloseIconHovered && (<IoMdClose className={style.closeIcon} onClick={toggleCloseIcon} />)}
    </article>}
    <FaCircleInfo className={ isCloseIconNotClicked ? style.infoIconHidden : style.infoIcon } onClick={toggleCloseIcon} />
    </section>
  )
}

export default Quote