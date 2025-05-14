import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shallowEqual } from 'react-redux';
import Header from '../components/Header';
import { increment, decrement, removeFromCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';

const CartPage = memo(() => {
  const cartItems = useSelector(state => state.cart.items, shallowEqual);
  const dispatch = useDispatch();
  const totalQuantity = React.useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
    [cartItems]
  );
  const totalPrice = React.useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0), 
    [cartItems]
  );

  return (
    <>
      <Header />
      <div className="cart-page">
        <h2>🛒 Your Shopping Cart</h2>
        <p>Total items: {totalQuantity}</p>
        <p>Total cost: ${totalPrice.toFixed(2)}</p>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  width="100"
                  height="100"
                  loading="lazy"
                  onError={(e) => (e.target.src = '/images/fallback.jpg')}
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => dispatch(increment(item.id))}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(decrement(item.id))}
                    disabled={item.quantity === 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    −
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-actions">
          <button
            onClick={() => alert('Checkout is not yet implemented. Please check back later!')}
            aria-label="Proceed to checkout"
          >
            Checkout
          </button>
          <Link to="/products" aria-label="Continue shopping">
            <button>Continue Shopping</button>
          </Link>
        </div>
      </div>
    </>
  );
});

export default CartPage;