import React, { useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/logo-section.png'
import { IoMdSearch, IoIosAddCircleOutline, IoIosLogOut } from "react-icons/io"
import { useListContext } from '../../contexts/ListProvider'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Navbar = () => {

  const toastNotification = (isSuccess) => {
    const message = isSuccess ? 'Accomplished' : 'Failed'
    const toastType = isSuccess ? toast.success : toast.error

    toastType(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const [isSearchIconHovered, setIsSearchIconHovered] = useState(false)
  const [isAvatarNotClicked, setIsAvatarNotClicked] = useState(true)
  const [isAddIconNotClicked, setIsAddIconNotClicked] = useState(true)
  const { handleSearchClick, handleInputSearchChange, searchValue } = useListContext()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    estimate: '',
    unit: '',
    importance: ''
  })

  const handleAddClick = () => {
    setIsAddIconNotClicked(!isAddIconNotClicked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_PATH}/ListItem/CreateListItem`, formData)
      toastNotification(true)
      setIsAddIconNotClicked(true)
    }
    catch(error) {
      console.log(error.message)
      toastNotification(false)
  }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <>
      <Helmet>
        <meta name='description' content='Header to get the access to all the required autorized pages' />
        <meta name='keywords' content='header, navbar, user profile and registration, avatar, search' />
      </Helmet>
      <header className={style.navbar}>
        <img src={logo} className={style.logo} alt='logo' />
        <section className={style.listControllers}>

          { isSearchIconHovered && (<input type='text' name='search' id='search' placeholder='What are you looking for?' className={style.searchInput} onMouseEnter={() => setIsSearchIconHovered(true)} onMouseLeave={() => setIsSearchIconHovered(false)} onChange={handleInputSearchChange} /> )}
          <IoMdSearch className={style.searchIcon} value={searchValue} onMouseEnter={() => setIsSearchIconHovered(true)} onMouseLeave={() => setIsSearchIconHovered(false)} onClick={handleSearchClick} type='submit' />
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
        <form className={ isAddIconNotClicked ? style.listItemsContainerHidden : style.listItemsContainer } onSubmit={handleSubmit}>
        <div className={style.listItemInfo}>
        <div className={style.listItemInfoGroup}>
            <h3 className={style.listItemInfoGroupTitle}>Title</h3>
            <input type='text' id='title' name='title' placeholder='title..' onChange={handleInputChange} />
          </div>
          <div className={style.listItemInfoGroup}>
            <h3 className={style.listItemInfoGroupTitle}>category</h3>
            <input type='text' id='category' name='category' placeholder='category..' onChange={handleInputChange} />
          </div>
          <div className={style.listItemInfoGroup}>
            <h3 className={style.listItemInfoGroupTitle}>due date</h3>
            <input type='date' id='date' name='date' onChange={handleInputChange} />
          </div>
          <div className={style.listItemInfoGroup}>
            <h3 className={style.listItemInfoGroupTitle}>estimate</h3>
            <div className={style.commonInputs}>
              <input type='number' id='num' name='num' placeholder='estimate..' onChange={handleInputChange} className={style.listItemInfoGroupValueEdit} />
              <input type='text' id='unit' name='unit' placeholder='unit..' onChange={handleInputChange} className={style.listItemInfoGroupValueEdit} />
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
          <button type='submit' className={style.addButton}>Add</button>
        </div>
        </form>
      </header>
    </>
  )
}

export default Navbar