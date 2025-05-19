import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/DashBoard.jsx'
import GuestRoute from './components/GuestRoute.jsx'

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={
        <GuestRoute>
          <Register />
        </GuestRoute>} />
      <Route path="/login" element={
        <GuestRoute>
          <Login />
        </GuestRoute>
      } />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  )
}

export default App
