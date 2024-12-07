import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axiosInstance from "../../../utils/axiosInstance"
const initialState = {
    allEmployeeDetails: null,
    employeeDetails: null,
    loading: false,
    status: false,
}

export const createEmployee = createAsyncThunk(
    "createEmployee",
    async(details)=>{
        const response = await axiosInstance.post("create-employee",details);
        return response.data
    }
)

export const updateEmployee = createAsyncThunk(
    "updateEmployee",
    async(details)=>{
        const response = await axiosInstance.post("update-employee",details);
        return response.data
    }
)

export const deleteEmployee = createAsyncThunk(
    "deleteEmployee",
    async(details)=>{
        const response = await axiosInstance.post(`delete-employee/${details}`);
        return response.data
    }
)

export const getEmployee = createAsyncThunk(
    "getEmployee",
    async(details)=>{
        const response = await axiosInstance.get(`get-employee/${details}`);
        return response.data
    }
)

export const getAllEmployees = createAsyncThunk(    
    "getAllEmployees",
    async()=>{
        const response = await axiosInstance.get("get-all-employees");
        return response.data
    }
)

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(createEmployee.rejected,(state,action)=>{
            state.status = false            
            state.loading = false
        })
        .addCase(createEmployee.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(createEmployee.fulfilled,(state,action)=>{
            state.loading = false
            state.status = true
            state.employeeDetails = action.payload
        });

        builder
        .addCase(updateEmployee.rejected,(state,action)=>{
            state.status = false            
            state.loading = false
        })
        .addCase(updateEmployee.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(updateEmployee.fulfilled,(state,action)=>{
            state.loading = false
            state.status = true
            state.employeeDetails = action.payload
        });

        builder
        .addCase(deleteEmployee.rejected,(state,action)=>{
            state.status = false            
            state.loading = false
        })
        .addCase(deleteEmployee.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(deleteEmployee.fulfilled,(state,action)=>{
            state.loading = false
            state.status = true
            state.employeeDetails = action.payload
        });

        builder
        .addCase(getEmployee.rejected,(state,action)=>{
            state.status = false            
            state.loading = false
        })
        .addCase(getEmployee.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(getEmployee.fulfilled,(state,action)=>{
            state.loading = false
            state.status = true
            state.employeeDetails = action.payload
        });

        builder
        .addCase(getAllEmployees.rejected,(state,action)=>{
            state.status = false            
            state.loading = false
        })
        .addCase(getAllEmployees.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(getAllEmployees.fulfilled,(state,action)=>{
            state.loading = false
            state.status = true
            state.allEmployeeDetails = action.payload
        }); 

    }
})

export default employeeSlice.reducer;