import { useEffect, useRef, useState } from "react";
import { Asterisk } from "lucide-react";

export default function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  const marqueeRef = useRef<HTMLDivElement>(null);
  // Start enabled as a safe fallback for browsers without IntersectionObserver.
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || !marqueeRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );
    observer.observe(marqueeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={marqueeRef}
      className={
        "relative overflow-hidden border-y py-5 " +
        (dark ? "border-line bg-panel" : "border-accent2/40 bg-brand")
      }
      dir="ltr"
    >
      <div
        className="marquee-track flex w-max items-center gap-8 whitespace-nowrap"
        style={{
          ["--marquee-duration" as string]: "34s",
          animationPlayState: isVisible ? "running" : "paused",
          direction: "rtl",
        }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={
                "font-display font-bold text-xl md:text-2xl " +
                (dark ? "text-muted" : "text-white")
              }
            >
              {item}
            </span>
            <Asterisk className={"h-5 w-5 " + (dark ? "text-accent" : "text-white/60")} />
          </span>
        ))}
      </div>
    </div>
  );
}
