import { clsx, type ClassValue } from "clsx";
import { animate } from "framer-motion";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let scrollAnimation: ReturnType<typeof animate> | null = null;

export function scrollToSection(id: string, event?: React.MouseEvent<HTMLAnchorElement>) {
  event?.preventDefault();
  const cleanId = id.replace(/^#/, "");

  if (window.location.pathname !== "/") {
    window.location.href = cleanId ? `/#${cleanId}` : "/";
    return;
  }

  const target = cleanId ? document.getElementById(cleanId) : null;
  if (cleanId && !target) return;
  const targetY = target ? target.getBoundingClientRect().top + window.scrollY - 80 : 0;
  scrollAnimation?.stop();
  scrollAnimation = animate(window.scrollY, targetY, {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (value) => window.scrollTo(0, value),
    onComplete: () => { scrollAnimation = null; },
  });
  window.history.pushState(null, "", cleanId ? `/#${cleanId}` : "/");
}
