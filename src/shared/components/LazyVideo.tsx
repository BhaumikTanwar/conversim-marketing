import { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay"> {
  src: string;
}

// Defers loading until the video nears the viewport, then plays and loops indefinitely.
// Skips autoplay under reduced motion.
export default function LazyVideo({ src, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoaded(true);
        io.disconnect();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.play().catch(() => {});
  }, [loaded]);

  return (
    <video
      ref={ref}
      src={loaded ? src : undefined}
      preload={loaded ? "auto" : "none"}
      autoPlay={loaded}
      muted
      loop
      playsInline
      {...props}
    />
  );
}
