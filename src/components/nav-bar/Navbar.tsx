import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import SearchInput from "../inputs/SearchInput";
import { useWishlist } from "../../context/useWishList";

export const Navbar = ({ initialResults = [] }) => {
  const [scrolled, setScrolled] = useState(false);
  const { wishlist  } = useWishlist();

  const wishlistCount = wishlist.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-left">
        <a href="/" className="logo">
          🎬 <span className="hidden">LuxExperienceMovies</span>
        </a>
      </div>

      <div className="nav-center">
        <SearchInput initialQuery="" initialResults={initialResults} />
      </div>

      <div className="nav-right">
        <Link to="/wishlist" className="wishlist-btn">
          ❤️
          {wishlistCount > 0 && (
            <span className="wishlist-badge">{wishlistCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};
