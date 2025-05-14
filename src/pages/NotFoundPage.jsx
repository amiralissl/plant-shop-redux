import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="not-found" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/products" aria-label="Return to products page">
          <button>Back to Products</button>
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;