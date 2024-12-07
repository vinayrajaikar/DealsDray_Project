import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./Slices/employeeSlice";
import adminSlice from "./Slices/adminAuthSlice";

const store = configureStore({
    reducer: {
        employee: employeeSlice,
        admin: adminSlice
    }
})

export default store