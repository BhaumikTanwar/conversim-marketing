import { Suspense, lazy, useEffect } from "react";
import { useLocation, useRoutes } from "react-router";

import { usePageMeta } from "./shared/hooks/usePageMeta";
import Loader from "./shared/components/Loader";
import { APP_ROUTES, toAppUrl } from "./lib/env";

const Landing = lazy(() => import("./features/landing/pages/Landing"));
const StoryblokPage = lazy(() => import("./features/landing/pages/StoryblokPage"));
const Privacy = lazy(() => import("./features/legal/Privacy"));
const Terms = lazy(() => import("./features/legal/Terms"));

function ScrollAndMeta() {
  const { pathname, hash } = useLocation();
  usePageMeta(pathname);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    const targetId = decodeURIComponent(hash.slice(1));
    let observer: MutationObserver | undefined;
    let timeout: number | undefined;
    let cancelled = false;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;
      observer?.disconnect();
      if (timeout !== undefined) window.clearTimeout(timeout);
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return true;
    };

    if (!scrollToTarget()) {
      observer = new MutationObserver(() => {
        if (!cancelled) scrollToTarget();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = window.setTimeout(() => observer?.disconnect(), 10000);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
}

function MainAppRedirect() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    window.location.replace(toAppUrl(`${pathname}${search}${hash}`));
  }, [pathname, search, hash]);
  return <Loader label="Opening Conversim app…" />;
}

function HomeRedirect() {
  const { search, hash } = useLocation();
  useEffect(() => {
    window.location.replace(`/${search}${hash}`);
  }, [search, hash]);
  return <Loader label="Opening homepage…" />;
}

export default function App() {
  const routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "/home", element: <HomeRedirect /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/terms", element: <Terms /> },
    ...APP_ROUTES.map((route) => ({ path: `/${route}/*`, element: <MainAppRedirect /> })),
    { path: "*", element: <StoryblokPage /> },
  ]);

  return (
    <Suspense fallback={<div className="min-h-dvh bg-bg flex items-center justify-center"><Loader label="Loading Conversim…" /></div>}>
      <ScrollAndMeta />
      {routes}
    </Suspense>
  );
}
