
import { Outlet } from "react-router-dom"


import Header from "./Header";
import { Footer } from "./Footer";


const PublicLayout = () => {



    return (
        <div className="flex flex-col min-h-screen bg-indigo-50">

            {/* Header */}
            <Header />

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

export default PublicLayout