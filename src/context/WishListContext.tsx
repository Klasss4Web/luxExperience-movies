"use client";

import { useState, useEffect } from "react";

import type { Movie } from "../types/movie";
import { WishlistContext } from "./useWishList";

const STORAGE_KEY = "movie_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const savedWishlist = sessionStorage.getItem(STORAGE_KEY);
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from session storage", error);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie: Movie) => {
    setWishlist((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie],
    );
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((m) => m.id !== id));
  };

  const isInWishlist = (id: number) => wishlist.some((m) => m.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
