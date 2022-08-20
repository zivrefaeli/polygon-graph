import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Range from '../Range'
import '../../styles/Create.css'

export default function Create() {
  const navigate = useNavigate()
  const [graph, setGraph] = useState({
    title: '',
    categories: [],
    levels: 5,
    angle: 0,
    shapes: []
  })
  const [category, setCategory] = useState('')

  const onStringChange = e => {
    setGraph(old => {
      return {
        ...old, [e.target.name]: e.target.value
      }
    })
  }

  const onNumberChange = e => {
    setGraph(old => {
      return {
        ...old, [e.target.name]: parseInt(e.target.value)
      }
    })
  }

  return (
    <>
      <h1 className='title'>Create New Graph</h1>
      <form className='flex' onSubmit={e => {
        e.preventDefault()

        if (graph.title === '') {
          alert('Enter graph title')
          return
        } else if (graph.categories.length < 3) {
          alert('Add at list 3 categories')
          return
        }

        navigate(`../${graph.title}`, {
          state: graph,
          replace: false
        })
      }}>
        <label className='flex'>
          <input
            type={'text'}
            name={'title'}
            value={graph.title}
            onChange={onStringChange}
            placeholder={'Type graph title'}
          />
          <span className='alert'>*</span>
        </label>

        <div className='categories'>
          <h2 className='monospace'>Categories List:</h2>
          <ul>{
            graph.categories.length === 0 ? <span>Empty</span> : (
              graph.categories.map((value, index) => (
                <li key={index}>{value}</li>
              ))
            )
          }</ul>
          <label className='flex'>
            <input
              type={'text'}
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder={'Type a category'}
            />
            <button onClick={() => {
              if (category === '')
                return
              setGraph(old => {
                return {
                  ...old, categories: [
                    ...old.categories, category
                  ]
                }
              })
              setCategory('')
            }} type='button'>Add</button>
          </label>
        </div>
        <Range
          title={'Levels'}
          name={'levels'}
          bounds={[3, 10]}
          init={graph.levels}
          update={onNumberChange}
        />
        <button>Create Graph</button>
      </form>
    </>
  )
}