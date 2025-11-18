import React from "react"; 
import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { rtdb } from "../firebaseConfig";
import {ref, onValue} from "firebase/database";
import Nav from "./nav";
import './homePage.css';
import ProductCard from "./productCard";

const promoToys = [
    { id: 101, title: "Lanzamiento: Robot Articulado", subtitle: "Descubre la experiencia 3D.", image: "https://placehold.co/1200x400/90bfe8/ffffff?text=ROBOT+NUEVO" },
    { id: 102, title: "Oferta Semanal: Autos Coleccionables", subtitle: "20% de descuento solo hoy.", image: "https://placehold.co/1200x400/e89090/ffffff?text=OFERTA+AUTOS" },
    { id: 103, title: "Juguetes Educativos", subtitle: "Aprende jugando con nuestra nueva línea.", image: "https://placehold.co/1200x400/a3e890/ffffff?text=EDUCATIVOS" },
]

const HomePage = () => {
    const [juguetes, setJuguetes] = useState([]);
    const [loading, setLoading] = useState([]);
    const navigate = useNavigate();
    //weas que no se que son xd 

    useEffect (() => {
        const juguetesRef = ref (rtdb, 'juguetes')

        onValue(juguetesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const listaJuguetes = Object.keys(data).map(key => ({
                    id:key,
                    ...data[key]
                }));
                setJuguetes(listaJuguetes);
            } else {
                setJuguetes([]);
            }
            setLoading(false);
        });
    }, []);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    if (loading) {
        return <div>Se esta cargando la página principal... 🦦</div>
    }

    return (
        <div className="home-page">
            <Nav />
            
            {/* Sección del Carrusel Promocional (Elegante y Atractivo) */}
            <motion.div className="carousel-container">
                <motion.div 
                    className="carousel-track"
                    drag="x" // Permite arrastrar horizontalmente
                    dragConstraints={{ right: 0, left: -1000 }} // Límites de arrastre (ajustar según el número de items)
                >
                    {promoToys.map((promo, index) => (
                        <div 
                            key={index} 
                            className="carousel-item"
                            style={{ backgroundImage: `url(${promo.image})` }}
                        >
                            <div className="promo-text">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {promo.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {promo.subtitle}
                                </motion.p>
                                <motion.button 
                                    className="promo-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleProductClick(promo.id)}
                                >
                                    Ver Juguete 🚀
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Sección del Listado de Juguetes */}
            <div className="product-list-section">
                <h2>Explora Nuestros Juguetes</h2>
                <div className="product-grid">
                    {juguetes.length > 0 ? (
                        juguetes.map(juguete => (
                            <ProductCard 
                                key={juguete.id} 
                                juguete={juguete} 
                                onClick={() => handleProductClick(juguete.id)}
                            />
                        ))
                    ) : (
                        <p>No hay juguetes disponibles en este momento.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export default HomePage;