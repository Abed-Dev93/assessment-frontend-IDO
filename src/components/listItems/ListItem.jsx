import React, { useState } from 'react'
import style from './ListItem.module.css'

const ListItem = ({ title, category, date, estimate, unit, importance, list }) => {

  const [isNotEditing, setIsNotEditing] = useState(true)
  const [formData, setFormData] = useState({
    title,
    category,
    date,
    estimate,
    unit,
    importance
  })

  const handleInputClick = () => {
    setIsNotEditing(false)
  }

  const handleCardSave = (e) => {
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
    <section className={style.listItemsContainer}>
      { isNotEditing ?
      <>
        <h2 className={style.listItemTitle} onClick={handleInputClick}>{title}</h2>
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
                (importance === 'medium') ? style.importanceMedium :
                  (importance === 'low') ? style.importanceLow : style.importanceHidden
            } onClick={handleInputClick}>{importance}</p>
          </div>
        </article>
      </>
      : list === 'to do' ?
      <>
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
            <input type='text' id='unit' name='unit' value={unit} onChange={handleInputChange} className={style.listItemInfoGroupValueEdit} />
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
        <button type='submit' className={style.saveButton} onClick={handleCardSave}>Save</button>
      </article>
    </> : <p style={{ color: '#f00' }} >Not allowed to edit here!</p>
    }
    </section>
  )
}

export default ListItem