import { logger } from "../logger/loger";

const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function fetchFromTMDB(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${MOVIE_API_KEY}`);

    if (!res.ok && res.status !== 404) {
      throw new Error("TMDB request failed");
    }

    return res.json();
  } catch (error) {
    logger.error("Movie API is ending a warning", error as Error);
  }
}

export async function searchMovies(query: string) {
  if (!query) return [];

  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${MOVIE_API_KEY}&query=${encodeURIComponent(query)}`,
    );
    if (!res.ok) throw new Error("Failed to fetch movies");

    const data = await res.json();
    return data.results;
  } catch (error) {
    logger.error("Couldnt get your search request through", error as Error);
  }
}

export const getPopularMovies = () => fetchFromTMDB("/movie/popular");

export const getTopRatedMovies = () => fetchFromTMDB("/movie/top_rated");

export const getUpcomingMovies = () => fetchFromTMDB("/movie/upcoming");

export const getMovieById = (id: string) => fetchFromTMDB(`/movie/${id}`);
