import express from "express";
import { signIn, signUp } from "../controllers/authController";

const router = express.Router();

router.post("/in", signIn);
router.post("/up", signUp);

export default router;
