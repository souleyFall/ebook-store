import React, { useContext } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Pages
import ProductList from './components/Shop/ProductList';
import ProductDetails from './components/Shop/ProductDetails';
import Cart from './components/Shop/Cart';
import Checkout from './components/Shop/Checkout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductForm from './components/Admin/ProductForm';
import Dashboard from './components/Admin/Dashboard';
import { AuthContext } from './contexts/AuthContext';
import { CartContext } from './contexts/CartContext';

// Styles
import './styles/main.css';


const Header = () => {
  const {isConnected} = useContext(AuthContext);
  const {quantityOfArticles} = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo" onClick={()=>navigate("/")}>e-book Store</h1>
        <nav className="header-navbar">
          <a href="/" className="header-nav-link">Accueil</a>
          <div className="header-cart-container">
            <a href="/cart" className="header-nav-link">Panier</a>
            {quantityOfArticles > 0 && (
              <span className="header-cart-badge">{quantityOfArticles}</span>
            )}
          </div>
          {isConnected ? (
            <>
              <a href="/profil" className="header-nav-link">profil</a>
              <a href="/admin" className="header-nav-link">dashboard</a> 
              <a href="/" className="header-nav-link">se déconnecter</a>
            </>
          )
          : (
            <>
              <a href="/admin" className="header-nav-link">dashboard</a>
              <a href="/login" className="header-nav-link">Se connecter</a>
              <a href="/register" className="header-nav-link">S'inscrire</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2025 EbookStore. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
          <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/product/add" element={<ProductForm />} />
                <Route path="/admin/product/edit/:id" element={<ProductForm />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;