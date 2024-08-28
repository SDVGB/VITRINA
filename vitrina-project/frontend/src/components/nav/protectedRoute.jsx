import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, userRole, requiredRole, children }) => {
  // Si se requiere un rol específico y coincide con el rol del usuario
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  // Si el usuario está autenticado, renderiza los children
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
