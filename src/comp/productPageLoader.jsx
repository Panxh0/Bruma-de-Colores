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
            
            onValue(productRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setProduct({ id, ...data });
                } else {
                    setProduct(null);
                }
                setLoading(false);
            }, {
                // Función que se ejecuta si hay un error de reglas o red
                onlyOnce: true // Lee solo una vez
            });
        }
    }, [id]);

    if (loading) {
        return <div>Cargando detalles del juguete...</div>;
    }
    
    if (!product) {
        return <div>Juguete no encontrado.</div>;
    }

    // 🚨 PASO FINAL: Renderiza la página y pasa la URL de Storage
    return <ProductPage productData={product} />; 
};

export default ProductPageLoader;