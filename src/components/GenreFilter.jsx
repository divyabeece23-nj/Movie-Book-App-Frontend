import React, { useState, useEffect } from "react";
import "./GenreFilter.css";

const GenreFilter = ({ onGenreSelect, selectedGenre }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/trending/genres`);
                const data = await res.json();
                setGenres(data);
            } catch (err) {
                console.error("Failed to fetch genres:", err);
            }
        };
        fetchGenres();
    }, []);

    return (
        <div className="genre-filter">
            <button
                className={`genre-chip ${!selectedGenre ? "active" : ""}`}
                onClick={() => onGenreSelect(null)}
            >
                All
            </button>
            {genres.map((genre) => (
                <button
                    key={genre}
                    className={`genre-chip ${selectedGenre === genre ? "active" : ""}`}
                    onClick={() => onGenreSelect(genre)}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenreFilter;
