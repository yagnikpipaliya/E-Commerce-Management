import { createSlice } from "@reduxjs/toolkit";

// Function to get cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const calculateTotal = (cart) => cart.reduce((acc, item) => acc + item.price, 0);

const AddToCart = createSlice({
  name: "AddToCart",
  initialState: {
    // cart: [],
    // total: 0,
    cart: loadCartFromStorage(), // Load cart from localStorage
    total: calculateTotal(loadCartFromStorage()),
    cartItemCount : loadCartFromStorage().length,
  },
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.total += action.payload.price;
      state.cartItemCount = state.cart.length;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.total = calculateTotal(state.cart);
      state.cartItemCount = state.cart.length;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      state.total = 0;
      state.cartItemCount = 0;
      localStorage.removeItem("cart");
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCart, (state, action) => {
//         state.cart.push(action.payload);
//         state.total += action.payload.price;
//       })
//       .addCase(removeFromCart, (state, action) => {
//         state.cart = state.cart.filter((item) => item.id !== action.payload.id);
//         state.total -= action.payload.price;
//       });
//   },
});

export const { addToCart, removeFromCart, clearCart } = AddToCart.actions;
export default AddToCart.reducer;
