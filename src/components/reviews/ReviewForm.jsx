import { useState } from "react";
import StarRating from "../ui/StarRating.jsx";
import { postReview } from "../../api/api.js";
import "./ReviewForm.scss";

export default function ReviewForm({ mediaId, mediaType, token, onReviewAdded }) {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async () => {
        if (!rating) return setError("Please select a star rating.");
        if (!text.trim()) return setError("Please write something before posting.");

        setLoading(true);
        setError("");
        try {
            const review = await postReview(token, { mediaId, mediaType, rating, text });
            onReviewAdded(review);
            setRating(0);
            setText("");
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="review-form">
            <h4 className="review-form__title">Write a Review</h4>
            <StarRating value={rating} onChange={setRating} />
            <textarea
                className="review-form__textarea"
                placeholder="Share your thoughts…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
            />
            {error && <p className="form-error">{error}</p>}
            <button className="btn-primary" onClick={submit} disabled={loading}>
                {loading ? "Posting…" : "Post Review"}
            </button>
        </div>
    );
}
