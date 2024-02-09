import React from 'react'
import style from './IdoList.module.css'
import Navbar from '../../layouts/navbar/Navbar'
import Quote from '../../layouts/quote/Quote'
import List from '../../layouts/lists/List'

const IdoList = () => {
  return (
    <>
      <Navbar />
      <main className={style.listsContainer}>
        <Quote />
        <List />
      </main>
    </>
  )
}

export default IdoList