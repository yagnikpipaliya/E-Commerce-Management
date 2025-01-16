import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStore = createAsyncThunk("fetchStore", async () => {
  const response = await (await fetch("http://localhost:3000/admin/store")).json();
  return response;
});

export const createStore = createAsyncThunk("createStore", async ({ username, password, gst, router }, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3000/admin/createstore", {
      method: "POST",
      body: JSON.stringify({ username, password, gst }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log(response);

    if (!response.ok) {
      // Check if the response is successful (status 2xx)
      const errorText = await response.text(); // Get the raw response text if it's not JSON
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    // Try to parse the JSON response
    const data = await response.json();
    console.log(data);

    if (response.status === 201) {
      router.push("/admin");
      return data;
    }
  } catch (error) {
    console.error("createStore error:", error);
    return rejectWithValue(error.message); // Pass the error message to Redux for handling
  }
});

export const updateStore = createAsyncThunk("updateStore", async ({ username, password, gst, router, operation }) => {
  const response = await fetch(`http://localhost:3000/admin/updatestore/${operation[1]}`, {
    method: "PUT",
    body: JSON.stringify({ username, password, gst }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 200) {
    router.push("/admin");
  }
});

export const deleteStore = createAsyncThunk("deleteStore", async (id) => {
  console.log(`http://localhost:3000/admin/deletestore/${id}`);
  const response = await fetch(`http://localhost:3000/admin/deletestore/${id}`, {
    method: "DELETE",
  });
  if (response.status == 200) {
    fetchStore();
    return response.json();
  }
});

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    store: [],
    error: null,
    loading: false,
  },
  reducers: {
    addStore: (state, action) => {
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (buider) => {
    buider.addCase(fetchStore.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(fetchStore.fulfilled, (state, action) => {
      state.loading = false;
      // state.store = [];
      state.store = action.payload;
    });
    buider.addCase(fetchStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    buider.addCase(createStore.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(createStore.fulfilled, (state, action) => {
      state.loading = false;
      // state.store = [];
      state.store.push(action.payload);
    });
    buider.addCase(deleteStore.fulfilled, (state, action) => {
      state.loading = false;
      //   state.store = action.payload;
      state.store = state.store.filter((item) => item._id !== action.payload._id);
    });
  },
});

export default adminSlice.reducer;
