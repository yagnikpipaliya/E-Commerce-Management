import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async (token, thunkAPI) => {
  try {
    const response = await axios.post("/api/auth/google", { token });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    profile: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default authSlice.reducer;