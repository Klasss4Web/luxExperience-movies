import "../styles/WishListPage.css";
import { useWishlist } from "../context/useWishList";
import { Navbar } from "../components/nav-bar/Navbar";
import { EMPTY_STATE_WISH_LIST } from "../constants/data";
import MovieCard from "../components/movie-card/MovieCard";
import EmptyState from "../components/empty-state/EmptyState";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (Array.isArray(wishlist) && wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <EmptyState
          title={EMPTY_STATE_WISH_LIST.title}
          description={EMPTY_STATE_WISH_LIST.mainBtnText}
          mainBtnText={EMPTY_STATE_WISH_LIST.description}
        />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="wishlist">
        <h1>Your Wishlist</h1>
        <div className="wishlist__grid">
          {Array.isArray(wishlist) &&
            wishlist.map((movie) => (
              <div key={movie.id} className="wishlist__card">
                <MovieCard
                  movie={movie}
                  category={movie?.category ?? "popular"}
                />

                <button
                  className="btn btn--upcoming"
                  onClick={() => removeFromWishlist(movie.id)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
