/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { EASE } from "../../../lib/animations";
import { scrollToSection } from "../../../lib/utils";
import { toAppUrl } from "../../../lib/env";
import { Logo } from "../../../shared/components/Logo";

interface NavigationItem {
  _uid?: string;
  _editable?: string;
  component?: string;
  label?: string;
  target_anchor?: string;
  open_in_new_tab?: boolean;
}

interface HeaderBlok {
  _uid?: string;
  _editable?: string;
  component?: string;

  logo?: {
    filename?: string;
    alt?: string;
  };

  logo_alt_text?: string;

  navigation_items?: NavigationItem[];

  header_style?: string;
  style?: string;

  show_authentication_actions?: boolean;

  log_in_label?: string;
  log_in_url?: string;

  sign_up_label?: string;
  sign_up_url?: string;
}

interface HeaderProps {
  blok?: HeaderBlok;
}

export default function Header({ blok }: HeaderProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigationItems = (blok
    ? blok.navigation_items ?? []
    : [
        {
          label: "Home",
          target_anchor: "#",
        },
        {
          label: "Use Cases",
          target_anchor: "#use-cases",
        },
        {
          label: "How It Works",
          target_anchor: "#how-it-works",
        },
        {
          label: "Preview",
          target_anchor: "#preview",
        },
        {
          label: "Pricing",
          target_anchor: "#pricing",
        },
      ]).filter((item) => item.label?.trim() && item.target_anchor?.trim());

  const showAuthActions =
    blok?.show_authentication_actions ?? true;

  const loginLabel = blok ? blok.log_in_label?.trim() : "Log In";
  const loginUrl = blok?.log_in_url?.trim()
    ? toAppUrl(blok.log_in_url)
    : !blok
      ? toAppUrl("/login")
      : "";

  const signupLabel = blok ? blok.sign_up_label?.trim() : "Sign up";
  const signupUrl = blok?.sign_up_url?.trim()
    ? toAppUrl(blok.sign_up_url)
    : !blok
      ? toAppUrl("/signup")
      : "";

  function handleNavigation(
    event: React.MouseEvent<HTMLAnchorElement>,
    target?: string,
  ) {
    if (!target) return;

    const anchor = target.startsWith("#")
      ? target.slice(1)
      : target;

    // Home
    if (!anchor) {
      scrollToSection("", event);
      return;
    }

    // Section anchor
    if (target.startsWith("#")) {
      if (location.pathname === "/") {
        scrollToSection(anchor, event);
        return;
      }

      event.preventDefault();
      const targetElement = anchor ? document.getElementById(anchor) : null;
      if (!anchor) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (targetElement) {
        const targetY = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      } else {
        scrollToSection(anchor, event);
        return;
      }
      window.history.pushState(null, "", `${location.pathname}${target}`);
    }
  }

  const headerStyle = blok?.header_style ?? blok?.style ?? "solid";
  const transparentAtTop =
    ["transparent", "transparent_at_top", "transparent-at-top"].includes(headerStyle) &&
    !scrolled;

  return (
    <motion.header
      {...(blok ? storyblokEditable(blok as any) : {})}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: EASE }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        transparentAtTop
          ? "bg-transparent"
          : scrolled
            ? "bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgba(29,28,24,0.06)]"
            : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        {blok?.logo?.filename ? (
          <a href="/" aria-label={blok.logo_alt_text || blok.logo.alt || "Home"}>
            <img
              src={blok.logo.filename}
              alt={blok.logo_alt_text || blok.logo.alt || "Logo"}
              className="h-8 w-auto object-contain"
            />
          </a>
        ) : (
          <Logo className="text-lg font-semibold" />
        )}

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item, index) => {
            const target = item.target_anchor || "#";
            const isAnchor = target.startsWith("#");

            return (
              <a
                key={item._uid || `${item.label}-${index}`}
                {...(item._uid
                  ? storyblokEditable(item as any)
                  : {})}
                href={
                  isAnchor && location.pathname === "/"
                    ? `/${target}`
                    : target
                }
                target={item.open_in_new_tab ? "_blank" : undefined}
                rel={
                  item.open_in_new_tab
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={(e) => {
                  if (!item.open_in_new_tab) handleNavigation(e, target);
                }}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Authentication */}
        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.38,
            delay: 0.18,
            ease: EASE,
          }}
          className="flex items-center gap-3"
        >
          {showAuthActions && (
              <>
                {loginLabel && loginUrl && <a
                  href={loginUrl}
                  className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-medium transition-colors"
                >
                  {loginLabel}
                </a>}

                {signupLabel && signupUrl && <a
                  href={signupUrl}
                  className="bg-brand hover:bg-brand-hover text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors shadow-[0_2px_12px_rgba(37,99,235,0.25)]"
                >
                  {signupLabel}
                </a>}
              </>
            )}
        </motion.div>
      </div>
    </motion.header>
  );
}
