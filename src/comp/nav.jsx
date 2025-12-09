import './nav.css';
import './login.jsx';
import './register.jsx';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../comp/authContext';

const Nav = () => {

  const navigate = useNavigate()
  const { currentUser, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/homePage'); //redirecciona al home desde de cerrar sesion
  }

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <img className= "logo" src="images/logo.jpg"  />
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="./homePage">Home</a>
          </li>
        
        </ul>
        {isAuthenticated ? (
            //si está autenticado, muestra el botón de Cerrar Sesión
            <>
                <span className="user-email">{currentUser?.email || 'Usuario'}</span>
                <button className="nav-btn" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </>
        ) : (
            // Si NO está autenticado, muestra los botones de Login/Registro
            <>
                <button className="auth-button login" onClick={() => navigate('/login')}>
                    Iniciar Sesión
                </button>
                <button className="auth-button register" onClick={() => navigate('/register')}>
                    Crear una Cuenta
                </button>
            </>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;