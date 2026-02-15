import "../styles/HomePage.css";

import type { Movie } from "../types/movie";
import { useSsrData } from "../context/SSRContext";
import { Navbar } from "../components/nav-bar/Navbar";
import Carousel from "../components/carousel/Carousel";
import { HOME_PAGE_EMPTY_STATE } from "../constants/data";
import MovieCard from "../components/movie-card/MovieCard";
import EmptyState from "../components/empty-state/EmptyState";

const HomePage = () => {
  const data = useSsrData();
  if (!data) {
    return (
      <EmptyState
        title={HOME_PAGE_EMPTY_STATE.emptyTitle}
        description={HOME_PAGE_EMPTY_STATE.emptyDescription}
      />
    );
  }

  const { popular, topRated, upcoming, error } = data;

  if (error) {
    return (
      <EmptyState
        title={HOME_PAGE_EMPTY_STATE.errorTitle}
        description={HOME_PAGE_EMPTY_STATE.errorDescription}
        status={HOME_PAGE_EMPTY_STATE.errorStatus}
      />
    );
  }
  return (
    <>
      <Navbar />

      <main className="home-page-container">
        <Carousel
          title="Popular"
          items={popular?.results ?? []}
          renderItem={(movie) => (
            <MovieCard movie={movie as Movie} category="popular" />
          )}
        />

        <Carousel
          title="Top Rated"
          items={topRated?.results ?? []}
          renderItem={(movie) => (
            <MovieCard movie={movie as Movie} category="topRated" />
          )}
        />

        <Carousel
          title="Upcoming"
          items={upcoming?.results ?? []}
          renderItem={(movie) => (
            <MovieCard movie={movie as Movie} category="upcoming" />
          )}
        />
      </main>
    </>
  );
};

export default HomePage;
