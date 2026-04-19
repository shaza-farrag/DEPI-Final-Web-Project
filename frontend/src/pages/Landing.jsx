import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import { Outlet } from "react-router-dom"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[92px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
