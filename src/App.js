import { Routes, Route } from 'react-router-dom'
import Home from './components/layouts/Home'
import Create from './components/layouts/Create'
import Shapes from './components/layouts/Shapes'
import Result from './components/layouts/Result'
import './styles/App.css'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='create'>
        <Route path='' element={<Create />} />
        <Route path=':graph' element={<Shapes />} />
      </Route>
      <Route path='result' element={<Result />} />
    </Routes>
  )
}