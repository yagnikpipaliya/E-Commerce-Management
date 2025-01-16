import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("fetchProducts", async (_,{rejectWithValue}) => {
  try{
    const response = await fetch("http://localhost:3000/products");
    if (response.status == 200) {
      return response.json();
    }
  }catch (error){
    return rejectWithValue(error.message)
  }
});

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    error: null,
    loading: false,
  },
  reducers: {
    // add reducer here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ProductSlice.reducer;
