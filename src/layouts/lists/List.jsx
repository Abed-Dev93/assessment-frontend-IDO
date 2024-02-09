import React, { useState } from 'react'
import style from './List.module.css'
import { RxHamburgerMenu } from "react-icons/rx"
import { FaListCheck } from "react-icons/fa6"
import { TiInputChecked } from "react-icons/ti"
import ListItem from '../../components/listItems/ListItem'

const List = () => {

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

  const listArray = [
    {
      title: 'title',
      category: 'category',
      date: 'due date',
      estimate: '26',
      unit: 'cm',
      importance: 'high',
      list: 'to do'
    },
    {
      title: 'title',
      category: 'category',
      date: 'due date',
      estimate: '16',
      unit: 'cm',
      importance: 'high',
      list: 'to do'
    },
    {
      title: 'title',
      category: 'category',
      date: 'due date',
      estimate: '8',
      unit: 'cm',
      importance: 'low',
      list: 'to do'
    },
    {
      title: 'title',
      category: 'category',
      date: 'due date',
      estimate: '34',
      unit: 'cm',
      importance: 'high',
      list: 'to do'
    },
    {
      title: 'title',
      category: 'category',
      date: 'due date',
      estimate: '78',
      unit: 'cm',
      importance: 'medium',
      list: 'done'
    },
    {
      title: 'title',
      category: 'category',
      date: 'due date',
      estimate: '10',
      unit: 'cm',
      importance: '',
      list: 'doing'
    },
  ]

  return (
      <section className={style.lists}>
        {
          listTitles.map((item, i) => (
            <article className={style.listContainer} key={i}>
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
                      title={listItem.title}
                      category={listItem.category}
                      date={listItem.date}
                      estimate={listItem.estimate}
                      unit={listItem.unit}
                      importance={listItem.importance}
                      list={listItem.list}
                    />
                  ))}
              </div>
            </article>
          ))
        }
      </section>
  )
}

export default List