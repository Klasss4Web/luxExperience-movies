import "./AdditionalInfoCard.css";
import { MetaItem } from "./MetaItem";
import type { Movie } from "../../types/movie";
import { MOVIE_URLS } from "../../constants/urls";

export default function AdditionalInfoCard({ movie }: { movie: Movie }) {
  if (!movie) return null;

  const {
    poster_path,
    title,
    original_title,
    overview,
    release_date,
    vote_average,
    vote_count,
    popularity,
    adult,
    genre_ids,
  } = movie;

  return (
    <div className="additional-card">
      <div className="additional-card__image">
        <img
          src={`${MOVIE_URLS.imageBaseUrl}${poster_path}`}
          alt={title}
          loading="lazy"
        />
      </div>

      <div className="additional-card__content">
        <h2 className="title">{title}</h2>

        {original_title !== title && (
          <p className="original-title">
            Original: <span>{original_title}</span>
          </p>
        )}

        <p className="overview">{overview}</p>

        <div className="meta-grid">
          <MetaItem label="Release Date" value={release_date} />
          <MetaItem label="Rating" value={`${vote_average} / 10`} />
          <MetaItem label="Votes" value={vote_count} />
          <MetaItem label="Popularity" value={popularity} />
          <MetaItem label="Adult" value={adult ? "Yes" : "No"} />
          <MetaItem label="Genres (IDs)" value={genre_ids?.join(", ")} />
        </div>
      </div>
    </div>
  );
}
