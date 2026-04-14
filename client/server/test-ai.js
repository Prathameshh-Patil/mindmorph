import { analyzeDoodle } from "./services/aiService.js";
import dotenv from "dotenv";
dotenv.config();

// Create 1x1 transparent png for test
const testImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

async function test() {
    console.log("Testing AI Service...");
    const result = await analyzeDoodle(testImage);
    console.log("Result:", result);
}

test();
