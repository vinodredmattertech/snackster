import { Navigate } from 'react-router-dom';

/**
 * Unknown / missing content routes redirect to homepage
 * instead of showing a 404 page.
 */
const NotFound = () => <Navigate to="/" replace />;

export default NotFound;
