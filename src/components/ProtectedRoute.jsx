// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If user is not logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }

  return children; // If logged in, render the component they are trying to access
};

export default ProtectedRoute;