import { useNavigate } from "react-router-dom";
import MediaCard from "../components/media/MediaCard.jsx";
import "./LibraryPage.scss";

export default function LibraryPage({ favorites, onFavoriteToggle, onCardClick }) {
    const navigate = useNavigate();

    return (
        <div className="library">
            <div className="library__inner">
                <h2 className="section-title">My Library</h2>

                {favorites.length === 0 ? (
                    <div className="library__empty">
                        <p>Your library is empty.</p>
                        <button className="btn-primary" onClick={() => navigate("/")}>
                            Start Discovering
                        </button>
                    </div>
                ) : (
                    <div className="grid">
                        {favorites.map((fav) => (
                            <MediaCard
                                key={fav.mediaId}
                                item={{
                                    imdbID: fav.mediaId,
                                    id: fav.mediaId,
                                    Title: fav.title,
                                    title: fav.title,
                                    Poster: fav.poster,
                                    thumbnail: fav.poster,
                                    Year: fav.year,
                                    type: fav.mediaType,
                                }}
                                isFav={true}
                                onFavorite={onFavoriteToggle}
                                onClick={onCardClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}