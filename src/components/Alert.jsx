import React from 'react'
import { Link } from 'react-router-dom'

function Alert() {
  return (<>
    <h1 className='alert'>Graph data is <code>null</code></h1>
    <Link to={'/create'}>Create new graph</Link>
    <Link to={'/'}>Go home</Link>
  </>)
}

export default Alert