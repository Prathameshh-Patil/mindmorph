import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 transition-colors duration-300">
            <div className="max-w-3xl space-y-8 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                    Turn Your Thoughts into <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">Visual Intelligence</span>
                </h1>
                
                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Draw your raw emotions on the canvas and let AI transmute them into unique living creatures.
                </p>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/create"
                        className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
                    >
                        Start Creating 🚀
                    </Link>
                    <Link
                        to="/gallery"
                        className="w-full sm:w-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                        View Gallery
                    </Link>
                </div>
                
                <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60">
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="text-3xl mb-2">🖊️</div>
                        <div className="font-semibold text-sm">Draw doodle</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="text-3xl mb-2">🤖</div>
                        <div className="font-semibold text-sm">AI analyzes</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="text-3xl mb-2">✨</div>
                        <div className="font-semibold text-sm">Morph generated</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="text-3xl mb-2">❤️</div>
                        <div className="font-semibold text-sm">Share & Like</div>
                    </div>
                </div>
            </div>
        </div>
    );
}