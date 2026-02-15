import { useState, useEffect } from "react";

import type { Movie } from "../../types/movie";
import { searchMovies } from "../../services/fetchMovies";

const placeholderImage = "../../assets/placeholder-img.jpg";

export default function SearchInput({
  initialQuery = "",
  initialResults = [],
}) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(async () => {
      const data = await searchMovies(query);
      setResults(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {results.length > 0 && (
        <div className="search-dropdown">
          {results.map((movie: Movie) => (
            <a
              href={`/movie/${movie.id}?category=${encodeURIComponent("topRated")}`}
              className="search-dropdown__link"
            >
              <div className="search-dropdown__item">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : placeholderImage
                  }
                  alt={movie.title}
                  loading="lazy"
                />
                <p key={movie.id}>{movie.title}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
