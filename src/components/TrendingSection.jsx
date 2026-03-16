import React, { useState, useEffect } from "react";
import GenreFilter from "./GenreFilter";
import "./TrendingSection.scss";

const TrendingSection = ({ onMovieClick }) => {
    const [movies, setMovies] = useState([]);
    const [featured, setFeatured] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    // Fetch featured movie of the day
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch(`${API_URL}/trending/featured`);
                const data = await res.json();
                setFeatured(data);
            } catch (err) {
                console.error("Failed to fetch featured movie:", err);
            }
        };
        fetchFeatured();
    }, [API_URL]);

    // Fetch trending movies (filtered by genre if selected)
    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const genreParam = selectedGenre ? `?genre=${selectedGenre}` : "";
                const res = await fetch(`${API_URL}/trending${genreParam}`);
                const data = await res.json();
                setMovies(data);
            } catch (err) {
                console.error("Failed to fetch trending:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, [selectedGenre, API_URL]);

    const handleGenreSelect = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <section className="trending-section">
            {/* Featured Movie of the Day */}
            {featured && (
                <div
                    className="featured-movie"
                    onClick={() => onMovieClick && onMovieClick(featured.imdbID)}
                >
                    <div className="featured-badge">★ Movie of the Day</div>
                    <div className="featured-content">
                        {featured.poster && (
                            <img
                                src={featured.poster}
                                alt={featured.title}
                                className="featured-poster"
                                onError={(e) => (e.target.src = "/placeholder.png")}
                            />
                        )}
                        <div className="featured-info">
                            <h2 className="featured-title">{featured.title}</h2>
                            <div className="featured-meta">
                                <span>{featured.year}</span>
                                {featured.runtime && <span>· {featured.runtime}</span>}
                                {featured.imdbRating && <span>· ⭐ {featured.imdbRating}</span>}
                            </div>
                            {featured.genre && (
                                <div className="featured-genres">
                                    {featured.genre.map((g) => (
                                        <span key={g} className="featured-genre-tag">
                                            {g}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {featured.plot && <p className="featured-plot">{featured.plot}</p>}
                            {featured.director && (
                                <p className="featured-director">Directed by {featured.director}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Genre Filter */}
            <div className="trending-header">
                <h2 className="trending-title">
                    {selectedGenre ? `${selectedGenre} Movies` : "Trending Now"}
                </h2>
            </div>
            <GenreFilter onGenreSelect={handleGenreSelect} selectedGenre={selectedGenre} />

            {/* Movie Grid */}
            {loading ? (
                <div className="trending-loading">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="skeleton-card" />
                    ))}
                </div>
            ) : movies.length > 0 ? (
                <div className="trending-grid">
                    {movies.map((movie) => (
                        <div
                            key={movie.imdbID}
                            className="trending-card"
                            onClick={() => onMovieClick && onMovieClick(movie.imdbID)}
                        >
                            <div className="trending-poster-wrapper">
                                <img
                                    src={movie.poster || "/placeholder.png"}
                                    alt={movie.title}
                                    className="trending-poster"
                                    onError={(e) => (e.target.src = "/placeholder.png")}
                                />
                                {movie.imdbRating && (
                                    <div className="trending-rating">⭐ {movie.imdbRating}</div>
                                )}
                            </div>
                            <h3 className="trending-movie-title">{movie.title}</h3>
                            <p className="trending-movie-year">{movie.year}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="trending-empty">No movies found for this genre.</p>
            )}
        </section>
    );
};

export default TrendingSection;
