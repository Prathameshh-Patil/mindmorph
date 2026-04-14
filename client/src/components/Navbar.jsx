import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const { pathname } = useLocation();
    const { theme, toggleTheme } = useTheme();

    const linkStyle = (path) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            pathname === path 
            ? "bg-black text-white dark:bg-white dark:text-black shadow-md shadow-black/10 dark:shadow-white/10" 
            : "text-gray-600 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
        }`;

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                    MindMorph
                </Link>

                <div className="flex items-center gap-2 sm:gap-6">
                    <div className="hidden sm:flex gap-2">
                        <Link to="/" className={linkStyle("/")}>Home</Link>
                        <Link to="/create" className={linkStyle("/create")}>Create</Link>
                        <Link to="/gallery" className={linkStyle("/gallery")}>Gallery</Link>
                    </div>

                    <button 
                        onClick={toggleTheme}
                        className="p-2 ml-4 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-500"
                        title="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    
                    {/* Mobile Menu Icon (Placeholder for full mobile menu implementation if needed) */}
                    <div className="sm:hidden flex items-center">
                        <Link to="/create" className="px-3 py-1.5 text-xs font-bold rounded bg-black text-white dark:bg-white dark:text-black">
                            Create
                        </Link>
                    </div>
                </div>
            </div>
            {/* Mobile bottom nav for small screens */}
            <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around p-3 z-50">
                 <Link to="/" className={`text-xs ${pathname === '/' ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>Home</Link>
                 <Link to="/create" className={`text-xs ${pathname === '/create' ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>Create</Link>
                 <Link to="/gallery" className={`text-xs ${pathname === '/gallery' ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>Gallery</Link>
            </div>
        </nav>
    );
}