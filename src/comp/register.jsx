import React, { useState } from 'react';
import './login.css';
import { auth } from '../firebaseConfig';
import  { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        //llamada a firebase
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        );

        console.log('Usuario Registrado con exito:', userCredential.user);
        alert('¡Felicidades, creaste tu cuenta con exito! 🥳, Ahora, inicia sesión.');
        navigate('/login');
        } catch (error) {
            console.log("Error en el registro:", error);
            alert(`Error al registrar la cuenta: ${error.message}` );
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Las  contraseñas no coinciden.');
            return;
        }
    };

    return (
        <div className='login-container'>
            <div className= 'login-box'>
                <div className='login-logo'>
                    <img src = './images/logo.jpg'></img>
                </div>

                <h2>Crea tu Cuenta! 🥳</h2>

                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='name'>Nombre Completo</label>
                        <input
                            type='text'
                            id= 'name'
                            name='name'
                            placeholder='Tu Nombre'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            placeholder="tucorreo@ejemplo.com" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            placeholder="*******" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirma tu Contraseña</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword"
                            placeholder="*******" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                            />
                    </div>

                    <button type="submit" className="login-button">
                        Registrar
                    </button>
                </form>

                <div className='login-footer'>
                    <p>¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link></p>
                </div>

            </div>
            
        </div>
    );
}

export default Register;