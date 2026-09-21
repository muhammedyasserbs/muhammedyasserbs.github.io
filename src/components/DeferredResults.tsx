import { lazy, Suspense, useEffect, useRef, type RefObject } from "react";

const Results = lazy(() => import("./Results"));

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
      className="relative min-h-[560px] overflow-hidden border-t border-line-soft py-24 md:min-h-[680px] md:py-32"
    >
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="h-3 w-24 bg-line/80" aria-hidden />
        <div className="mt-6 h-10 max-w-xl bg-panel" aria-hidden />
        <div className="mt-4 h-5 max-w-2xl bg-panel/70" aria-hidden />
        <div className="mt-14 h-[280px] border border-line bg-panel/70" aria-hidden />
      </div>
    </section>
  );
}

/**
 * Results contains the largest interaction surface on the page. It is loaded
 * shortly before it becomes visible, or immediately when navigation requests
 * it, so the initial hero can become interactive first.
 */
export default function DeferredResults({ load, requestLoad }: DeferredResultsProps) {
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (load) return;

    const trigger = triggerRef.current;
    let observer: IntersectionObserver | null = null;
    if (trigger && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) requestLoad();
        },
        { rootMargin: "1400px 0px" },
      );
      observer.observe(trigger);
    }

    // Crawlers and very fast scrollers still receive the real section soon
    // after first paint, without making Results part of the critical bundle.
    const timer = window.setTimeout(requestLoad, 1200);
    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, [load, requestLoad]);

  if (!load) return <ResultsPlaceholder sectionRef={triggerRef} />;

  return (
    <Suspense fallback={<ResultsPlaceholder />}>
      <Results />
    </Suspense>
  );
}
