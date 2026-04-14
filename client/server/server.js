import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mindformRoutes from "./routes/mindformRoutes.js";


dotenv.config({ override: true });

const app = express();

const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({ origin: clientOrigin }));

// Doodles can be large base64 strings, increase limit explicitly
app.use(express.json({ limit: '10mb' }));

// 3. Attach Routes
app.use("/api/mindforms", mindformRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});