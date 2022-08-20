import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { initShape, rateType } from './layouts/Shapes'

function Form({ submit }) {
  const [shape, setShape] = useState(initShape)

  const onStringChange = e => {
    setShape(old => {
      return {
        ...old, [e.target.name]: e.target.value
      }
    })
  }

  return <form className='flex' onSubmit={e => {
    e.preventDefault()
    if (shape.name === '' || shape.rateType === null) {
      alert('Fill all required fields')
    } else {
      submit(shape)
    }
  }}>
    <label className='flex'>
      <input
        type={'text'}
        name={'name'}
        value={shape.name}
        onChange={onStringChange}
        placeholder={'Type shape name'}
      />
      <span className='alert'>*</span>
    </label>

    <label className='flex'>
      Rate Type:
      <span>
        <input
          onChange={onStringChange}
          type={'radio'}
          name={'rateType'}
          value={rateType.star}
        />
        {rateType.star}
      </span>
      <span>
        <input
          onChange={onStringChange}
          type={'radio'}
          name={'rateType'}
          value={rateType.percentage}
        />
        {rateType.percentage}
      </span>
      <span className='alert'>*</span>
    </label>

    <label className='flex'>
      Shape Color:
      <input
        type={'color'}
        name={'color'}
        value={shape.color}
        onChange={onStringChange}
      />
    </label>

    <button>Continue</button>
  </form>
}

Form.propTypes = {
  submit: PropTypes.func
}

Form.defaultProps = {
  submit: value => console.log(value)
}

export default Form