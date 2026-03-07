import "./MediaCard.scss";

export default function MediaCard({ item, onFavorite, isFav, onClick }) {
    const poster = item.Poster !== "N/A" ? item.Poster : item.thumbnail || null;
    const title = item.Title || item.title;
    const year = item.Year || item.publishedDate?.slice(0, 4) || "—";

    return (
        <div className="card" onClick={() => onClick(item)}>

            <div className="card-poster">
                {poster ? (
                    <img src={poster} alt={title} loading="lazy" />
                ) : (
                    <div className="no-poster">
                        {item.type === "book" ? "📚" : "🎬"}
                    </div>
                )}
                <div className="card-overlay">
                    <span className="card-year">{year}</span>
                    {item.Type && <span className="card-type">{item.Type}</span>}
                </div>
            </div>

            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                {item.author && <p className="card-sub">{item.author}</p>}
                <button
                    className={`fav-btn ${isFav ? "active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); onFavorite(item); }}
                >
                    {isFav ? "♥ Saved" : "♡ Save"}
                </button>
            </div>

        </div>
    );
}
