import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from '../firebaseConfig' // Importa la instancia de Auth

// 1. Crea el contexto
const AuthContext = createContext();

// Hook personalizado para usar la autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

  // Escucha el estado de autenticación de Firebase
    useEffect(() => {
    // onAuthStateChanged es la forma más robusta de manejar la sesión
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);

      // Actualiza el localStorage solo para el chequeo de la primera carga
        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            localStorage.removeItem('isLoggedIn');
        }
    });

    return unsubscribe; // Limpia el listener cuando el componente se desmonta
    }, []);

  // Función para cerrar sesión
    const logout = async () => {
    try {
        await signOut(auth);
      // El onAuthStateChanged se activará y pondrá currentUser en null automáticamente
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Error al cerrar sesión.");
    }
    };

    const value = {
        currentUser,
        loading,
        logout,
        isAuthenticated: !!currentUser,
    };

    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    );
};