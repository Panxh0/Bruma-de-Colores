import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext'; // Importa el hook del contexto

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

  // 1. Muestra un estado de carga mientras esperamos la respuesta de Firebase
    if (loading) {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
        Verificando estado de la sesión...
        </div>
    );
    }

  // 2. Si NO está autenticado, lo redirige a la página de login.
    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    }

  // 3. Si está autenticado, renderiza el componente hijo
    return children;
};

export default ProtectedRoute;