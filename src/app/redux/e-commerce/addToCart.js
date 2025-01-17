import { createSlice } from "@reduxjs/toolkit";

// Function to get cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// const calculateTotal = (cart) => cart.reduce((acc, item) => acc + item.price, 0);
const calculateTotal = (cart) =>   cart.reduce((total, item) => Number(total) + Number(item.price) * Number(item.quantity), 0);


const AddToCart = createSlice({
  name: "AddToCart",
  initialState: {
    // cart: [],
    // total: 0,
    cart: loadCartFromStorage(), // Load cart from localStorage
    total: calculateTotal(loadCartFromStorage()),
    cartItemCount : loadCartFromStorage().length,
    totalQuantity: loadCartFromStorage().reduce((count, item) => count + item.quantity, 0),
  },
  reducers: {
    addToCart(state, action) {
      const { id, price } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.cart.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }

      state.total = calculateTotal(state.cart);
      state.cartItemCount = state.cart.length; // Unique items count remains
      state.totalQuantity = state.cart.reduce((count, item) => count + item.quantity, 0); // Update total quantity
      localStorage.setItem("cart", JSON.stringify(state.cart));

    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrease quantity
        } else {
          state.cart = state.cart.filter((item) => item.id !== id); // Remove item if quantity is 1
        }
      }

      state.total = calculateTotal(state.cart);
      state.cartItemCount = state.cart.length; // Unique items count remains
      state.totalQuantity = state.cart.reduce((count, item) => count + item.quantity, 0); // Update total quantity
      localStorage.setItem("cart", JSON.stringify(state.cart));
      // state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      // state.total = calculateTotal(state.cart);
      // state.cartItemCount = state.cart.length;
      // localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      state.total = 0;
      state.cartItemCount = 0;
      state.totalQuantity = 0; // Reset total quantity
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
