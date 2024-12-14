import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'

const PrivateRoutes = ({ children, isAuthenticated }) => {

     
    console.log(isAuthenticated);

    return !isAuthenticated ? <Navigate to='/' /> : children


}


PrivateRoutes.propTypes  = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}


export default PrivateRoutes