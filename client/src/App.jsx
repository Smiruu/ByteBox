import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterScreen from './screens/RegisterScreen'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
       <Routes>
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
    </Router>
    </>
  )
}

export default App
