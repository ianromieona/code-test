import { useState, useEffect } from "react";

function useFetch(url, page, query) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (query.length > 0) {
            setData(
                data.filter((f) =>
                    f.mission_name.toLowerCase().includes(query.toLowerCase())
                )
            );
        } else {
            setData([]);
            setHasMore(true);
        }
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${url}?limit=20&offset=${page * 20}&order=desc`
                );
                if (!response.ok) {
                    throw new Error("Error Response");
                }
                const newData = await response.json();
                if (newData.length === 0) {
                    setHasMore(false);
                }
                setData((prevData) => [...prevData, ...newData]);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (query.length === 0) {
            fetchData();
        }
    }, [url, page, query]);

    return { data, loading, error, hasMore };
}

export default useFetch;
