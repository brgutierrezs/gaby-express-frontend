import { Outlet } from "react-router-dom"
import AdminHeader from "../private/AdminHeader"
import { Footer } from "../public/Footer"

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">

      <p>estas en el admin Layout</p>
      {/* Header */}
      <AdminHeader />

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

export default AdminLayout