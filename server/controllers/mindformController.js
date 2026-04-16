import { createMindform, fetchMindforms } from "../services/mindformService.js";
import { pool } from "../db/index.js";

import { analyzeDoodle, generateCreatureImage } from "../services/aiService.js";

// CREATE
export const generateMindform = async (req, res, next) => {
    try {
        const { doodle } = req.body;
        
        if (!doodle || typeof doodle !== 'string' || !doodle.startsWith('data:image')) {
            return res.status(400).json({ error: "Invalid or missing doodle image data." });
        }
        
        // 1. Analyze the doodle with Gemini AI
        console.log("Sending doodle to Gemini Vision AI...");
        const aiData = await analyzeDoodle(doodle);
        console.log("AI interpreted doodle as:", aiData.name);

        // 2. Generate a stunning painted creature using FLUX AI based on Gemini's description!
        console.log("Dispatching image generation request...");
        const paintedImageBase64 = await generateCreatureImage(aiData);

        // 3. Save complete object to Postgres (storing the painted AI image instead of the raw doodle)
        const data = await createMindform({
            doodle: paintedImageBase64,
            mood: aiData.mood,
            energy: aiData.energy,
            name: aiData.name,
            description: aiData.description,
            traits: aiData.traits
        });
        
        res.json(data);
    } catch (error) {
        next(error);
    }
};

// READ (WITH SORTING)
export const getMindforms = async (req, res, next) => {
    try {
        const { sort } = req.query;

        const data = await fetchMindforms(sort);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

// LIKE
export const likeMindform = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ error: "Invalid mindform ID" });
        }

        const result = await pool.query(
            "UPDATE mindforms SET like_count = like_count + 1 WHERE id = $1 RETURNING *",
            [id]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Mindform not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};