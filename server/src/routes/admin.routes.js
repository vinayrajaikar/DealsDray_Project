import { Router } from "express";
import { isAdmin, createAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.route("/create-admin").post(createAdmin);
router.route("/Verify-Admin").post(isAdmin);

export default router;