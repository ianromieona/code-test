import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";

import useFetch from "./hooks/useFetch";
import Spinner from "./components/Spinner";
import Shuttle from "./components/Shuttle";

import "./App.css";

function App() {
    const shuttleList = useRef(null);
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const [search] = useDebounce(query, 300);

    const { data, loading, error, hasMore } = useFetch(
        "https://api.spacexdata.com/v3/launches",
        page,
        search
    );

    useEffect(() => {
        const shuttleListRef = shuttleList.current;
        shuttleListRef.addEventListener("scroll", handleScroll);
        return () => shuttleListRef.removeEventListener("scroll", handleScroll);
    }, [loading]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = shuttleList.current;

        if (
            scrollTop + clientHeight >= scrollHeight - 5 &&
            !loading &&
            hasMore
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleSearch = (e) => {
        setQuery(e.target.value);
        setPage(0);
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="App">
            <div style={{ padding: "10px" }}>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                    className="inputSearch"
                />
            </div>
            <div className="shuttleList" ref={shuttleList}>
                {data.map((launch, index) => (
                    <Shuttle key={index} launch={launch} />
                ))}
                {loading && <Spinner />}
                {!hasMore && <div className="endoflist">End of the list</div>}
            </div>
        </div>
    );
}

export default App;
