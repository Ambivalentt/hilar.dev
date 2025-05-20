import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import HomeDashboard from './pages/HomeDashBoard.jsx'
import GuestRoute from './components/GuestRoute.jsx'
import UserSettingsForm from './components/dashboard/UserSttingsForm.jsx'
import Projects from './pages/Projects.jsx'
import AllUserDetails from './components/dashboard/AllUserDetails.jsx'

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
      <Route path="/dashboard" element={<HomeDashboard />} >
        <Route index element={<Projects />} />
        <Route path="user-settings" element={<UserSettingsForm />} />
        <Route path="user-details" element={<AllUserDetails />} />
      </Route>


    </Routes>
  )
}

export default App
