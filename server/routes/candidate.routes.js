import { applyForm, getForms } from "../controllers/candidate.js";
import { checkLoggedIn } from "../middleware/auth.middleware.js";
import { multerUploads } from "../middleware/upload.js";
import express from "express";

const router = express.Router();

router.post("/apply", multerUploads, applyForm);
router.get("/", checkLoggedIn, getForms);

export default router;
