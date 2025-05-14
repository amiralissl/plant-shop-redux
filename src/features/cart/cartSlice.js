import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (!action.payload || !action.payload.id) return;
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
        state.totalCount += 1;
        state.totalPrice = Number((state.totalPrice + action.payload.price).toFixed(2));
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalCount += 1;
        state.totalPrice = Number((state.totalPrice + action.payload.price).toFixed(2));
      }
    },
    increment(state, action) {
      if (!action.payload) return;
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalCount += 1;
        state.totalPrice = Number((state.totalPrice + item.price).toFixed(2));
      }
    },
    decrement(state, action) {
      if (!action.payload) return;
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        state.totalCount -= 1;
        state.totalPrice = Number((state.totalPrice - item.price).toFixed(2));
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
      }
    },
    removeFromCart(state, action) {
      if (!action.payload) return;
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        state.totalCount -= item.quantity;
        state.totalPrice = Number((state.totalPrice - item.price * item.quantity).toFixed(2));
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;