// src/components/ProductPageLoader.jsx (Nuevo componente, para cargar los datos)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para leer el ID de la URL
import { rtdb } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import ProductPage from './ProductPage'; // El componente de layout que ya hicimos

const ProductPageLoader = () => {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            // Referencia a la ubicación específica del juguete en RTDB
            const productRef = ref(rtdb, `juguetes/${id}`);
            
            const unsubscribe = onValue(productRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Si encuentra el producto, guarda el ID y los datos
                    setProduct({ id, ...data });
                } else {
                    setProduct(null); // Producto no encontrado
                }
                setLoading(false);
            }, (error) => {
                // Manejo de errores de Firebase (ej: reglas de seguridad)
                console.error("Error al cargar el producto desde RTDB:", error);
                setProduct(null);
                setLoading(false);
            });

            return unsubscribe(); // Limpia el listener al desmontar
        }
    }, [id]);

    if (loading) {
        return <div className='product-loader'>Estamos cargando detalles del juguete...🫡</div>;
    }
    
    if (!product) {
        return <div className='product-error'>Oh no! No hemos encontrado el juguete que buscas 😭.</div>;
    }


    return <ProductPage productData={product} />; 
};

export default ProductPageLoader;