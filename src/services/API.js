
const API_KEY = "hiB5rh/crSaKBH9eXZGs+w==5NWedHbl6inSclsH";
const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

export const searchExercises = async (query, type="name") => {

    const url = type === "name" 
        ? `${BASE_URL}?name=${encodeURIComponent(query)}`
        : `${BASE_URL}?muscle=${encodeURIComponent(query)}`;

    const response = await fetch( url,
        {
            method: "GET",
            headers: { "X-Api-Key": API_KEY},
        },
    );

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
}