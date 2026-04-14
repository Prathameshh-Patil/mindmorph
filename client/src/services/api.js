const BASE_URL = "http://localhost:3001/api/mindforms";

export const generateMindform = async (data) => {
    const res = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
};
export const fetchMindforms = async (sort = "latest") => {
    const res = await fetch(`http://localhost:3001/api/mindforms?sort=${sort}`);
    return res.json();
};

export const likeMindform = async (id) => {
    const res = await fetch(
        `http://localhost:3001/api/mindforms/${id}/like`,
        {
            method: "PATCH",
        }
    );
    return res.json();
};