import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'
import { useAuth } from "../hooks/authContext";

const PrivateRoutes = ({ children }) => {

    const { auth } = useAuth();

   

    return !auth.isAuthenticated ? <Navigate to='/' /> : children


}


PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired,

}


export default PrivateRoutes