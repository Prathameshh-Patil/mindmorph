import { useState } from "react";
import MindformCard from "../components/MindformCard";
import { useMindforms } from "../hooks/useMindforms";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");
  
  const { data, loading, error, toggleLike } = useMindforms(sort, search);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">Gallery</h1>
        
        <div className="flex gap-4 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search moods or names..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 md:w-64 p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-shadow"
          />
          <select
            onChange={(e) => setSort(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer"
          >
            <option value="latest">⚡ Latest</option>
            <option value="popular">🔥 Popular</option>
          </select>
        </div>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-lg mx-auto text-center">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl h-64 overflow-hidden shadow">
              <div className="w-full h-40 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : !data.length ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mt-10 transition-colors duration-300">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No creations found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            {search ? "No MindMorphs match your current search criteria." : "The gallery is feeling empty. Be the first to bring a new emotion to life!"}
          </p>
          <Link to="/create" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all">
            Start Creating 🚀
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <MindformCard key={item.id} item={item} onLike={() => toggleLike(item.id)} />
          ))}
        </div>
      )}
    </div>
  );
}