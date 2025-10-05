import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages'
import { TestPage } from './components'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  )
}

export default App