import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <h1>Green Haven</h1>
      <p>
        Welcome to Green Haven – your one-stop shop for beautiful and affordable
        houseplants. Bring life and greenery into your home today.
      </p>
      <button
        onClick={() => navigate('/products')}
        aria-label="Go to products page"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;