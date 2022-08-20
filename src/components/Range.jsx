import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Range(props) {
  const [value, setValue] = useState(props.init)

  useEffect(() => {
    if (props.reset)
      setValue(props.init)
  }, [props.reset, props.init])

  return (
    <label className='flex'>
      <span>{props.title}: {value}{props.units}</span>
      <input
        type={'range'}
        name={props.name}
        value={value}
        onChange={e => {
          setValue(e.target.value)
          props.update(e)
        }}
        min={props.bounds[0]}
        max={props.bounds[1]}
        step={1}
      />
    </label>
  )
}

Range.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  init: PropTypes.number,
  bounds: PropTypes.array,
  units: PropTypes.string,
  update: PropTypes.func,
  reset: PropTypes.bool
}

Range.defaultProps = {
  title: 'Range',
  name: 'range',
  init: 0,
  bounds: [0, 10],
  units: '',
  update: e => console.log(e.target.value),
  reset: false
}

export default Range