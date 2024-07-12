import express from "express";
import b2bRoutes from "./b2b.routes.js";
import candidateRoutes from "./candidate.routes.js";
import authRoutes from "./auth.routes.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.use("/b2b", b2bRoutes);
router.use("/candidate", candidateRoutes);
router.use("/auth", authRoutes);

export default router;
