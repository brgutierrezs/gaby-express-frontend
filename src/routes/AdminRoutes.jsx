import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'
import {useAuth} from "../hooks/authContext";

const AdminRoutes = ({ children }) => {

    const {auth} =  useAuth();
   

    return auth.user?.role !== 'admin'? <Navigate to='/' /> : children

    
}

AdminRoutes.propTypes  = {
    children: PropTypes.node.isRequired,
   
}
export default AdminRoutes