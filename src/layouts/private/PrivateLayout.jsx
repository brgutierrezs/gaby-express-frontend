import { Outlet } from "react-router-dom"
import PrivateHeader from "../private/PrivateHeader"
import { Footer } from "../public/Footer"


const PrivateLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">

      <p>estas en el private layout</p>
      {/* Header */}
      <PrivateHeader />

      <main className="flex-grow bg-gray-100">

        <div className="container mx-auto px-4 py-8">

          <Outlet />

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default PrivateLayout