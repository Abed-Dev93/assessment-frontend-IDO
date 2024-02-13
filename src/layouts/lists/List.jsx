import React, { useEffect, useState } from 'react'
import style from './List.module.css'
import { RxHamburgerMenu } from "react-icons/rx"
import { FaListCheck } from "react-icons/fa6"
import { TiInputChecked } from "react-icons/ti"
import ListItem from '../../components/listItems/ListItem'
import { useQuoteContext } from '../../contexts/QuoteProvider'
import { useListContext } from '../../contexts/ListProvider'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const List = () => {

  const { isCloseIconNotClicked } = useQuoteContext()
  const { listArray } = useListContext()
  const [lists, setLists] = useState([])

  useEffect(() => {
    const fetchLists = async () => {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/List/Index`)
      setLists(response.data.lists)
    }
    fetchLists()
  }, [])

  const listTitles = [
    {
      title: 'to do',
      icon: <RxHamburgerMenu className={style.todoIcon} />
    },
    {
      title: 'doing',
      icon: <FaListCheck className={style.doingIcon} />
    },
    {
      title: 'done',
      icon: <TiInputChecked className={style.doneIcon} />
    }
  ]

  const dragStarted = (e, listTitle) => {
    e.dataTransfer.setData('list', listTitle)
  }

  const dragOver = (e) => {
    e.preventDefault()
  }

  const dragDropped = (e, targetList) => {
    let currentList = e.dataTransfer.getData('list')
    console.log(`${currentList} Dragged successfully to ${targetList}!`)
    const draggedItem = listArray.find(item => item.title === currentList)
    if (draggedItem) {
      const updateListArray = listArray.map(item => item.title === currentList ? { ...item, targetList } : item)
    }
  }

  return (
    <>
      <Helmet>
        <meta name='description' content='Lists of items which belongs to specific tasks provided for the users' />
        <meta name='keywords' content='time management, task management, list of tasks' />
      </Helmet>
      <section className={ isCloseIconNotClicked ? style.lists : style.listsUp }>
        {
          listTitles.map((item, i) => (
            <article className={style.listContainer} key={i} droppable='true' onDragOver={(e) => dragOver(e)} onDrop={(e) => dragDropped(e, item.title)}>
              <div className={style.listHeader}>
                {item.icon}
                <h2 className={style.listTitle}>{item.title}</h2>
              </div>
              <div className={style.listItems}>
                {listArray
                  .filter((list) => list.list === item.title)
                  .map((listItem, j) => (
                    <ListItem
                      key={j}
                      id={j}
                      title={listItem.title}
                      category={listItem.category}
                      date={listItem.date}
                      estimate={listItem.estimate}
                      unit={listItem.unit}
                      importance={listItem.importance}
                      list={listItem.list}
                      onDragStart={(e) => dragStarted(e, listItem.list)}
                    />
                  ))}
              </div>
            </article>
          ))
        }
      </section>
      </>
  )
}

export default List