import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health route
app.get("/", (req, res) => {
    res.send("Backend running ✅");
});

// Test API
app.get("/api/mindforms", (req, res) => {
    res.json([]);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server running on", PORT);
});