import { Suspense, lazy, useEffect } from "react";
import { useLocation, useRoutes } from "react-router";

import { usePageMeta } from "./shared/hooks/usePageMeta";
import Loader from "./shared/components/Loader";
import { toAppUrl } from "./lib/env";

const Landing = lazy(() => import("./features/landing/pages/Landing"));
const StoryblokPage = lazy(() => import("./features/landing/pages/StoryblokPage"));
const SalesRoleplay = lazy(() => import("./features/landing/pages/SalesRoleplay"));
const HealthcareLanding = lazy(() => import("./features/landing/pages/HealthcareLanding"));
const PharmaLanding = lazy(() => import("./features/landing/pages/PharmaLanding"));
const InsuranceLanding = lazy(() => import("./features/landing/pages/InsuranceLanding"));
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
    { path: "/sales-roleplay", element: <SalesRoleplay /> },
    { path: "/healthcare", element: <HealthcareLanding /> },
    { path: "/pharma", element: <PharmaLanding /> },
    { path: "/insurance", element: <InsuranceLanding /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/terms", element: <Terms /> },
    { path: "/login/*", element: <MainAppRedirect /> },
    { path: "/signup/*", element: <MainAppRedirect /> },
    { path: "/dashboard/*", element: <MainAppRedirect /> },
    { path: "/settings/*", element: <MainAppRedirect /> },
    { path: "/billing/*", element: <MainAppRedirect /> },
    { path: "/profile/*", element: <MainAppRedirect /> },
    { path: "/attempts/*", element: <MainAppRedirect /> },
    { path: "/workshops/*", element: <MainAppRedirect /> },
    { path: "/call-presets/*", element: <MainAppRedirect /> },
    { path: "/mcp-servers/*", element: <MainAppRedirect /> },
    { path: "/personas/*", element: <MainAppRedirect /> },
    { path: "/evaluations/*", element: <MainAppRedirect /> },
    { path: "/try-demo/*", element: <MainAppRedirect /> },
    { path: "/share/*", element: <MainAppRedirect /> },
    { path: "/admin/*", element: <MainAppRedirect /> },
    { path: "*", element: <StoryblokPage /> },
  ]);

  return (
    <Suspense fallback={<div className="min-h-dvh bg-bg flex items-center justify-center"><Loader label="Loading Conversim…" /></div>}>
      <ScrollAndMeta />
      {routes}
    </Suspense>
  );
}
