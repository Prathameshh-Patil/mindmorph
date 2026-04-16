const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
const BASE_URL = `${BACKEND_URL}/api/mindforms`;

export const generateMindform = async (data) => {
    const res = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate mindform");
    }

    return res.json();
};

export const fetchMindforms = async (sort = "latest") => {
    const res = await fetch(`${BASE_URL}?sort=${sort}`);
    
    if (!res.ok) {
        throw new Error("Failed to fetch mindforms");
    }
    
    return res.json();
};

export const likeMindform = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}/like`, {
        method: "PATCH",
    });
    
    if (!res.ok) {
        throw new Error("Failed to like mindform");
    }
    
    return res.json();
};