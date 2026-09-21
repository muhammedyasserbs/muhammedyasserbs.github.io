import { useEffect, useRef, useState } from "react";
import { m, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../utils/cn";

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  // Transform reveals are disabled on touch and reduced-motion clients so
  // lower-page cards never compete with a mobile scroll for GPU time.
  const skipRevealMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches;

  if (skipRevealMotion) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

/* ---------- Section header with index label ---------- */
export function SectionHeader({
  index,
  latin,
  title,
  sub,
  align = "start",
}: {
  index: string;
  latin: string;
  title: React.ReactNode;
  sub?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={cn("relative", align === "center" && "text-center")}>
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-4 mb-6",
            align === "center" && "justify-center"
          )}
        >
          <span className="label-mono text-accent">{index}</span>
          <span className="h-px w-12 bg-line" />
          <span className="label-mono text-dim" dir="ltr">
            {latin}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display font-bold text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.15] tracking-tight text-paper">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className="mt-5 max-w-xl text-muted leading-relaxed text-[0.95rem] md:text-base"
            style={align === "center" ? { marginInline: "auto" } : undefined}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Animated counter ---------- */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.1,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v).toString()));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className={className} dir="ltr">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ---------- Corner registration ticks ---------- */
export function Ticks({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-10", className)} aria-hidden>
      {[
        "top-0 start-0 border-t border-s",
        "top-0 end-0 border-t border-e",
        "bottom-0 start-0 border-b border-s",
        "bottom-0 end-0 border-b border-e",
      ].map((pos) => (
        <span key={pos} className={cn("absolute h-3 w-3 border-paper/25", pos)} />
      ))}
    </div>
  );
}

/* ---------- Magnetic hover wrapper ---------- */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });
  const boundsRef = useRef<DOMRect | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const queueUpdate = (clientX: number, clientY: number) => {
    pointerRef.current = { x: clientX, y: clientY };
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const bounds = boundsRef.current;
      if (!bounds) return;
      x.set((pointerRef.current.x - bounds.left - bounds.width / 2) * strength);
      y.set((pointerRef.current.y - bounds.top - bounds.height / 2) * strength);
    });
  };

  return (
    <m.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseEnter={() => {
        boundsRef.current = ref.current?.getBoundingClientRect() ?? null;
      }}
      onMouseMove={(e) => {
        if (!boundsRef.current) boundsRef.current = ref.current?.getBoundingClientRect() ?? null;
        queueUpdate(e.clientX, e.clientY);
      }}
      onMouseLeave={() => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </m.div>
  );
}
