import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import { Outlet } from "react-router-dom"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full" style={{ paddingTop: '108px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
