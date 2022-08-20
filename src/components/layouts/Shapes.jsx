import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Alert from '../Alert'
import Form from '../Form'
import Range from '../Range'
import '../../styles/Shapes.css'

export const initShape = {
  name: '',
  rateType: null,
  color: '#ff4f4f',
  data: []
}

export const rateType = {
  star: '☆',
  percentage: '%'
}

export default function Shapes() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [graph, setGraph] = useState(state)
  const [shape, setShape] = useState(initShape)
  const [addData, setAddData] = useState(false)
  const [rate, setRate] = useState(0)
  const [reset, setReset] = useState(false)

  return (<>{
    graph === null ? <Alert /> : (<>
      <h1 className='title'><i>{graph.title}</i> Graph</h1>

      <div className='info'>
        <h3 className='monospace'>Graph Information:</h3>
        <ul className='init'>
          <li><label className='flex'>
            <span>Categories:</span>
            {graph.categories.map((value, index) => (
              <b key={index}>
                {value}
                {index < graph.categories.length - 1 && <span>,</span>}
              </b>
            ))}
          </label></li>
          <li>Levels: {graph.levels}</li>
        </ul>
      </div>

      <div className='shapes-list'>
        <h3 className='monospace title'>Shapes List:</h3>
        <ul className='init'>{
          graph.shapes.length === 0 ? <span>Empty</span> : (
            graph.shapes.map((value, index) =>
              <li key={index} style={{ color: value.color }}>{value.name}</li>
            )
          )}
        </ul>
        {graph.shapes.length > 0 && <button onClick={() => {
          navigate('../../result', {
            state: graph,
            replace: false
          })
        }}>Create Graph</button>}
      </div>

      <div className='create-shape'>
        <h3 className='monospace title'>Create New Shape:</h3>
        {addData ? (<>
          <div>
            <h3 className='monospace'>Shape Info:</h3>
            <ul className='init'>
              <li>Name: {shape.name}</li>
              <li>Color: {shape.color}</li>
              <li>Rate Type: {shape.rateType}</li>
            </ul>
          </div>

          <div>
            <h3 className='monospace'>Data List:</h3>
            <ul className='init'>{
              shape.data.length === 0 ? <span>Empty</span> : (
                shape.data.map((value, index) => (
                  <li key={index}>{graph.categories[index]}: {value}{shape.rateType}</li>
                ))
              )
            }</ul>
          </div>

          {shape.data.length < graph.categories.length ? (
            <label className='flex'>
              <Range
                title={`${graph.categories[shape.data.length]} Rate`}
                bounds={[0, shape.rateType === rateType.star ? graph.levels : 100]}
                units={shape.rateType}
                update={e => {
                  setReset(false)
                  setRate(parseInt(e.target.value))
                }}
                reset={reset}
              />

              <button onClick={() => {
                setReset(true)
                setShape(old => {
                  return {
                    ...old, data: [
                      ...old.data, rate
                    ]
                  }
                })
                setRate(0)
              }}>Add</button>
            </label>
          ) : <button onClick={() => {
            setGraph(old => {
              return {
                ...old, shapes: [
                  ...old.shapes, shape
                ]
              }
            })
            setAddData(false)
            setShape(initShape)
          }}>Create Shape</button>}
        </>) : <Form
          submit={shape => {
            setShape(shape)
            setAddData(true)
          }}
        />}
      </div>
    </>)
  }</>)
}