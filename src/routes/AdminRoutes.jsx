import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'

const AdminRoutes = ({ children, roll }) => {

    console.log(roll);

    return roll !== 'admin'? <Navigate to='/' /> : children

    
}

AdminRoutes.propTypes  = {
    children: PropTypes.node.isRequired,
    roll: PropTypes.string.isRequired
}
export default AdminRoutes