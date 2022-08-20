import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import init, { R, middle, clear, custom, shape, text, axes } from '../graph'
import { rateType } from './layouts/Shapes'

function convert(maxdot, p) {
  const k = p / 100, l = 1 - k
  return [
    maxdot[0] * k + middle[0] * l,
    maxdot[1] * k + middle[1] * l
  ]
}

function drawBaseShapes(levels, sides, angle, color) {
  let r = 0
  const dr = R / levels
  const total = [] // total[ring][line]

  for (let i = 0; i < levels; i++) {
    r += dr
    total.push(shape(sides, middle, {
      angle: angle,
      radius: r,
      lines: i === levels - 1,
      color: color
    }))
  }

  return total
}

function drawCustomShape(total, data, type, rings) {
  const dots = []

  for (let i = 0; i < data.length; i++) {
    const value = data[i]

    if (type === rateType.star) {
      const index = value - 1
      dots.push(index === -1 ?
        middle :
        total[index][i]
      )
    } else {
      dots.push(convert(
        total[rings - 1][i],
        value
      ))
    }
  }

  return dots
}

function draw(categories, levels, angle, shapes, settings) {
  // base shapes
  const total = drawBaseShapes(levels, categories.length, angle, settings.baseColor)

  // custom shapes
  shapes.forEach(shape => {
    custom(drawCustomShape(total, shape.data, shape.rateType, levels), {
      stroke: shape.color,
      fill: `${shape.color}80`
    })
  })


  // rate levels
  if (settings.levels) {
    for (let i = 0; i <= levels; i++) {
      text(String(i), middle[0], middle[1] + (R / levels) * i - 10)
    }
  }

  // categories
  const delta = 20
  const ring = shape(categories.length, middle, {
    angle: angle,
    radius: R + delta,
    lines: false,
    color: '#00000000'
  })
  for (let i = 0; i < categories.length; i++) {
    text(categories[i], ring[i][0], ring[i][1])
  }
}

function getStyle(border) {
  return border ? {
    borderWidth: 1
  } : {
    borderWidth: 0
  }
}

function Graph({ categories, levels, angle, shapes, settings, reference }) {
  useEffect(() => {
    init(document.querySelector('canvas.graph'))
  }, [])

  useEffect(() => {
    clear()
    if (settings.axes)
      axes()
    draw(categories, levels, angle, shapes, settings)
  }, [categories, levels, angle, shapes, settings])

  return <canvas ref={reference} style={getStyle(settings.border)} className='graph'></canvas>
}

Graph.propTypes = {
  categories: PropTypes.array,
  levels: PropTypes.number,
  angle: PropTypes.number,
  shapes: PropTypes.array,
  settings: PropTypes.object
}

Graph.defaultProps = {
  categories: ['C1', 'C2', 'C3', 'C4', 'C5'],
  levels: 5,
  angle: 30,
  shapes: [
    {
      name: 'shape 1',
      rateType: rateType.star,
      color: '#ff4f4f',
      data: [5, 2, 3, 4, 5]
    }
  ],
  settings: {
    border: false,
    axes: false,
    levels: true,
    baseColor: '#000000',
  },
  reference: null
}

export default Graph