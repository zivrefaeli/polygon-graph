import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { round } from '../../graph'
import Graph from '../Graph'
import Range from '../Range'
import Alert from '../Alert'
import '../../styles/Result.css'

function download(canvas, title) {
  const file = {
    type: 'image/png',
    name: `${title}.png`
  }
  const link = document.createElement('a')
  link.download = file.name
  link.href = canvas.toDataURL(file.type)
  link.dataset.downloadurl = [file.type, link.download, link.href].join(':')
  link.click()
}

function average(array) {
  let sum = 0
  array.forEach(element => {
    sum += element
  })
  return sum / array.length
}

export default function Result() {
  const { state } = useLocation()
  const [graph, setGraph] = useState(state)
  const [settings, setSettings] = useState({
    border: false,
    axes: false,
    levels: false,
    baseColor: '#0080ff',
  })
  const ref = useRef()

  const onStringChange = e => {
    setSettings(old => {
      return {
        ...old, [e.target.name]: e.target.value
      }
    })
  }

  const onCheckedChange = e => {
    setSettings(old => {
      return {
        ...old, [e.target.name]: e.target.checked
      }
    })
  }

  return graph === null ? <Alert /> : (<>
    <h1 className='title'>{graph.title}</h1>

    <Graph
      categories={graph.categories}
      levels={graph.levels}
      angle={graph.angle}
      shapes={graph.shapes}
      settings={settings}
      reference={ref}
    />

    <div>
      <h2 className='monospace'>Graph Style:</h2>
      <div className='flex-row'>
        <Range
          title={'Angle'}
          name={'angle'}
          init={0}
          bounds={[0, 360]}
          units={'°'}
          update={e => setGraph(old => {
            return {
              ...old, angle: parseInt(e.target.value)
            }
          })} />

        <label className='flex'>
          Base Color:
          <input
            type={'color'}
            name={'baseColor'}
            value={settings.baseColor}
            onChange={onStringChange}
          />
        </label>

        <label className='flex'>
          Border:
          <input
            type={'checkbox'}
            name={'border'}
            onChange={onCheckedChange}
            checked={settings.border}
          />
        </label>

        <label className='flex'>
          Axes:
          <input
            type={'checkbox'}
            name={'axes'}
            onChange={onCheckedChange}
            checked={settings.axes}
          />
        </label>

        <label className='flex'>
          Levels:
          <input
            type={'checkbox'}
            name={'levels'}
            onChange={onCheckedChange}
            checked={settings.levels}
          />
        </label>
      </div>
    </div>

    <div>
      <h2 className='monospace'>Shapes:</h2>
      <div className='flex-row'>{
        graph.shapes.map((value, index) => (
          <div key={index} className='shape'>
            <h2 className='monospace' style={{ color: value.color }}>{value.name}</h2>
            <ul>{
              value.data.map((data, i) => (
                <li key={i}>{graph.categories[i]}: {data}{value.rateType}</li>
              ))
            }</ul>
            <span>Average: {round(average(value.data))}{value.rateType}</span>
          </div>
        ))
      }</div>
    </div>

    <button
      className='download'
      onClick={() => download(ref.current, graph.title)}>
      Download Graph
    </button>
  </>)
}