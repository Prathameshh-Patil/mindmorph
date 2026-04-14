export default function MindformCard({ item, onLike }) {
    return (
        <div className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="relative overflow-hidden aspect-square border-b border-gray-100 dark:border-gray-800">
                <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/80 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-200">
                    ⚡ {item.energy_level}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white capitalize">{item.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded w-max mt-2">
                    {item.mood}
                </p>

                <div className="mt-auto pt-4 flex justify-between items-center">
                    <button
                        onClick={onLike}
                        className="flex items-center gap-2 text-rose-500 font-bold hover:scale-110 active:scale-95 transition-transform bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-full"
                    >
                        ❤️ {item.like_count || 0}
                    </button>
                    <span className="text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}