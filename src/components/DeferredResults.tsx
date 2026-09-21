import { lazy, Suspense, useEffect, useRef, type RefObject } from "react";

const loadResultsModule = () => import("./Results");
const Results = lazy(loadResultsModule);

type DeferredResultsProps = {
  load: boolean;
  requestLoad: () => void;
};

function ResultsPlaceholder({ sectionRef }: { sectionRef?: RefObject<HTMLElement | null> }) {
  return (
    <section
      ref={sectionRef}
      id="results"
      aria-busy="true"
      aria-label="جارٍ تجهيز قسم النتائج"
      className="relative min-h-[1120px] overflow-hidden border-t border-line-soft py-24 sm:min-h-[720px] md:min-h-[780px] md:py-32"
    >
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="h-3 w-24 bg-line/80" aria-hidden />
        <div className="mt-6 h-10 max-w-xl bg-panel" aria-hidden />
        <div className="mt-4 h-5 max-w-2xl bg-panel/70" aria-hidden />
        <div className="mt-14 h-[580px] border border-line bg-panel/70 sm:h-[300px]" aria-hidden />
      </div>
    </section>
  );
}

/**
 * Results stays code-split, but its code is prepared during browser idle time.
 * The actual mount waits for a pause in scrolling, so a large React subtree
 * never arrives halfway through a gesture and changes the page under the user.
 */
export default function DeferredResults({ load, requestLoad }: DeferredResultsProps) {
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (load) return;

    const trigger = triggerRef.current;
    const idleApi = window as unknown as {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let observer: IntersectionObserver | null = null;
    let idleId: number | null = null;
    let fallbackTimer: number | null = null;
    let settleTimer: number | null = null;
    let scrolling = false;
    let pendingLoad = false;

    const preload = () => {
      void loadResultsModule();
    };
    const loadWhenQuiet = () => {
      preload();
      if (scrolling) {
        pendingLoad = true;
        return;
      }
      requestLoad();
    };
    const onScroll = () => {
      scrolling = true;
      if (settleTimer !== null) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        scrolling = false;
        if (!pendingLoad) return;
        pendingLoad = false;
        loadWhenQuiet();
      }, 160);
    };

    if (trigger && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) loadWhenQuiet();
        },
        { rootMargin: "1400px 0px" },
      );
      observer.observe(trigger);
    }

    // A quick idle load keeps the first scroll fluid. The fallback preserves
    // the section for browsers without requestIdleCallback and for crawlers.
    if (idleApi.requestIdleCallback) {
      idleId = idleApi.requestIdleCallback(loadWhenQuiet, { timeout: 2500 });
    } else {
      fallbackTimer = window.setTimeout(loadWhenQuiet, 1200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (idleId !== null) idleApi.cancelIdleCallback?.(idleId);
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      if (settleTimer !== null) window.clearTimeout(settleTimer);
    };
  }, [load, requestLoad]);

  if (!load) return <ResultsPlaceholder sectionRef={triggerRef} />;

  return (
    <Suspense fallback={<ResultsPlaceholder />}>
      <Results />
    </Suspense>
  );
}
