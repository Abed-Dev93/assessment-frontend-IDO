import React, { useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/logo-section.png'
import { IoMdSearch, IoIosAddCircleOutline, IoIosLogOut } from "react-icons/io"

const Navbar = () => {

  const [isSearchIconHovered, setIsSearchIconHovered] = useState(false)
  const [isAvatarNotClicked, setIsAvatarNotClicked] = useState(true)
  const [isAddIconNotClicked, setIsAddIconNotClicked] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    estimate: '',
    unit: '',
    importance: ''
  })

  const handleAddClick = () => {
    setIsAddIconNotClicked(false)
  }

  const handleCardAdd = (e) => {
    e.preventDefault()
    setIsAddIconNotClicked(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <header className={style.navbar}>
      <img src={logo} className={style.logo} alt='logo' />
      <section className={style.listControllers}>
        { isSearchIconHovered && (<input type='text' name='search' id='search' placeholder='What are you looking for?' className={style.searchInput} /> )}
        <IoMdSearch className={style.searchIcon} onMouseEnter={() => setIsSearchIconHovered(true)} onMouseLeave={() => setIsSearchIconHovered(false)} />
        <IoIosAddCircleOutline className={style.addIcon} onClick={handleAddClick} />
        <img src={logo} className={style.userAvatar} alt='user' onClick={() => setIsAvatarNotClicked(!isAvatarNotClicked)} />
        <article className={ isAvatarNotClicked ? style.userLogoutHidden : style.userLogout }>
        <img src={logo} className={style.userInfo} alt='user' />
        <div className={style.infoAndLogout}>
          <p className={style.userEmail}>anything@example.com</p>
          <p className={style.logout}>Log Out <IoIosLogOut className={style.logoutIcon} /></p>
        </div>
        </article>
      </section>
      <section className={ isAddIconNotClicked ? style.listItemsContainerHidden : style.listItemsContainer }>
      <input type='text' id='title' name='title' onChange={handleInputChange} />
      <article className={style.listItemInfo}>
        <div className={style.listItemInfoGroup}>
          <h3 className={style.listItemInfoGroupTitle}>category</h3>
          <input type='text' id='category' name='category' onChange={handleInputChange} />
        </div>
        <div className={style.listItemInfoGroup}>
          <h3 className={style.listItemInfoGroupTitle}>due date</h3>
          <input type='date' id='date' name='date' onChange={handleInputChange} />
        </div>
        <div className={style.listItemInfoGroup}>
          <h3 className={style.listItemInfoGroupTitle}>estimate</h3>
          <div className={style.commonInputs}>
            <input type='number' id='num' name='num' onChange={handleInputChange} className={style.listItemInfoGroupValueEdit} />
            <input type='text' id='unit' name='unit' onChange={handleInputChange} className={style.listItemInfoGroupValueEdit} />
          </div>
        </div>
        <div className={style.listItemInfoGroup}>
          <h3 className={style.listItemInfoGroupTitle}>importance</h3>
          <select id='importance' name='importance' onChange={handleInputChange}>
            <option value=''>None</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <button type='submit' className={style.saveButton} onClick={handleCardAdd}>Add</button>
      </article>
      </section>
    </header>
  )
}

export default Navbar