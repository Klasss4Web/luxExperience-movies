import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import MovieDetail from "../pages/MovieDetails";
import WishlistPage from "../pages/WishListPage";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/movie/:id", element: <MovieDetail /> },
  {
    path: "/wishlist",
    element: <WishlistPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
