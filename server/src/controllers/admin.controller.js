import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAdmin = asyncHandler(async (req, res, next) => {
    const {adminName, password} = req.body;

    if (!adminName || !password) {
        return next(new ApiError(400,"All Fields are required"));
    }

    const admin = await Admin.findOne({adminName});

    if(admin){
        return next(new ApiError(400,"Admin already exists"));
    }

    const newAdmin = await Admin.create({
        adminName,
        password    
    });

    if(!newAdmin){
        return next(new ApiError(500,"Failed to create admin"));
    }

    return res.status(201).json(
        new ApiResponse(
            201, 
            newAdmin, 
            "Admin created successfully"
        )
    )

})

const isAdmin = asyncHandler(async (req, res, next) => {
    const {adminName, password} = req.body;

    if (!adminName || !password) {
        return(new ApiError(400,"All Fields are required"));
    }

    const admin = await Admin.findOne({adminName});

    if(!admin){
        return (new ApiError(404,"Admin not found"));
    }

    if(admin.password !== password){
        return(new ApiError(400,"Invalid password"));
    }
    // console.log(admin);

    return res.status(200).json(
        new ApiResponse(
            200, 
            admin, 
            "Admin found successfully"
        )
    )

})

export {isAdmin,createAdmin}