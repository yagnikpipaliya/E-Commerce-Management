import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./e-commerce/adminSlice";

export default configureStore({
    reducer:{
        admin:adminReducer
    }
});