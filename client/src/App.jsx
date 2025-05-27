import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import HomeDashboard from './pages/HomeDashBoard.jsx'
import {GuestRoute, PrivateRoute} from './components/GuestRoute.jsx'
import UserSettingsForm from './components/dashboard/UserSttingsForm.jsx'
import Projects from './pages/Projects.jsx'
import AllUserDetails from './components/dashboard/AllUserDetails.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'
import NotFoundPage from './pages/404.jsx'
import LandingPage from './pages/LandingPage.jsx'
const App = () => {

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={
        <GuestRoute>
          <Register />
        </GuestRoute>} />
      <Route path="/login" element={
        <GuestRoute>
          <Login />
        </GuestRoute>
      } />


      <Route path="/dashboard" element={<PrivateRoute> <HomeDashboard /> </PrivateRoute>} >
        <Route index element={<Projects />} />
        <Route path="user-settings" element={<UserSettingsForm />} />
        <Route path="user-details" element={<AllUserDetails />} />
        <Route path="project/:id" element={<ProjectDetails />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
