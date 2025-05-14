import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import '../styles/Header.css';

const Header = memo(() => {
  const cartItems = useSelector(state => state.cart.items, shallowEqual);
  const totalItems = React.useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
    [cartItems]
  );
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" aria-label="Go to home page">
        <h1>🪴 Green Haven</h1>
      </Link>
      <nav className="nav">
        {location.pathname !== '/products' && (
          <Link to="/products" aria-label="Go to products page">
            Products
          </Link>
        )}
        {location.pathname !== '/cart' && (
          <Link to="/cart" aria-label={`View cart with ${totalItems} items`}>
            🛒 Cart ({totalItems})
          </Link>
        )}
      </nav>
    </header>
  );
});

export default Header;