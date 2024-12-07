import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axiosInstance from "../../../utils/axiosInstance"
import axios from "axios"

const initialState = {
    adminDetails: null,
    loading: false,
    status: false
}

export const createAdmin = createAsyncThunk(
    "createAdmin",
    async(details)=>{
        const response = await axiosInstance.post("create-admin",details);
        return response.data
    }
)

export const isAdmin = createAsyncThunk(
    "isAdmin",
    async(details)=>{
        console.log(details)
        // const response = await axiosInstance.get("Verify-Admin",{ "adminName":"Vinay",
        //     "password":"123"   });
        const response=await axios.get("http://localhost:8000/api/v1/Verify-Admin",{
            "adminName":"Vinay",
            "password":"123"   
        })
        console.log("Hello")
        return response.data
    }
)

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createAdmin.pending, (state) => {
            state.loading = true
        })
        .addCase(createAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.adminDetails = action.payload
            state.status = true
        })
        .addCase(createAdmin.rejected, (state) => {
            state.loading = false
            state.adminDetails = null
            state.status = false
        })


        builder
        .addCase(isAdmin.pending, (state) => {
            state.loading = true
        })
        .addCase(isAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.adminDetails = action.payload
            state.status = true
        })
        .addCase(isAdmin.rejected, (state) => {
            state.loading = false
            state.adminDetails = null
            state.status = false
        })
    },
})

export default adminSlice.reducer