import express from "express";
import { UserController } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/admin", UserController.adminLogin);

// export default router; 
export const userRoute = router
