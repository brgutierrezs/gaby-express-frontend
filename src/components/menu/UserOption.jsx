import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { FaUserCircle } from "react-icons/fa"; // Importamos el icono
const UserOption = ({ auth, toggleLoginModal }) => {
    //console.log(auth)
    return (
        <>
            {auth.isAuthenticated ?
                <>
                    <Link to='/dashboard/cerrar-session' className="hover:text-gray-200">
                        Cerrar session
                    </Link>
                    <Link to='/cart' className="hover:text-gray-200">
                        🛒 Cart
                    </Link>
                    <Link to='/dashboard' className="flex items-center gap-2 hover:text-gray-200">
                        <FaUserCircle size={24} className="text-white" />
                        <span>Bienvenido {auth.user.username}</span>
                    </Link>
                </>
                :
                <>
                    <Link onClick={toggleLoginModal}>Iniciar Sesion</Link>
                    <Link to="/register" className="hover:text-gray-200">
                        Registrarse
                    </Link>
                    <Link to='/cart' className="hover:text-gray-200">
                        🛒 Cart
                    </Link>
                </>}
        </>
    )
}

UserOption.propTypes = {
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    toggleLoginModal: PropTypes.func.isRequired
};

export default UserOption