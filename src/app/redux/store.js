import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./e-commerce/adminSlice";
import productReducer from "./e-commerce/productSlice";

import authReducer from './e-commerce/authSlice'
export default configureStore({
    reducer:{
        admin:adminReducer,
        auth:authReducer,
        products:productReducer,
    }
});