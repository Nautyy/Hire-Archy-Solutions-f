import express from "express";
import {
    checkSuperAdmin,
    checkLoggedIn,
} from "../middleware/auth.middleware.js";
import { addAdmin, login, resetPassword } from "../controllers/auth.js";
const router = express.Router();

// only superAdmin can add other admins/superAdmins
// initially, remove checkSuperAdmin check for addSuperAdmin initially.

router.post("/addAdmin", checkSuperAdmin, addAdmin);
router.post("/login", login);
router.post("/resetPassword", checkLoggedIn, resetPassword);

export default router;
