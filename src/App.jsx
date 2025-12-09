
import './App.css';
import Nav from './comp/nav';
import ProductPage from './comp/ProductPage';
import Login from './comp/login';
import Register from './comp/register';
import HomePage from './comp/homePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductPageLoader from './comp/productPageLoader';
import { AuthProvider } from './comp/authContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        /* Redirige a la página de login por defecto */ 
        <Route path='/' element={ <Navigate to = "/login" replace/>} />

        /* Rutas para la página del producto */
        <Route path='/login' element={ <Login /> } />
        <Route path='/nav' element={ <Nav /> } />
        <Route path='/product/:id' element={ <ProductPageLoader /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path= '/homePage' element = {<HomePage />}/>
        <Route path='/product' element={ <ProductPage /> } />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
