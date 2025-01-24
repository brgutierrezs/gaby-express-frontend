import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'

const AdminRoutes = ({ children }) => {

    const roll = false
    console.log(roll);

    return roll !== 'admin'? <Navigate to='/' /> : children

    
}

AdminRoutes.propTypes  = {
    children: PropTypes.node.isRequired,
   
}
export default AdminRoutes