import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app= express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Helps to accept JSON data
app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())



// Routes
import employeeRouter from "./routes/employee.routes.js";
app.use("/api/v1/", employeeRouter);

import adminRouter from "./routes/admin.routes.js";
app.use("/api/v1/", adminRouter);

export {app}