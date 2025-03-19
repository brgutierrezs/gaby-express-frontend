import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  // FaBars,
  // FaTimes,
  FaPlus
} from 'react-icons/fa';
import { useAuth } from '../../hooks/authContext';


const DashBoardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth } = useAuth();
  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  // Menú items del dashboard
  const menuItems = [
    { icon: <FaUser className="text-red-600" />, label: "Mi Perfil", path: "/dashboard/profile" },
    { icon: <FaShoppingBag className="text-red-600" />, label: "Mis Pedidos", path: "/dashboard/orders" },
    { icon: <FaMapMarkerAlt className="text-red-600" />, label: "Mis Direcciones", path: "/dashboard/addresses" },
    { icon: <FaCreditCard className="text-red-600" />, label: "Métodos de Pago", path: "/dashboard/payment" },
    { icon: <FaHeart className="text-red-600" />, label: "Favoritos", path: "/dashboard/wishlist" },
    { icon: <FaCog className="text-red-600" />, label: "Configuración", path: "/dashboard/settings" },
    { icon: <FaSignOutAlt className="text-red-600" />, label: "Cerrar Sesión", path: "/dashboard/cerrar-session" },
    { icon: <FaPlus className="text-red-600" />, label: "Agregar Producto", path: "/admin-dashboard/create-product" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen  bg-gray-100 ">
      {/* Barra de navegación para móvil */}
      {/* <div className="bg-white p-4 flex justify-between items-center shadow-md md:hidden">
        <h1 className="text-xl font-bold text-red-600">GabyExpress</h1>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-gray-100 text-red-600 focus:outline-none"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div> */}

      {/* Sidebar (navegación lateral) */}
      <div className=" flex flex-col md:w-64 bg-white shadow-sm border-r border-gray-200 rounded-sm flex-shrink-0 fit-content  ">
        {/* Encabezado de sidebar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-xl">
              {auth.user?.username?.charAt(0)?.toUpperCase() || 'G'}
            </div>
            <div>
              <h2 className="font-bold">{auth.user?.username || 'Usuario'}</h2>
              <p className="text-sm text-gray-500">{auth.user?.email || 'usuario@ejemplo.com'}</p>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="py-4 px-2 overflow-y-auto">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay para cerrar el sidebar en móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}


    </div>
  );
};

export default DashBoardAdmin;