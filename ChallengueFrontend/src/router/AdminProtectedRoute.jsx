import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';

const AdminProtectedRoute = ({ element, isAdmin , isAuthenticated}) => {
    const location = useLocation();
    return isAdmin && isAuthenticated ? element : <Navigate to="/" state={{from:location}} replace />;
};
AdminProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default AdminProtectedRoute;
