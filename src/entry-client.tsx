import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { createRouter } from "./app/router";
import { WishlistProvider } from "./context/WishListContext";
import { SsrDataContext, type SsrData } from "./context/SSRContext";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";

declare global {
  interface Window {
    __SSR_DATA__?: unknown;
  }
}

const ssrData = window.__SSR_DATA__;

delete window.__SSR_DATA__;

hydrateRoot(
  document.getElementById("root")!,
  <ErrorBoundary>
    <SsrDataContext.Provider value={ssrData as SsrData}>
      <WishlistProvider>
        <RouterProvider router={createRouter()} />
      </WishlistProvider>
    </SsrDataContext.Provider>
  </ErrorBoundary>,
);
