import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import type Lenis from "lenis";
import { motion } from "framer-motion";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Results from "./components/Results";
import Footer from "./components/Footer";
import { MARQUEE_ITEMS, WHATSAPP } from "./data/content";

const BelowFoldSections = lazy(() => import("./components/BelowFoldSections"));

function isHashLink(value: string | null): value is `#${string}` {
  return Boolean(value && value.startsWith("#") && value !== "#");
}

export default function App() {
  // The lower half of the portfolio is useful, but it should not compete with
  // the hero, nav and Results viewer during first paint / first interaction.
  const [loadBelowFold, setLoadBelowFold] = useState(() =>
    typeof window !== "undefined" && isHashLink(window.location.hash),
  );
  const requestBelowFold = useCallback(() => setLoadBelowFold(true), []);

  useEffect(() => {
    if (loadBelowFold) return;

    const load = () => requestBelowFold();
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(load, { timeout: 2000 })
      : null;
    const timeoutId = idleId === null ? window.setTimeout(load, 1400) : null;
    // If the visitor starts interacting before idle time, have the remaining
    // sections ready before they can reach them.
    const intentEvents: (keyof WindowEventMap)[] = ["wheel", "touchstart", "keydown"];
    intentEvents.forEach((event) => window.addEventListener(event, load, { once: true, passive: true }));

    return () => {
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      intentEvents.forEach((event) => window.removeEventListener(event, load));
    };
  }, [loadBelowFold, requestBelowFold]);

  useEffect(() => {
    const useNativeScroll =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let disposed = false;
    let raf: number | null = null;
    let lightboxOpen = document.documentElement.classList.contains("lightbox-open");
    let pageVisible = !document.hidden;
    const waitCleanups = new Set<() => void>();
    const canAnimate = () => pageVisible && !lightboxOpen && Boolean(lenis);

    const stopRaf = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };
    const loop = (time: number) => {
      raf = null;
      if (!canAnimate() || !lenis) return;
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    const startRaf = () => {
      if (raf === null && canAnimate()) raf = requestAnimationFrame(loop);
    };

    const scrollToElement = (element: HTMLElement) => {
      if (lenis) {
        lenis.scrollTo(element, { offset: -70 });
      } else {
        // Native scrolling is noticeably smoother and lighter on touch devices.
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const scrollToHashWhenReady = (hash: string) => {
      const attempt = () => {
        const element = document.querySelector<HTMLElement>(hash);
        if (!element) return false;
        scrollToElement(element);
        return true;
      };
      if (attempt()) return;

      let observer: MutationObserver | null = null;
      let timeout: number | null = null;
      const cleanup = () => {
        observer?.disconnect();
        if (timeout !== null) window.clearTimeout(timeout);
        waitCleanups.delete(cleanup);
      };
      observer = new MutationObserver(() => {
        if (attempt()) cleanup();
      });
      timeout = window.setTimeout(cleanup, 5000);
      waitCleanups.add(cleanup);
      observer.observe(document.getElementById("root") ?? document.body, {
        childList: true,
        subtree: true,
      });
    };

    // Keep the Lenis code out of the first mobile download entirely. Desktop
    // loads it on demand; touch screens use the browser's highly optimized
    // native scroll path and retain CSS smooth anchor scrolling.
    if (!useNativeScroll) {
      void import("lenis").then(({ default: LenisConstructor }) => {
        if (disposed) return;
        lenis = new LenisConstructor({
          duration: 0.86,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        if (lightboxOpen) lenis.stop();
        startRaf();
      });
    }

    const onLightbox = (event: Event) => {
      lightboxOpen = Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open);
      if (!lenis) return;
      if (lightboxOpen) {
        lenis.stop();
        stopRaf();
      } else {
        lenis.start();
        startRaf();
      }
    };
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) startRaf();
      else stopRaf();
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!isHashLink(hash)) return;

      const element = document.querySelector<HTMLElement>(hash);
      event.preventDefault();
      if (element) {
        scrollToElement(element);
      } else {
        requestBelowFold();
        scrollToHashWhenReady(hash);
      }
    };

    window.addEventListener("portfolio:lightbox", onLightbox);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("click", onClick);

    if (isHashLink(window.location.hash)) {
      requestBelowFold();
      scrollToHashWhenReady(window.location.hash);
    }

    return () => {
      disposed = true;
      stopRaf();
      waitCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("portfolio:lightbox", onLightbox);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, [requestBelowFold]);

  return (
    <div className="noise min-h-screen bg-ink text-paper selection:bg-accent selection:text-white">
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} />
        <Services />
        <Results />
        {loadBelowFold && (
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            <BelowFoldSections />
          </Suspense>
        )}
      </main>

      <Footer />

      {/* floating whatsapp — official style */}
      <motion.a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل عبر واتساب"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
        className="group fixed bottom-6 end-6 z-[75] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25d366]/50 opacity-0 group-hover:opacity-100 [animation-duration:1.6s]" aria-hidden />
        <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
