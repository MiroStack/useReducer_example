import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Counter } from './features/Counter'
import { Todo } from './features/ToDo';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Counter/>}/>
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
