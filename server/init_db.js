import { pool } from "./db/index.js";

const createTable = async () => {
    try {
        console.log("Connecting to database to create mindforms table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS mindforms (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                mood VARCHAR(100),
                energy_level INTEGER,
                traits TEXT[],
                description TEXT,
                image_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Success! The 'mindforms' table is ready.");
    } catch (err) {
        console.error("Error creating table:", err);
    } finally {
        pool.end();
    }
};

createTable();
