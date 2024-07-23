import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./e-commerce/adminSlice";

import authReducer from './e-commerce/authSlice'
export default configureStore({
    reducer:{
        admin:adminReducer,
        auth:authReducer,
    }
});