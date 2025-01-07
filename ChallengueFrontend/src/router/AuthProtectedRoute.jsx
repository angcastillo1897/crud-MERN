import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';

const AuthProtectedRoute = ({ element, isAuthenticated}) => {
    const location = useLocation();
    return isAuthenticated ? element : <Navigate to="/" state={{from:location}} replace />;
};
AuthProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default AuthProtectedRoute;
