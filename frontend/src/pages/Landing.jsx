import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import { Outlet } from "react-router-dom"

export default function Landing() {
  return (
    <div>
      <Header />
      <main className="pt-[88px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
