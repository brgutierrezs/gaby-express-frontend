

export const Footer = () => {
    return (
        <>
            <footer className="bg-gray-800 text-white">

                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <h3 className="font-bold mb-2">Sobre Nosotros</h3>
                            <p className="text-sm">Learn more about GabyExpress.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Customer Support</h3>
                            <p className="text-sm">Contact us for any queries.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Follow Us</h3>
                            <p className="text-sm">Stay updated on social media.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 text-center py-4 text-xs">
                    © 2024 GabyExpress. All rights reserved.
                </div>
            </footer>
        </>
    )
}
