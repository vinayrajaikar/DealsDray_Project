import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const employeeSchema = new Schema(
    {
        employee_id: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobile_no:{
            type: String,
            required: true,
            unique: true
        },
        designation: {
            type: String,
            required: true
        },
        gender:{
            type: String,
            required: true
        },
        courses:{
            type: [String],
            required: true
        },
        profile_image:{
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const Employee = mongoose.model("Employee", employeeSchema); 