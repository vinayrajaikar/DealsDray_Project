import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Employee } from "../models/employee.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const createEmployee = asyncHandler(async (req, res, next) => {
    const { employee_id, name, email, mobile_no, designation, gender,courses } = req.body;

    if (!employee_id || !name || !email || !mobile_no || !designation || !gender || !courses) {
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
        profile_image: profile_image?.url||"",
        courses
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

const updateEmployee = asyncHandler(async (req, res, next) => {
    const employee_id = req.params.id;
    const {name, email, mobile_no, designation } = req.body;

    if (!name || !email || !mobile_no || !designation) {
        return next(new ApiError(400,"All Fields are required"));
    }

    const existedemployee = await Employee.findOne({
        $or: [{employee_id},{email:{ $ne: email }},{mobile_no:{ $ne: mobile_no }}]
    });
    
    console.log(existedemployee);
    const id=existedemployee?._id;

    const employee = await Employee.findOneAndUpdate(
        employee_id ,
        { 
            $set: {name, email, mobile_no, designation }
        },
        { new: true }
    );

    if(!employee){
        return next(new ApiError(500,"Failed to update employee"));
    }

    return res.status(201).json(
        new ApiResponse(
            200, 
            employee, 
            "Employee updated successfully"
        )
    )
})

const deleteEmployee = asyncHandler(async (req, res, next) => {
    const employee_id = req.params.id;

    const employee = await Employee.findOneAndDelete(employee_id);

    if(!employee){
        return next(new ApiError(500,"Failed to delete employee"));
    }

    return res.status(201).json(
        new ApiResponse(
            200, 
            employee, 
            "Employee deleted successfully"
        )
    )
})

const getEmployee = asyncHandler(async (req, res, next) => {
    const employee_id = req.params.id;

    const employee = await Employee.findOne({employee_id});
    console.log(employee)

    if(!employee){
        return next(new ApiError(404,"Employee not found"));
    }

    return res.status(200).json(
        new ApiResponse(
            200, 
            employee, 
            "Employee found successfully"
        )
    )

})

const getAllEmployees = asyncHandler(async (req, res, next) => {
    const employees = await Employee.find();

    if(!employees){
        return next(new ApiError(404,"Employees not found"));
    }

    return res.status(200).json(
        new ApiResponse(
            200, 
            employees, 
            "Employees found successfully"
        )   
    )
})

export {createEmployee, updateEmployee, deleteEmployee, getEmployee, getAllEmployees}
