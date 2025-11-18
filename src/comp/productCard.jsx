import React from "react";
import {motion} from "framer-motion";
import "./homePage.css";

const ProductCard = ({juguete, onClick}) => {
    const imageUrl = juguete.imageUrl 

    return (
        <motion.div 
            className="product-card"
            onClick={onClick}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="card-image-container">
                <img src={imageUrl} alt={juguete.nombre} className="card-image" />
            </div>
            <div className="card-info">
                <h3 className="card-title">{juguete.nombre || 'Juguete Fantasía'}</h3>
                <p className="card-price">${(juguete.precio || 0).toFixed(2)}</p>
                <button className="card-button">
                    Ver en 3D
                </button>
            </div>
        </motion.div>
    );
};


export default ProductCard;