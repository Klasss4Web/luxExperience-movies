import { useSearchParams } from "react-router-dom";

import "../styles/MovieDetails.css";
import type { Movie } from "../types/movie";
import Button from "../components/button/Button";
import { useSsrData } from "../context/SSRContext";
import { useWishlist } from "../context/useWishList";
import { Navbar } from "../components/nav-bar/Navbar";
import { DETAILS_PAGE_EMPTY_STATE } from "../constants/data";
import { RatingCard } from "../components/reviews/RatingCard";
import EmptyState from "../components/empty-state/EmptyState";
import ShareMovie from "../components/social-share/SocialShare";
import AdditionalInfoCard from "../components/additional-info-card/AdditionalInfoCard";

export default function MovieDetail() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") ?? "popular";
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const data = useSsrData();
  const movie = data?.movie as Movie;

  if (!movie) {
    return (
      <>
        <Navbar />
        <EmptyState
          title={DETAILS_PAGE_EMPTY_STATE.emptyTitle}
          description={DETAILS_PAGE_EMPTY_STATE.emptyDescription}
        />
      </>
    );
  }

  if (data?.error) {
    return (
      <EmptyState
        title={DETAILS_PAGE_EMPTY_STATE.errorTitle}
        description={DETAILS_PAGE_EMPTY_STATE.errorDescription}
        status={DETAILS_PAGE_EMPTY_STATE.errorStatus}
      />
    );
  }

  const inWishlist = isInWishlist(movie.id);

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(movie.id);
    } else {
      const moviewithCategory = { ...movie, category };
      addToWishlist(moviewithCategory);
    }
  };

  return (
    <>
      <Navbar />
      <div className={`movie-detail movie-detail--${category}`}>
        <div className="image-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-detail__content">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>

          <div className="movie-detail__actions">
            <Button
              active={inWishlist}
              className={`btn btn--${category} ${
                inWishlist ? "btn--active" : ""
              }`}
              onClick={handleWishlistClick}
            >
              {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            </Button>

            <Button href="/" className={`btn btn--${category}`}>
              Go back home
            </Button>
          </div>
          <ShareMovie description={movie.title} />
          <RatingCard movieId={movie.id} />
        </div>
      </div>
      <AdditionalInfoCard movie={movie} />;
    </>
  );
}
