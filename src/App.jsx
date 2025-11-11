
import './App.css';
import Nav from './comp/nav';
import ProductPage from './comp/ProductPage';
import Login from './comp/login';
import Register from './comp/register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        /* Redirige a la página de login por defecto */ 
        <Route path='/' element={ <Navigate to = "/login" replace/>} />

        /* Rutas para la página del producto */
        <Route path='/login' element={ <Login /> } />
        <Route path='/product' element={ <ProductPage /> } />
        <Route path='/register' element={ <Register /> } />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;