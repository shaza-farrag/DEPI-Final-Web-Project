import {Routes , Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Dashboard from './pages/dashboard/Dashboard'


function App() {

  const router = createBrowserRouter ([
    {
      path : "/",
      exact : true ,
      element : <>
      <section className='main'>
        <Header/>
        
      </section>
      {/* <Dashboard/> */}
      </>
    }
  ])
  return (
      
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/dashboard" element={<Dashboard />} />
    // </Routes>

  <>
  <RouterProvider router={router} />
  {/* <Dashboard/>  */}
 </> 
    
  )
}

export default App
