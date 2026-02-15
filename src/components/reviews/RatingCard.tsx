import { useEffect, useState } from "react";
import "./RatingCard.css";

export const RatingCard = ({ movieId }: { movieId: number }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`rating_${movieId}`);
    if (saved) setRating(Number(saved));
  }, [movieId]);

  const handleRate = (value: number | string) => {
    setRating(value as number);
    localStorage.setItem(`rating_${movieId}`, value as string);
  };

  return (
    <div className="client-rating">
      <h3>Rating this movie</h3>

      <div className="rating-stars">
        {[...Array(10)].map((_, index) => {
          const value = index + 1;
          return (
            <span
              key={value}
              className={`star ${value <= (hover || rating) ? "active" : ""}`}
              onClick={() => handleRate(value)}
              onMouseEnter={() => setHover(value as number)}
              onMouseLeave={() => setHover(null)}
            >
              ★
            </span>
          );
        })}
      </div>

      {rating && (
        <p className="rating-value">
          You rated this <strong>{rating} / 10</strong>
        </p>
      )}
    </div>
  );
};
