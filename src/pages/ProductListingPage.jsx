import React, { useMemo } from 'react';
import products from '../data/products';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Header from '../components/Header';
import '../styles/ProductListingPage.css';

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const cartItemIds = useSelector(state => state.cart.items.map(item => item.id), shallowEqual);
  const isInCart = useMemo(() => {
    return id => cartItemIds.includes(id);
  }, [cartItemIds]);
  const categories = ['indoor', 'succulent', 'flowering'];

  return (
    <>
      <Header />
      <div className="product-listing">
        {categories.map(category => (
          <div key={category} className="category">
            <h2>{category.toUpperCase()}</h2>
            <div className="products">
              {products
                .filter(p => p.category === category)
                .map(product => (
                  <div key={product.id} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      width="100"
                      height="100"
                      loading="lazy"
                      onError={(e) => (e.target.src = '/images/fallback.jpg')}
                    />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <button
                      disabled={isInCart(product.id)}
                      onClick={() => dispatch(addToCart(product))}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {isInCart(product.id) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductListingPage;