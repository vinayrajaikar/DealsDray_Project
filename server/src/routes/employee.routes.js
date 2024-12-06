import { Router } from "express";
import {createEmployee, updateEmployee, deleteEmployee, getEmployee, getAllEmployees} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

// Create a new employee
router.route("/create-employee").post(
    upload.fields([
        {
            name: "profile_image",
            maxCount: 1,
        }]),
        createEmployee
);

// update employee
router.route("/update-employee/:id").post(updateEmployee);

// delete employee
router.route("/delete-employee/:id").delete(deleteEmployee);

// get employee
router.route("/get-employee/:id").get(getEmployee);

// get all employees
router.route("/get-all-employees").get(getAllEmployees);

export default router;