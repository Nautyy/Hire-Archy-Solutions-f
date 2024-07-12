import { newForm, getForms } from "../controllers/b2b.js";
import express from "express";
import { checkSuperAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", newForm);
router.get("/", checkSuperAdmin, getForms);

export default router;
