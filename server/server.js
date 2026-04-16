import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mindformRoutes from "./routes/mindformRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "*", // In production, you might want to restrict this to your Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/mindforms", mindformRoutes);

// Health route
app.get("/", (req, res) => {
    res.status(200).json({ status: "Backend running ✅", timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});