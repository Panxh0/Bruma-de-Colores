import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const navigate = useNavigate();

    return (
        <div className = 'login-container'>
            <div className= 'login-box'>
                <div className = 'logo'>
                    <img src = "/images/logo.jpg" className = "logo-image"/>
                </div>
                
                <h1>Iniciar Sesión 🥸</h1>

                <form className='login-form'>
                    <div className = 'input-group'>
                        <label htmlFor='email'>Correo Electrónico</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email' 
                            required 
                            placeholder='tucorreo@ejemplo.com' />
                    </div>

                    <div className = 'input-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            required 
                            placeholder='Ingresa tu contraseña' />
                    </div>


                    <button type='submit' className='login-button'>Iniciar Sesión</button>

                </form>

                <div className = 'login-footer'>
                    <h3>¿No tienes una cuenta aún?</h3>
                    <a href='/register'> Regístrate aquí</a>
                    <br />    
                    <a href='/forgot-password'>¿Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;