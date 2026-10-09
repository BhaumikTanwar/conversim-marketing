import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MotionConfig } from "framer-motion";
import { apiPlugin, storyblokInit } from "@storyblok/react";

import App from "./App";
import { env } from "./lib/env";
import ErrorBoundary from "./shared/components/ErrorBoundary";
import "./index.css";

storyblokInit({
  accessToken: env.storyblokToken,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
