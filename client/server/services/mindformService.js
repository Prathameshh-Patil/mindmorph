import { pool } from "../db/index.js";

export const createMindform = async ({ doodle, mood, energy, name, description, traits }) => {
    // Save to database
    const result = await pool.query(
        `INSERT INTO mindforms (name, mood, energy_level, traits, description, image_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
        [
            name,
            mood,
            energy,
            traits,
            description,
            doodle,
        ]
    );

    return result.rows[0];
};

export const fetchMindforms = async (sort = "latest") => {
    let query = "SELECT * FROM mindforms";

    if (sort === "popular") {
        query += " ORDER BY like_count DESC";
    } else {
        query += " ORDER BY created_at DESC";
    }

    const result = await pool.query(query);
    return result.rows;
};