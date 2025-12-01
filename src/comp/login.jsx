import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {

    console.log("Renderizando componente Login");

    const [isSubmitting, setIsSubmitting] = useState(false); // para el estado de carga de la pagina.
    const [loginError, setLoginError] = useState(''); // para manejar errores de login.

    const [formData, setFormData] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(`Cambiando campo ${e.target.name} a ${e.target.value}`);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        console.log("Formulario enviado con datos:", formData); 

        e.preventDefault();
        setLoginError('');  // resetear el error antes de intentar iniciar sesion.
        setIsSubmitting(true);

        console.log("Intentando iniciar sesion con: ", formData.email, "y contraseña: ", formData.password);

        try {
            await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            
            // Si tiene éxito, se resuelve la promesa:
            console.log('Login exitoso. Redirigiendo a /home...');
            setIsSubmitting(false);
            
            // 🚨 El AuthContext se encarga de la sesión, solo navegamos.
            navigate('/homePage', { replace: true }); 
            
        } catch (error) {
            // 🚨 MANEJO DE ERROR FUERTE 🚨
            console.error("Error completo en el login:", error);
            
            let message = "Error desconocido.";
            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                message = "Correo electrónico o contraseña incorrectos.";
            } else if (error.code === 'auth/user-not-found') {
                message = "El usuario no existe.";
            } else {
                message = `Ocurrió un error: ${error.code.replace('auth/', '')}`;
            }
            
            setLoginError(message);
            setIsSubmitting(false); // Detiene el estado de carga
        }
    }

    return (
        <div className = 'login-container'>
            <div className= 'login-box'>
                <div className = 'login-logo'>
                    <img src = "/images/logo.jpg" className = "logo-image"/>
                </div>
                
                <h1>Iniciar Sesión ✨</h1>

                <form className='login-form' onSubmit={handleSubmit}>
                    <div className = 'input-group' >
                        <label htmlFor='email'>Correo Electrónico</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email' 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete='email'
                            placeholder='tucorreo@ejemplo.com' />
                    </div>

                    <div className = 'input-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            required 
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete='current-password'
                            placeholder='Ingresa tu contraseña' />
                    </div>

                    {loginError && <p className="error-message">{loginError}</p>}

                    <button type="submit" className="login-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Accediendo...' : 'Acceder'}
                    </button>

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