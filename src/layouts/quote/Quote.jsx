import React, { useState } from 'react'
import style from './Quote.module.css'
import { FaCircleInfo } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"
import { useQuoteContext } from '../../contexts/QuoteProvider'
import { Helmet } from 'react-helmet'

const Quote = () => {

  const [isCloseIconHovered, setIsCloseIconHovered] = useState(false)
  const { isCloseIconNotClicked, toggleCloseIcon } = useQuoteContext()

  return (
    <>
      <Helmet>
        <meta name='description' content='Header of specific informations provided for the users' />
        <meta name='keywords' content='cookies, warning' />
      </Helmet>
      <section className={ isCloseIconNotClicked? style.quoteContainer : style.quoteContainerClosed }>
      {isCloseIconNotClicked && <article className={style.quote} onMouseEnter={() => setIsCloseIconHovered(true)} onMouseLeave={() => setIsCloseIconHovered(false)}>
        <p className={style.quoteText}><i>"Anything that can go wrong, will go wrong!"</i></p>
        { isCloseIconHovered && (<IoMdClose className={style.closeIcon} onClick={toggleCloseIcon} />)}
      </article>}
      <FaCircleInfo className={ isCloseIconNotClicked ? style.infoIconHidden : `${style.infoIcon} ${style.infoIconAfterClose}` } onClick={toggleCloseIcon} />
      </section>
    </>
  )
}

export default Quote