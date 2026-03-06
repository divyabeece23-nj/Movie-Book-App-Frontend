import { useState } from "react";
import MediaCard from "../components/media/MediaCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import { searchMedia } from "../api/api.js";
import "./DiscoverPage.css";

export default function DiscoverPage({ favorites, onFavoriteToggle, onCardClick }) {
    const [query, setQuery] = useState("");
    const [mediaType, setType] = useState("movie");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    const isFav = (item) =>
        favorites.some((f) => f.mediaId === (item.imdbID || item.id));

    const search = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError("");
        setResults([]);
        setSearched(true);
        try {
            const data = await searchMedia(query, mediaType);
            setResults(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="discover">

            <section className="hero">
                <div className="hero__bg" />
                <div className="hero__content">
                    <h1 className="hero__title">
                        Find. Watch.<br />Read. <em>Review.</em>
                    </h1>
                    <p className="hero__sub">
                        Search millions of movies and books. Save favorites. Share your take.
                    </p>

                    <div className="search-bar">
                        <div className="type-toggle">
                            <button className={mediaType === "movie" ? "active" : ""} onClick={() => setType("movie")}>
                                🎬 Movies
                            </button>
                            <button className={mediaType === "book" ? "active" : ""} onClick={() => setType("book")}>
                                📚 Books
                            </button>
                        </div>
                        <input
                            className="search-bar__input"
                            placeholder={`Search ${mediaType === "movie" ? "movies" : "books"}…`}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && search()}
                        />
                        <button className="search-bar__btn" onClick={search}>Search</button>
                    </div>
                </div>
            </section>

            <section className="discover__results">
                {loading && <Spinner />}
                {error && <p className="error-msg">{error}</p>}

                {!loading && results.length > 0 && (
                    <>
                        <h2 className="section-title">Results for "{query}"</h2>
                        <div className="grid">
                            {results.map((item) => (
                                <MediaCard
                                    key={item.imdbID || item.id}
                                    item={item}
                                    isFav={isFav(item)}
                                    onFavorite={onFavoriteToggle}
                                    onClick={onCardClick}
                                />
                            ))}
                        </div>
                    </>
                )}

                {!loading && searched && results.length === 0 && !error && (
                    <p className="empty-state">No results found for "{query}"</p>
                )}
            </section>

        </div>
    );
}
