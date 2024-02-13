import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const ListContext = createContext()

export const ListProvider = ({ children }) => {

    const [isNotFound, setIsNotFound] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [listItems, setListItems] = useState([])

    useEffect(() => {
      const fetchListItems = () => {
          const response = axios.get(`${process.env.REAACT_APP_PATH}/ListItem/Index`)
          setListItems(response.data)
      }
      fetchListItems()
    }, [])

    const listArray = [
        {
          title: 'any',
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
          title: 'would',
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
          title: 'have',
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
          importance: 'low',
          list: 'doing'
        },
      ]

      const handleInputSearchChange = (e) => {
        setSearchValue(e.target.value)
        }

      const handleSearchClick = () => {
        const foundItem = listArray.find(item => item.title === searchValue)
        setIsNotFound(!foundItem)
      }

  return (
    <ListContext.Provider value={{ listArray, handleSearchClick, isNotFound, searchValue, handleInputSearchChange, searchValue }}>
        {children}
    </ListContext.Provider>
  )
}

export const useListContext = () => {
  return useContext(ListContext)
}