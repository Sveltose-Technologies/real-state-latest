"use client";
import { useState, useCallback } from "react";

export const useFetch = (apiMethod) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (params = null) => {
            setLoading(true);
            setError(null);
            try {
                const res = await apiMethod(params);
                let apiData = res?.data ?? res;

                // --- IMPROVED LOGIC ---
                if (apiData && typeof apiData === "object" && !Array.isArray(apiData)) {
                    // 1. Check for common keys (matching your project needs)
                    const commonKeys = [
                        "contact",
                        ""

                    ];
                    const foundKey = commonKeys.find((key) =>
                        Array.isArray(apiData[key]),
                    );

                    if (foundKey) {
                        apiData = apiData[foundKey];
                    } else {
                        // 2. Fallback: If no common key is found, find the first key that is an array
                        const keys = Object.keys(apiData);
                        const firstArrayKey = keys.find((k) => Array.isArray(apiData[k]));
                        if (firstArrayKey) {
                            apiData = apiData[firstArrayKey];
                        }
                    }
                }

                // Normalize to array
                const finalData = Array.isArray(apiData)
                    ? apiData
                    : apiData
                        ? [apiData]
                        : [];

                setData(finalData);
                return finalData;
            } catch (err) {
                const msg = err.response?.data?.message || "Failed to load data";
                setError(msg);
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        },
        [apiMethod],
    );

    return { data, loading, error, fetchData, setData };
};
