import { createContext, useContext } from "react";
import type { Movie, MovieListResponse } from "../types/movie";

export interface SsrData {
  popular?: MovieListResponse;
  topRated?: MovieListResponse;
  upcoming?: MovieListResponse;
  searchResults?: MovieListResponse;
  movie?: Movie;
  error?: string;
}

export const SsrDataContext = createContext<SsrData | null>(null);

export function useSsrData() {
  return useContext(SsrDataContext);
}
