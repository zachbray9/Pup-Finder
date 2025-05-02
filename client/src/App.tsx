import { Outlet, ScrollRestoration } from "react-router"
import HorizontalNavbar from "./components/layout/horizontalNavbar"

function App() {
  return (
    <>
      <ScrollRestoration />
      <HorizontalNavbar />

      <div className="flex justify-center w-full">
        <Outlet />
      </div>
    </>
  )
}

export default App
