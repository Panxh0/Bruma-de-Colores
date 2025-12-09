import React from 'react';
import Navbar from './nav';
import Visor3D from './Visor3D';
import './ProductPage.css';

const SIMULATED_PAYMENT_URL = "https://buy.stripe.com/test_eVqfZ92SS5YMeYS2g58ww00";

const Product = ({ productData }) => { 

  // Si productData está vacío, mostramos un mensaje de error (aunque el Loader ya lo maneja)
    if (!productData) {
        return <div>Error: Datos del producto no cargados.</div>;
    } 
  // Extraemos la URL del modelo 3D de los datos de Firebase
    const modelUrlFromFirebase = productData.model3DUrl; 

  // Lógica para verificar el stock (asumiendo que RTDB trae el campo 'stock')
    const stockStatus = productData.stock > 0 ? 'Disponible' : 'Agotado';
    const stockClass = productData.stock > 0 ? 'stock-available' : 'stock-unavailable';

    const handleBuyClick = () => {
    // 1. Normalmente, aquí contactarías a tu API para crear una orden.
    console.log(`Iniciando checkout para ${productData.nombre} por $${productData.precio}`);
    
    // 2. Simulamos la respuesta de la API que devuelve la URL de la pasarela.
    
    // 3. Redirección final del navegador a la pasarela de pago.
    // Usamos window.location.href para asegurar la redirección externa.
    window.location.href = SIMULATED_PAYMENT_URL;
    };


    return (
    <div>
        <Navbar />
        <div className="product-page-container">
        
        {/* Columna Izquierda: Visor 3D Interactivo (50% de ancho) */}
        <div className="product-3d-viewer">
            {modelUrlFromFirebase ? (
                <Visor3D modelPath={modelUrlFromFirebase} /> 
            ) : (
                <p>Modelo 3D no disponible. Falta URL en RTDB.</p>
            )}
        </div>

        <div className="product-details">
            <h1>{productData.nombre || 'Nombre del Juguete'}</h1> 
            <p className="price">${(productData.precio || 0).toFixed(2)}</p>
    
            <div className="info-block">
                <p><strong>Modelo:</strong> {productData.modelo || 'N/A'}</p>
                <p><strong>Marca Fabricante:</strong> {productData.fabricante || 'Desconocida'}</p>
            </div>

            <div className="stock-info">
                <span className={stockClass}>Stock: {stockStatus} ({productData.stock || 0} unidades)</span>
            </div>

            <p className="description">{productData.description || 'No hay descripción disponible.'}</p>
        
            <div className="action-buttons">
            <button className="btn-add-cart" onClick={handleBuyClick}>Comprar Ahora</button>
            <button className="btn-wishlist">Añadir al Carrito</button>
            </div>
        </div>
        </div>
    </div>
    );
};
export default Product;