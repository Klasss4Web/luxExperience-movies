import { renderToString } from "react-dom/server";
import { RouterProvider } from "react-router-dom";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieById,
} from "./services/fetchMovies";
import { logger } from "./logger/loger";
import { createRouter } from "./app/router";
import { WishlistProvider } from "./context/WishListContext";
import { SsrDataContext, type SsrData } from "./context/SSRContext";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";

type Meta = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
};

export async function render(url: string) {
  try {
    let data: SsrData = {};
    let meta: Meta = {
      title: "Lux Experience Movies",
      description: "Browse trending and top-rated movies",
      canonical: url,
      image: "",
    };

    if (url === "/") {
      try {
        const [popular, topRated, upcoming] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
        ]);

        data = { popular, topRated, upcoming };
      } catch (error) {
        data = { error: error as string };
        logger.error("Failed to fetch movies", error as Error);
      }
    }
    if (url.startsWith("/wishlist")) {
      meta = {
        title: "Your Wishlist",
        description: "Your saved movies",
        canonical: url,
      };
    }

    if (url.startsWith("/movie/")) {
      const id = url.split("/movie/")[1];
      const removeIdFromParams = id.split("?")[0];
      try {
        data.movie = await getMovieById(removeIdFromParams);
        meta = {
          title: `${data?.movie?.title} | Lux Experience`,
          description: data?.movie?.overview?.slice(0, 150) as string,
          canonical: url,
          image: data?.movie?.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.movie.poster_path}`
            : "",
        };
      } catch (error) {
        data = { error: error as string };
        logger.error("Failed to fetch movie", error as Error);
      }
    }

    const html = renderToString(
      <ErrorBoundary>
        <SsrDataContext.Provider value={data}>
          <WishlistProvider>
            <RouterProvider router={createRouter(url)} />
          </WishlistProvider>
        </SsrDataContext.Provider>
      </ErrorBoundary>,
    );

    return { html, data, meta };
  } catch (error) {
    return {
      data: { error },
      meta: {
        title: "Error | Lux Experience",
        description: "Something went wrong",
        canonical: url,
      },
    };
  }
}
