import React from 'react';
import './nav.css';
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import './login.jsx';
import './register.jsx';


const Nav = () => {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="nav">
      <div className = 'navbar-logo'>
        <img className="logo-image" src="/images/logo.jpg" />
      </div>

      <button className = 'menu-toggle'onClick = {toggleMenu}>
        <MdOutlineMenu />
      </button>

      <div className={`navbar-links ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <button className='nav-button'>Inicio</button>
        <button className='nav-button'>Categorias</button>
        <button className='nav-button'>Nuevos Juguetes</button>
        <button className='nav-button'>Lista de Deseados</button>
      </div>

      <div className='navbar-actions'>
        <button className = 'icon-buttons'>
          <span role = 'img' aria-label = 'Buscar'><FaSearch /></span>
        </button>
        <button className='login-button' href = './login.jsx'>Inicio de Sesion</button>
        <button className='register-button' href = './register.jsx'>Crear Cuenta</button>
      </div>
    </nav>
  );
};

export default Nav;