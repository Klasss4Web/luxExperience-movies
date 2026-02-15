import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./routes";

export const createRouter = (url?: string) => {
  return typeof window === "undefined"
    ? createMemoryRouter(routes, { initialEntries: [url!] })
    : createBrowserRouter(routes);
};
