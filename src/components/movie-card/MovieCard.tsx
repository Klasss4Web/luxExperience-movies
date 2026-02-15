import "./MovieCard.css";
const placeholderImage = "../../assets/placeholder-img.jpg";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

export default function MovieCard({
  movie,
  category,
}: {
  movie: Movie;
  category: string;
}) {
  return (
    <a href={`/movie/${movie.id}?category=${encodeURIComponent(category)}`}>
      <div className="movie-card">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : placeholderImage
          }
          alt={movie.title}
          loading="lazy"
        />
        <h3 className="movie-title ellipsis" title={movie.title}>
          {movie.title}
        </h3>
      </div>
    </a>
  );
}
