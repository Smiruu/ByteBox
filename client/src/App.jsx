import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import RegisterScreen from './screens/RegisterScreen'
import Login from './components/Login'
import HomeScreen from './screens/HomeScreen'
import TestingScreen from './screens/testingScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
       <Routes>
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<Login />} />
          Testing
          <Route path='/' element={<HomeScreen />} />
          <Route path='/testing' element={<TestingScreen />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
