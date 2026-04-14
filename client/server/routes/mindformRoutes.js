import express from "express";
import {
    generateMindform,
    getMindforms,
} from "../controllers/mindformController.js";

const router = express.Router();

router.post("/generate", generateMindform);
router.get("/", getMindforms);

export default router;