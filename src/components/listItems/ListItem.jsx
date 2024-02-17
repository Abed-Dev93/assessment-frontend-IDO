import React, { useState,Suspense } from 'react'
import style from './ListItem.module.css'
import { useListContext } from '../../contexts/ListProvider'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import LoadingFallback from '../loadingFallback/LoadingFallback'

const ListItem = ({ title, category, date, estimate, unit, importance, id, list, onDragStart }) => {

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

  const [isNotEditing, setIsNotEditing] = useState(true)
  const [formData, setFormData] = useState({
    title,
    category,
    date,
    estimate,
    unit,
    importance
  })
  const { isNotFound, searchValue } = useListContext()

  const handleInputClick = () => {
    setIsNotEditing(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${process.env.REACT_PATH_APP}/ListItem/UpdateListItem/${id}`, formData)
      toastNotification(true)
      setIsNotEditing(true)
    }
    catch(error) {
      console.log(error.message)
      toastNotification(false)
    }
  }

  const handleCancelEdit = (e) => {
    e.preventDefault()
    setIsNotEditing(true)
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
        <meta name='description' content='choose how to manage your task on your own preferences' />
        <meta name='keywords' content='time, priority, category, tasks type' />
      </Helmet>
    <Suspense fallback={<LoadingFallback />}>
      { isNotEditing ?
      <section className={style.listItemsContainer} draggable onDragStart={(e) => onDragStart(e)}>
        <h2 className={ !isNotFound && searchValue === title ? style.listItemTitleHighlighted : style.listItemTitle } onClick={handleInputClick}>{title}</h2>
          <article className={style.listItemInfo}>
            <div className={style.listItemInfoGroup}>
              <h3 className={style.listItemInfoGroupTitle}>category</h3>
              <p className={style.listItemInfoGroupValue} onClick={handleInputClick}>{category}</p>
            </div>
            <div className={style.listItemInfoGroup}>
              <h3 className={style.listItemInfoGroupTitle}>due date</h3>
              <p className={style.listItemInfoGroupValue} onClick={handleInputClick}>{date}</p>
            </div>
            <div className={style.listItemInfoGroup}>
              <h3 className={style.listItemInfoGroupTitle}>estimate</h3>
              <div className={style.commonInputs}>
                <p className={style.listItemInfoGroupValue} onClick={handleInputClick}>{estimate}</p>
                <p className={style.listItemInfoGroupValue} onClick={handleInputClick}>{unit}</p>
              </div>
            </div>
            <div className={style.listItemInfoGroup}>
              <h3 className={style.listItemInfoGroupTitle}>importance</h3>
              <p className={ 
                (importance === 'high') ? style.importanceHigh :
                  (importance === 'medium') ? style.importanceMedium : style.importanceLow
              } onClick={handleInputClick}>{importance}</p>
            </div>
          </article>
      </section>
      :
      <form className={style.listItemsContainer} onSubmit={handleSubmit}>
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
            <div className={style.formSubmit}>
            <button type='submit' className={style.saveButton}>Save</button>
            <button className={style.cancelButton} onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      </form>
    }
    </Suspense>
    </>
  )
}

export default ListItem