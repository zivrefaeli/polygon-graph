import React from 'react'
import { useNavigate } from 'react-router-dom'
import demo from '../../assets/demo.png'
import '../../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <h1 className='title'>Polygon Graph</h1>
      <p className='explain'>
        <span>Display your data in 2D shapes.</span>
        <i>For example:</i>
        <img src={demo} alt='example' />
      </p>
      <button onClick={() => {
        navigate('/create', { replace: false })
      }}>Create new graph</button>
    </>
  )
}