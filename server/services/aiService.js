import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load env variables
dotenv.config({ override: true });

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;

// Fail gracefully if no API key is provided
export const analyzeDoodle = async (imageBase64) => {
    if (!apiKey) {
        console.warn("No GEMINI_API_KEY found, falling back to basic mock logic.");
        return generateMockAIResult();
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Using flash model for fast multi-modal analysis
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Strip the data:image/png;base64, prefix if it exists to pass pure base64 to Gemini
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

        const prompt = `Analyze this doodle and return ONLY JSON (no markdown formatting, no backticks, just raw JSON).
        The JSON must match this exact structure:
        {
          "mood": "one emotion word describing it (e.g., happy, sad, chaotic, calm, angry, bizarre, peaceful)",
          "energy": <a single number from 1 to 10 evaluating the kinetic intensity>,
          "name": "a creative and catchy creature name",
          "description": "a short 1-line description of what it looks and feels like",
          "traits": ["trait1", "trait2", "trait3"]
        }`;

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/png"
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();
        
        // Safety: clean any markdown backticks that Gemini sometimes ignores instructions and adds anyway
        const cleanedJSON = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const parsed = JSON.parse(cleanedJSON);
        
        // Ensure required fields exist, provide defaults if AI misses them
        return {
            mood: parsed.mood || "mysterious",
            energy: parsed.energy || 5,
            name: parsed.name || "Unknown Entity",
            description: parsed.description || "An indescribable shape derived from pure thought.",
            traits: parsed.traits && Array.isArray(parsed.traits) ? parsed.traits : ["curious", "abstract", "enigmatic"]
        };
    } catch (error) {
        console.error("=== 🔥 GEMINI API FATAL ERROR 🔥 ===");
        console.error(error.message || error);
        console.error("Stack trace:", error.stack);
        console.error("======================================");
        console.warn("Falling back to simulated result due to AI failure.");
        return generateMockAIResult();
    }
};

export const generateCreatureImage = async (aiMetadata) => {
    try {
        console.log("Painting the creature using FLUX AI...");
        
        // Construct a highly detailed prompt for the image generator using Gemini's output
        const prompt = `A breathtaking masterpiece of a magical creature named ${aiMetadata.name}. The entity embodies a ${aiMetadata.mood} emotion, radiating energy at level ${aiMetadata.energy}/10. Visual traits include: ${aiMetadata.traits.join(", ")}. Detailed digital art style, glowing studio lighting, highly saturated colors, transparent background aesthetic, trending on ArtStation, 8k resolution, magical aura.`;
        
        // Use Pollinations AI (A highly permissive FLUX image endpoint requiring no API keys)
        const encodedPrompt = encodeURIComponent(prompt);
        // We use a random seed so even identical prompts get unique variations
        const seed = Math.floor(Math.random() * 9999999);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&model=flux&nologo=true&seed=${seed}`;
        
        // Download the image as an ArrayBuffer from the AI server
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error("Image AI server failed to respond.");
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Convert to base64 to store safely inside our Postgres Database just like the doodles
        const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;
        console.log("Creature painted successfully!");
        
        return base64Image;

    } catch (error) {
        console.error("Error generating creature image:", error);
        // Fallback: return a cool generic AI placeholder if the image server fails
        return "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80&auto=format&fit=crop";
    }
};

const generateMockAIResult = () => {
    const randomName = ["Scribblex", "Blobbert", "Chaos Mite", "Zen Ooze", "Vibe Specter"][Math.floor(Math.random() * 5)];
    const randomMood = ["happy", "chaotic", "calm", "anxious", "triumphant"][Math.floor(Math.random() * 5)];
    const energy = Math.floor(Math.random() * 10) + 1;
    
    return {
        name: randomName,
        mood: randomMood,
        energy: energy,
        traits: [randomMood, energy > 5 ? "kinetic" : "smooth", "abstract"],
        description: `A unique digital entity born from a ${randomMood} state, vibrating at energy level ${energy}.`,
    };
};
