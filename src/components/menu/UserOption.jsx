import { Link } from "react-router-dom"
import PropTypes from 'prop-types';


const UserOption = ({ auth, toggleLoginModal }) => {

    return (
        <>
            {auth.isAuthenticated ?
                <>
                    <Link to='/dashboard/cerrar-session' className="hover:text-gray-200" >Cerrar session</Link>
                    <Link to='/cart' className="hover:text-gray-200">🛒 Cart</Link>
                    <Link>{auth.user.email} </Link>
                </>
                :
                <>
                    <Link onClick={toggleLoginModal}>Iniciar Sesion</Link>
                    <Link to="/register" className="hover:text-gray-200 " > Registrarse</Link>
                    <Link to='/cart' className="hover:text-gray-200">🛒 Cart</Link>
                </>}
        </>
    )
}
UserOption.propTypes = {
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.shape({
            email: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    toggleLoginModal: PropTypes.func.isRequired
};


export default UserOption