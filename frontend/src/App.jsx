import {Routes , Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import About from './pages/about/About'
import Landing from './pages/Landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
