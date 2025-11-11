import React from 'react';
import Navbar from './nav';
import Visor3D from './Visor3D';
import './ProductPage.css';

const Product = {
    id: 1,
    name : 'Juguete de Batman Lego',
    description: 'Figura de Batman',
    price: 29999,
    modelo: "Lego Batman 2024",
    stock : 15,
    Vendedor: "Lego",
    model3DPath: '/models/lego_batman.glb'
};

const PaginaProducto = () => {

    const stockStatus = Product.stock > 0 ? 'Disponible' : 'Agotado';
    const stockClass = Product.stock > 0 ? 'stock-available' : 'stock-unavailable';



    return (
        
        <div>
            <Navbar/>

            <div className='product-page-container'>

                <div className="product-3d-viewer">
                    {Product && Product.model3DPath ? ( // <--- SOLO RENDERIZA SI LA RUTA EXISTE
                    <Visor3D modelPath={Product.model3DPath} />
                    ) : (
                        <p>Cargando modelo...</p> // Muestra un mensaje mientras carga
                    )}
                </div>
                
                <div className='product-details'>
                    <h1>{Product.name}</h1>
                    <p className='price'>${Product.price.toFixed(0)}</p>

                    <div className='info-block'>
                        <p><strong>Modelo: </strong>{Product.modelo}</p>
                        <p><strong>Vendedor: </strong>{Product.Vendedor}</p>
                    </div>

                    <div className='stock-info'>
                        <span className={stockClass}>Stock: {stockStatus}</span>
                    </div>

                    <p className='description'>{Product.description}</p>

                    <div className='action-buttons'>
                        <button className='add-to-cart'>Agregar al Carrito</button>
                        <button className='buy-now'>Comprar Ahora</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaginaProducto;