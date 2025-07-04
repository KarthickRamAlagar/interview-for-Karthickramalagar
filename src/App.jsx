import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import GridPage from './pages/GridPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<GridPage />} />
    </Routes>
  )
}

export default App
