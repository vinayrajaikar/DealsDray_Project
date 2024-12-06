import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Employee } from "../models/employee.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const createEmployee = asyncHandler(async (req, res, next) => {
    const { employee_id, name, email, mobile_no, designation, gender } = req.body;

    if (!employee_id || !name || !email || !mobile_no || !designation || !gender) {
        return next(new ApiError(400,"All Fields are required"));
    }

    const existedemployee = await Employee.findOne({
        $or: [{employee_id},{email},{mobile_no}]
    });

    if (existedemployee) {
        return next(new ApiError(400,"Employee already exists"));
    }

    const profile_image_local_path =  req.files?.coverImage[0]?.path;
    
    const profile_image = await uploadOnCloudinary(profile_image_local_path);

    const employee = await Employee.create({
        employee_id,
        name,
        email,
        mobile_no,
        designation,
        gender,
        profile_image: profile_image?.url||""
    });

    if(!employee){
        return next(new ApiError(500,"Failed to create employee"));
    }

    return res.status(201).json(
        new ApiResponse(
            200, 
            employee, 
            "Employee registered successfully"
        )
    )
})