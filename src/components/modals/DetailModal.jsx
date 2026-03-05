import { useState, useEffect } from "react";
import StarRating from "../ui/StarRating.jsx";
import ReviewForm from "../reviews/ReviewForm.jsx";
import Spinner from "../ui/Spinner.jsx";
import { getReviews } from "../../api/api.js";
import "./DetailModal.css";

export default function DetailModal({ item, token, onClose }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const mediaId = item.imdbID || item.id;
    const mediaType = item.type === "book" ? "book" : "movie";
    const poster = item.Poster !== "N/A" ? item.Poster : item.thumbnail || null;

    useEffect(() => {
        getReviews(mediaId)
            .then(setReviews)
            .catch(() => setReviews([]))
            .finally(() => setLoading(false));
    }, [mediaId]);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="detail-modal" onClick={(e) => e.stopPropagation()}>

                <button className="detail-modal__close" onClick={onClose}>✕</button>

                <div className="detail-modal__grid">

                    <div className="detail-modal__left">
                        {poster ? (
                            <img src={poster} alt={item.Title || item.title} className="detail-modal__poster" />
                        ) : (
                            <div className="detail-modal__no-poster">
                                {item.type === "book" ? "📚" : "🎬"}
                            </div>
                        )}
                    </div>

                    <div className="detail-modal__right">
                        <span className="detail-modal__badge">{mediaType}</span>
                        <h2 className="detail-modal__title">{item.Title || item.title}</h2>
                        {item.author && <p className="detail-modal__author">by {item.author}</p>}

                        <div className="detail-modal__meta">
                            {item.Year && <span>{item.Year}</span>}
                            {item.Genre && <span>{item.Genre}</span>}
                            {item.Runtime && <span>{item.Runtime}</span>}
                            {item.imdbRating && item.imdbRating !== "N/A" && (
                                <span>⭐ {item.imdbRating} IMDb</span>
                            )}
                        </div>

                        {item.Plot && item.Plot !== "N/A" && (
                            <p className="detail-modal__plot">{item.Plot}</p>
                        )}
                        {item.description && (
                            <p className="detail-modal__plot"
                                dangerouslySetInnerHTML={{ __html: item.description.slice(0, 300) + "…" }}
                            />
                        )}

                        <div className="detail-modal__reviews">
                            <h3 className="detail-modal__reviews-title">
                                Community Reviews ({reviews.length})
                            </h3>

                            {loading ? <Spinner /> : reviews.length === 0 ? (
                                <p className="detail-modal__empty">No reviews yet. Be the first!</p>
                            ) : (
                                reviews.map((r) => (
                                    <div key={r._id} className="review-item">
                                        <div className="review-item__header">
                                            <span className="review-item__user">{r.user?.name || "Anonymous"}</span>
                                            <StarRating value={r.rating} readonly />
                                        </div>
                                        <p className="review-item__text">{r.text}</p>
                                    </div>
                                ))
                            )}

                            {token ? (
                                <ReviewForm
                                    mediaId={mediaId}
                                    mediaType={mediaType}
                                    token={token}
                                    onReviewAdded={(r) => setReviews((prev) => [r, ...prev])}
                                />
                            ) : (
                                <p className="detail-modal__login-prompt">Log in to leave a review.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
