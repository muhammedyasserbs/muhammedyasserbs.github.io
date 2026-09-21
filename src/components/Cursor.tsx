import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });
  const hoveringRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      const nextHovering = Boolean(target?.closest("a, button, [data-hover]"));
      // Mousemove can fire well above 60 times per second. Only schedule a
      // React state update when the cursor actually enters/leaves an action.
      if (nextHovering !== hoveringRef.current) {
        hoveringRef.current = nextHovering;
        setHovering(nextHovering);
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring */}
      <m.div
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block"
        style={{ x: rx, y: ry }}
        aria-hidden
      >
        <m.div
          className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
          animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        />
      </m.div>
      {/* dot */}
      <m.div
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block"
        style={{ x, y }}
        aria-hidden
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </m.div>
    </>
  );
}
