/* eslint-disable @typescript-eslint/no-explicit-any */
import { storyblokEditable } from "@storyblok/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { EASE } from "../../../lib/animations";
import { toAppUrl } from "../../../lib/env";
import { scrollToSection } from "../../../lib/utils";
import { Logo } from "../../../shared/components/Logo";

interface DropdownItem {
  _uid?: string;
  _editable?: string;
  component?: string;
  label?: string;
  description?: string;
  target_anchor?: string;
  open_in_new_tab?: boolean;
}

interface DropdownGroup {
  _uid?: string;
  _editable?: string;
  component?: string;
  title?: string;
  dropdown_items?: DropdownItem[];
}

interface NavigationItem extends DropdownItem {
  dropdown_items?: DropdownItem[];
  dropdown_groups?: DropdownGroup[];
}

interface HeaderBlok {
  _uid?: string;
  _editable?: string;
  component?: string;
  logo?: { filename?: string; alt?: string };
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

function validDropdownItems(items?: DropdownItem[]) {
  return (items ?? []).filter((child) => child.label?.trim() && child.target_anchor?.trim());
}

function dropdownGroupsFor(item: NavigationItem) {
  const groups = (item.dropdown_groups ?? [])
    .map((group) => ({ ...group, dropdown_items: validDropdownItems(group.dropdown_items) }))
    .filter((group) => group.dropdown_items.length > 0);

  if (groups.length > 0) return groups;

  const legacyItems = validDropdownItems(item.dropdown_items);
  return legacyItems.length > 0 ? [{ _uid: `${item._uid || item.label}-links`, dropdown_items: legacyItems }] : [];
}

export default function Header({ blok }: HeaderProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const navigationItems = (blok
    ? blok.navigation_items ?? []
    : [
        { label: "Home", target_anchor: "#" },
        { label: "Use Cases", target_anchor: "#use-cases" },
        { label: "How It Works", target_anchor: "#how-it-works" },
        { label: "Preview", target_anchor: "#preview" },
        { label: "Pricing", target_anchor: "#pricing" },
      ]).filter(
        (item) =>
          item.label?.trim() &&
          (item.target_anchor?.trim() || dropdownGroupsFor(item).length > 0),
      );

  const showAuthActions = blok?.show_authentication_actions ?? true;
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

  function hrefFor(target?: string) {
    if (!target) return "#";
    return target.startsWith("#") && location.pathname === "/" ? `/${target}` : target;
  }

  function handleNavigation(event: React.MouseEvent<HTMLAnchorElement>, target?: string) {
    if (!target) return;
    const anchor = target.startsWith("#") ? target.slice(1) : target;

    if (!anchor) {
      scrollToSection("", event);
      return;
    }

    if (target.startsWith("#")) {
      if (location.pathname === "/") {
        scrollToSection(anchor, event);
        return;
      }

      event.preventDefault();
      const targetElement = document.getElementById(anchor);
      if (targetElement) {
        const targetY = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        window.history.pushState(null, "", `${location.pathname}${target}`);
      } else {
        scrollToSection(anchor, event);
      }
    }
  }

  function navigationLink(item: DropdownItem, className: string) {
    const target = item.target_anchor || "#";
    return (
      <a
        key={item._uid || `${item.label}-${target}`}
        {...(item._uid ? storyblokEditable(item as any) : {})}
        href={hrefFor(target)}
        target={item.open_in_new_tab ? "_blank" : undefined}
        rel={item.open_in_new_tab ? "noopener noreferrer" : undefined}
        onClick={(event) => {
          setOpenDropdown(null);
          setMobileOpen(false);
          if (!item.open_in_new_tab) handleNavigation(event, target);
        }}
        className={className}
      >
        {item.label}
      </a>
    );
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
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpenDropdown(null);
      }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        transparentAtTop
          ? "bg-transparent"
          : scrolled
            ? "border-b border-slate-200/80 bg-white/90 shadow-[0_4px_20px_rgba(29,28,24,0.06)] backdrop-blur-xl"
            : "bg-white/85 backdrop-blur-lg"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8 2xl:max-w-[1440px] 3xl:max-w-[1760px]">
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

        <nav className="hidden items-center gap-1 self-stretch md:flex" aria-label="Main navigation">
          {navigationItems.map((item, index) => {
            const key = item._uid || `${item.label}-${index}`;
            const dropdownGroups = dropdownGroupsFor(item);

            if (dropdownGroups.length === 0) {
              return navigationLink(
                item,
                "rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
              );
            }

            const isOpen = openDropdown === key;
            return (
              <div
                key={key}
                // Narrow panels sit under their button; the 1040px one centres on the header row instead,
                // since centred on its button it runs off-screen below ~1500px.
                // Full row height keeps the hover area unbroken between the button and the panel.
                className={`flex items-center self-stretch ${dropdownGroups.length < 3 ? "relative" : ""}`}
                onMouseEnter={() => setOpenDropdown(key)}
                onMouseLeave={() => setOpenDropdown(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setOpenDropdown(null);
                }}
              >
                <button
                  type="button"
                  {...(item._uid ? storyblokEditable(item as any) : {})}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  // Hover already opened it, so a mouse/touch click (detail > 0) only opens; keyboard Enter/Space still toggles.
                  onClick={(event) => setOpenDropdown(isOpen && event.detail === 0 ? null : key)}
                  onFocus={() => setOpenDropdown(key)}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <div
                      className={`absolute left-1/2 top-full -translate-x-1/2 ${
                        dropdownGroups.length === 1
                          ? "w-[min(420px,calc(100vw-3rem))]"
                          : dropdownGroups.length === 2
                            ? "w-[min(720px,calc(100vw-3rem))]"
                            : "w-[min(1040px,calc(100vw-3rem))]"
                      }`}
                    >
                      <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.985 }}
                        transition={{ duration: 0.18, ease: EASE }}
                        className={`grid gap-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)] ${
                          dropdownGroups.length === 1
                            ? "grid-cols-1"
                            : dropdownGroups.length === 2
                              ? "grid-cols-2"
                              : dropdownGroups.length === 3
                                ? "grid-cols-3"
                                : "grid-cols-4"
                        }`}
                      >
                        {dropdownGroups.map((group) => (
                          <div
                            key={group._uid || group.title || "links"}
                            {...(group._uid ? storyblokEditable(group as any) : {})}
                            className="min-w-0"
                          >
                            {group.title?.trim() && (
                              <p className="mb-3 border-b border-slate-100 pb-3 text-base font-semibold tracking-tight text-slate-950">
                                {group.title}
                              </p>
                            )}
                            <div className="space-y-1">
                              {group.dropdown_items.map((child) => {
                                const target = child.target_anchor || "#";
                                return (
                                  <a
                                    key={child._uid || `${child.label}-${target}`}
                                    {...(child._uid ? storyblokEditable(child as any) : {})}
                                    role="menuitem"
                                    href={hrefFor(target)}
                                    target={child.open_in_new_tab ? "_blank" : undefined}
                                    rel={child.open_in_new_tab ? "noopener noreferrer" : undefined}
                                    onClick={(event) => {
                                      setOpenDropdown(null);
                                      if (!child.open_in_new_tab) handleNavigation(event, target);
                                    }}
                                    className="group flex items-start justify-between gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-blue-50/80 focus-visible:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                                  >
                                    <span className="min-w-0">
                                      <span className="block text-sm font-semibold text-slate-900 transition-colors group-hover:text-brand">
                                        {child.label}
                                      </span>
                                      {child.description?.trim() && (
                                        <span className="mt-1 block text-sm leading-5 text-slate-500">
                                          {child.description}
                                        </span>
                                      )}
                                    </span>
                                    <ArrowUpRight
                                      size={15}
                                      className="mt-0.5 shrink-0 text-slate-300 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100"
                                      aria-hidden="true"
                                    />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.38, delay: 0.18, ease: EASE }}
          className="flex items-center gap-2 sm:gap-3"
        >
          {showAuthActions && (
            <>
              {loginLabel && loginUrl && (
                <a
                  href={loginUrl}
                  className="hidden px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 lg:inline-flex"
                >
                  {loginLabel}
                </a>
              )}
              {signupLabel && signupUrl && (
                <a
                  href={signupUrl}
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-[0_2px_12px_rgba(37,99,235,0.25)] transition-colors hover:bg-brand-hover sm:px-5"
                >
                  {signupLabel}
                </a>
              )}
            </>
          )}
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="mx-auto max-w-[1280px] space-y-1 px-4 py-4 sm:px-6">
              {navigationItems.map((item, index) => {
                const key = item._uid || `${item.label}-${index}`;
                const dropdownGroups = dropdownGroupsFor(item);
                if (dropdownGroups.length === 0) {
                  return navigationLink(
                    item,
                    "block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                  );
                }

                const isOpen = mobileDropdown === key;
                return (
                  <div key={key}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setMobileDropdown(isOpen ? null : key)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 pb-3 pl-3">
                            {dropdownGroups.map((group) => (
                              <div key={group._uid || group.title || "links"}>
                                {group.title?.trim() && (
                                  <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                                    {group.title}
                                  </p>
                                )}
                                <div className="space-y-1">
                                  {group.dropdown_items.map((child) => {
                                    const target = child.target_anchor || "#";
                                    return (
                                      <a
                                        key={child._uid || `${child.label}-${target}`}
                                        {...(child._uid ? storyblokEditable(child as any) : {})}
                                        href={hrefFor(target)}
                                        target={child.open_in_new_tab ? "_blank" : undefined}
                                        rel={child.open_in_new_tab ? "noopener noreferrer" : undefined}
                                        onClick={(event) => {
                                          setMobileOpen(false);
                                          if (!child.open_in_new_tab) handleNavigation(event, target);
                                        }}
                                        className="block rounded-lg px-3 py-3 hover:bg-blue-50"
                                      >
                                        <span className="block text-sm font-semibold text-slate-900">
                                          {child.label}
                                        </span>
                                        {child.description?.trim() && (
                                          <span className="mt-1 block text-sm leading-5 text-slate-500">
                                            {child.description}
                                          </span>
                                        )}
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              {showAuthActions && loginLabel && loginUrl && (
                <a
                  href={loginUrl}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 lg:hidden"
                >
                  {loginLabel}
                </a>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
