import { ButtonComponent } from "../../../components/common/ButtonComponent"




export const Register = () => {
    return (


        <div className="flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Register</h2>

                <form>

                    <div className="mb-4">
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                            Nombre de usuario
                        </label>
                        <input
                            id="usuario"
                            type="usuario"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder=" Nombre"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="email@ejemplo.com"
                        />
                    </div>

                    <ButtonComponent />

                </form>

            </div>

        </div>

    )
}
