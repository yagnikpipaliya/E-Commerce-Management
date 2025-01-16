import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async (access_token, thunkAPI) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      return await response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    profile: null,
    // profile: typeof window !== "undefined" && localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null,
    error: null,
  },
  reducers: {
    // login : async (action,state)=>{}
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        // Store the profile in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("profile", JSON.stringify(state.profile));
        }
        // localStorage.setItem("profile", JSON.stringify(state.profile));
        console.log("profile", state.profile);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {setUserProfile} = authSlice.actions;
export default authSlice.reducer;
