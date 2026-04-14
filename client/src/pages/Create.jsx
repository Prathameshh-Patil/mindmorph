import { useState } from "react";
import CanvasDraw from "../components/CanvasDraw";
import { generateMindform } from "../services/api";

export default function Create() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async (imageData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await generateMindform({
                doodle: imageData,
            });
            if (res.error) throw new Error(res.error);
            setResult(res);
        } catch (err) {
            setError(err.message || "Failed to generate MindMorph");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center justify-center transition-colors duration-300">
            <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-3">
                    Create MindMorph
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Sketch your feelings below to see what they look like.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg w-full max-w-md text-center">
                    {error}
                </div>
            )}

            <div className="w-full flex justify-center mb-8">
                <CanvasDraw onGenerate={handleGenerate} loading={loading} />
            </div>

            {result && (
                <div className="mt-8 p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-6 items-center max-w-md md:max-w-full animate-slide-up">
                    <img
                        src={result.image_url}
                        alt="generated structure"
                        className="w-48 h-48 object-cover rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white capitalize mb-2">{result.name}</h2>
                        <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-4 capitalize">
                            Mood: {result.mood}
                        </span>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{result.description}</p>
                        
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg">
                                <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">Energy Level</span>
                                <span className="text-xl font-black text-gray-900 dark:text-white">⚡ {result.energy_level}</span>
                            </div>
                        </div>

                        {result.traits && result.traits.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                {result.traits.map((trait, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs lowercase">
                                        #{trait}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}