import { useState, useEffect, useCallback } from "react";
import { fetchMindforms, likeMindform as apiLikeMindform } from "../services/api";

export function useMindforms(sortParam = "latest", searchQuery = "") {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetchMindforms(sortParam);
            // Apply search locally to save backend load, or could do backend search
            const filteredData = res.filter(item => 
                 item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 (item.mood && item.mood.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setData(filteredData);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [sortParam, searchQuery]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Optimistic UI for likes
    const toggleLike = async (id) => {
        // Optimistically update
        setData(prevData => prevData.map(item => 
            item.id === id ? { ...item, like_count: item.like_count + 1 } : item
        ));
        
        try {
            await apiLikeMindform(id);
        } catch (err) {
            // Revert on failure
            console.error("Like failed", err);
            setData(prevData => prevData.map(item => 
                item.id === id ? { ...item, like_count: item.like_count - 1 } : item
            ));
        }
    };

    return { data, loading, error, toggleLike, refetch: loadData };
}
