import { useEffect, useRef, useState } from "react"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import { Outlet } from "react-router-dom"

export default function Landing() {
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header ref={headerRef} />
      <main className="flex-1" style={{ paddingTop: headerHeight }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
