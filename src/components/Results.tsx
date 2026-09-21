import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useMotionValue, animate, AnimatePresence, useInView } from "framer-motion";
import {
  Search,
  BarChart3,
  Sparkles,
  Globe2,
  ArrowLeft,
  ArrowRight,
  Expand,
  X,
  ImageOff,
  RotateCcw,
  ZoomIn,
} from "lucide-react";
import { RESULT_SLIDES, type ResultSlide, type ResultShot } from "../data/content";
import { SectionHeader, Reveal } from "./ui";
import { cn } from "../utils/cn";

const enc = (u: string) => encodeURI(u);
const GAP = 20;
const MIN_SCALE = 1;
const DOUBLE_TAP_SCALE = 2.5;
const MAX_SCALE = 4;
const DOUBLE_TAP_DELAY = 280;
const WHEEL_ZOOM_SENSITIVITY = 0.0015;

type ZoomTarget = { src: string; alt: string };
type Point = { x: number; y: number };
type View = { scale: number; x: number; y: number };

/** renders **bold** segments in accent */
function Rich({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className}>
      {text.split("**").map((seg, i) =>
        i % 2 ? (
          <strong key={i} className="text-accent font-semibold">
            {seg}
          </strong>
        ) : (
          <span key={i}>{seg}</span>
        )
      )}
    </p>
  );
}

const SOURCE_META = {
  gsc: { label: "Search Console", icon: Search },
  ga: { label: "Analytics", icon: BarChart3 },
  ai: { label: "AI Overview", icon: Sparkles },
} as const;

function ShotFigure({
  shot,
  onZoom,
  loadImage,
}: {
  shot: ResultShot;
  onZoom: (s: ZoomTarget) => void;
  loadImage: boolean;
}) {
  const Meta = SOURCE_META[shot.source];
  const Icon = Meta.icon;
  const [failed, setFailed] = useState(false);

  return (
    <figure className="group/shot flex h-full min-w-0 flex-col bg-ink p-3 sm:p-4">
      {/* source label */}
      <div className="mb-2.5 flex items-center gap-1.5 text-[0.58rem] text-dim sm:text-[0.62rem]" dir="ltr">
        <Icon className="h-3 w-3 shrink-0 text-accent" />
        <span className="truncate">{Meta.label}</span>
        <span className="ms-auto h-1 w-1 shrink-0 rounded-full bg-accent" />
      </div>

      {/* two stat boxes side by side */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="border border-accent/25 bg-accent/[0.07] px-2 py-2.5 text-center">
          <div className="truncate text-[0.85rem] font-bold leading-tight text-accent">
            {shot.m1[0]}
          </div>
          <div className="mt-0.5 truncate text-[0.62rem] leading-tight text-muted">
            {shot.m1[1]}
          </div>
        </div>
        <div className="border border-line bg-panel px-2 py-2.5 text-center">
          <div className="truncate text-[0.85rem] font-bold leading-tight text-paper">
            {shot.m2[0]}
          </div>
          <div className="mt-0.5 truncate text-[0.62rem] leading-tight text-dim">
            {shot.m2[1]}
          </div>
        </div>
      </div>

      {/* Only keep screenshots close to the active slide in memory. The card
          layout remains present, so carousel measurement and navigation stay intact. */}
      {!loadImage ? (
        <div
          className="grid h-[190px] place-items-center border border-line-soft bg-[#0b1424] p-5 text-center sm:h-[170px] lg:h-[200px]"
          role="img"
          aria-label="سيتم تحميل اللقطة عند الوصول للشريحة"
        >
          <div className="h-8 w-16 bg-line/60" aria-hidden="true" />
        </div>
      ) : failed ? (
        <div className="grid h-[190px] place-items-center border border-line-soft bg-[#0b1424] p-5 text-center sm:h-[170px] lg:h-[200px]">
          <div>
            <ImageOff className="mx-auto h-5 w-5 text-dim" aria-hidden="true" />
            <p className="mt-2 text-[0.68rem] leading-relaxed text-dim">تعذّر تحميل اللقطة</p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onZoom({ src: shot.src, alt: shot.alt });
          }}
          className="relative block overflow-hidden border border-line-soft bg-[#0b1424] cursor-zoom-in"
          aria-label={`تكبير: ${shot.alt}`}
          style={{ touchAction: "manipulation" }}
        >
          <img
            src={enc(shot.src)}
            alt={shot.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-[190px] w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.03] sm:h-[170px] lg:h-[200px]"
            onError={() => setFailed(true)}
          />
          <span className="absolute end-2 top-2 grid h-7 w-7 place-items-center bg-ink/80 text-muted opacity-0 backdrop-blur transition-opacity duration-300 group-hover/shot:opacity-100">
            <Expand className="h-3.5 w-3.5" />
          </span>
        </button>
      )}

      <Rich
        text={shot.sum}
        className="mt-auto pt-3 text-[0.72rem] leading-relaxed text-muted"
      />
    </figure>
  );
}

/**
 * Native pointer-events zoom surface for the lightbox.
 * - desktop: double click toggles zoom
 * - touch: double tap toggles zoom and two fingers pinch
 * - while zoomed: a single finger pans the image rather than the page/slider
 */
function ZoomableImage({ zoom }: { zoom: ZoomTarget }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pointersRef = useRef(new Map<number, Point>());
  // Desktop mouse dragging has its own document-level path. Unlike pointer
  // capture alone, it keeps panning reliable if the cursor leaves the stage.
  const mousePanRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  });
  const viewRef = useRef<View>({ scale: MIN_SCALE, x: 0, y: 0 });
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);
  const gestureRef = useRef({
    mode: "idle" as "idle" | "pan" | "pinch",
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    startDistance: 0,
    startScale: MIN_SCALE,
    moved: false,
  });
  const [view, setView] = useState<View>(viewRef.current);
  const [isInteracting, setIsInteracting] = useState(false);

  const constrain = useCallback((scale: number, x: number, y: number) => {
    const stage = stageRef.current;
    const image = imageRef.current;
    if (!stage || !image || scale <= MIN_SCALE) return { x: 0, y: 0 };

    const boundX = Math.max(0, (image.clientWidth * scale - stage.clientWidth) / 2);
    const boundY = Math.max(0, (image.clientHeight * scale - stage.clientHeight) / 2);
    return {
      x: Math.max(-boundX, Math.min(boundX, x)),
      y: Math.max(-boundY, Math.min(boundY, y)),
    };
  }, []);

  const applyView = useCallback(
    (requestedScale: number, requestedX = 0, requestedY = 0) => {
      const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, requestedScale));
      const position = constrain(scale, requestedX, requestedY);
      const next = { scale, ...position };
      viewRef.current = next;
      setView(next);
    },
    [constrain],
  );

  const reset = useCallback(() => applyView(MIN_SCALE), [applyView]);
  const toggleZoom = useCallback(() => {
    if (viewRef.current.scale > MIN_SCALE + 0.01) reset();
    else applyView(DOUBLE_TAP_SCALE);
  }, [applyView, reset]);

  useEffect(() => {
    pointersRef.current.clear();
    mousePanRef.current.active = false;
    lastTapRef.current = null;
    gestureRef.current.mode = "idle";
    reset();
  }, [zoom.src, reset]);

  useEffect(() => {
    const stopMousePan = () => {
      if (!mousePanRef.current.active) return;
      mousePanRef.current.active = false;
      setIsInteracting(false);
    };
    const moveMousePan = (event: MouseEvent) => {
      const pan = mousePanRef.current;
      if (!pan.active) return;
      event.preventDefault();
      applyView(
        viewRef.current.scale,
        pan.startOffsetX + event.clientX - pan.startX,
        pan.startOffsetY + event.clientY - pan.startY,
      );
    };

    window.addEventListener("mousemove", moveMousePan);
    window.addEventListener("mouseup", stopMousePan);
    window.addEventListener("blur", stopMousePan);
    return () => {
      window.removeEventListener("mousemove", moveMousePan);
      window.removeEventListener("mouseup", stopMousePan);
      window.removeEventListener("blur", stopMousePan);
    };
  }, [applyView]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const zoomWithWheel = (event: WheelEvent) => {
      // A non-passive native listener is deliberate: React may register wheel
      // handlers as passive, which would let the page/Lenis consume the wheel.
      event.preventDefault();
      event.stopPropagation();

      const rect = stage.getBoundingClientRect();
      const modeMultiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rect.height : 1;
      const delta = Math.max(-180, Math.min(180, event.deltaY * modeMultiplier));
      const current = viewRef.current;
      const nextScale = Math.max(
        MIN_SCALE,
        Math.min(MAX_SCALE, current.scale * Math.exp(-delta * WHEEL_ZOOM_SENSITIVITY)),
      );
      const ratio = nextScale / current.scale;
      const pointerX = event.clientX - rect.left - rect.width / 2;
      const pointerY = event.clientY - rect.top - rect.height / 2;

      // Keep the point below the cursor stable while scaling, then apply the
      // same bounds used by pinch and drag.
      applyView(
        nextScale,
        (1 - ratio) * pointerX + ratio * current.x,
        (1 - ratio) * pointerY + ratio * current.y,
      );
    };

    stage.addEventListener("wheel", zoomWithWheel, { passive: false });
    return () => stage.removeEventListener("wheel", zoomWithWheel);
  }, [applyView]);

  const startPan = (point: Point) => {
    gestureRef.current = {
      ...gestureRef.current,
      mode: viewRef.current.scale > MIN_SCALE + 0.01 ? "pan" : "idle",
      startX: point.x,
      startY: point.y,
      startOffsetX: viewRef.current.x,
      startOffsetY: viewRef.current.y,
      moved: false,
    };
  };

  const startPinch = () => {
    const [first, second] = [...pointersRef.current.values()];
    if (!first || !second) return;
    gestureRef.current = {
      ...gestureRef.current,
      mode: "pinch",
      startDistance: Math.hypot(second.x - first.x, second.y - first.y),
      startScale: viewRef.current.scale,
      moved: false,
    };
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Mouse uses the dedicated document-level drag path below; pointer events
    // stay reserved for touch/pen so the two input models never compete.
    if (event.pointerType === "mouse") return;
    event.stopPropagation();
    const point = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, point);
    event.currentTarget.setPointerCapture?.(event.pointerId);

    if (pointersRef.current.size >= 2) startPinch();
    else startPan(point);
    setIsInteracting(true);
  };

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || viewRef.current.scale <= MIN_SCALE + 0.01) return;
    event.preventDefault();
    event.stopPropagation();
    mousePanRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: viewRef.current.x,
      startOffsetY: viewRef.current.y,
    };
    setIsInteracting(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    event.stopPropagation();
    const point = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, point);
    const gesture = gestureRef.current;

    if (pointersRef.current.size >= 2 && gesture.mode === "pinch") {
      const [first, second] = [...pointersRef.current.values()];
      if (!first || !second || !gesture.startDistance) return;
      const distance = Math.hypot(second.x - first.x, second.y - first.y);
      gesture.moved ||= Math.abs(distance - gesture.startDistance) > 4;
      applyView(gesture.startScale * (distance / gesture.startDistance), viewRef.current.x, viewRef.current.y);
      return;
    }

    if (pointersRef.current.size === 1 && gesture.mode === "pan") {
      const dx = point.x - gesture.startX;
      const dy = point.y - gesture.startY;
      gesture.moved ||= Math.hypot(dx, dy) > 5;
      applyView(viewRef.current.scale, gesture.startOffsetX + dx, gesture.startOffsetY + dy);
    }
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    const wasOnlyPointer = pointersRef.current.size === 1;
    const wasTap = wasOnlyPointer && !gestureRef.current.moved && !cancelled && event.pointerType === "touch";
    const tapPoint = { x: event.clientX, y: event.clientY };
    pointersRef.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (wasTap) {
      const now = performance.now();
      const previous = lastTapRef.current;
      const nearPrevious = previous && Math.hypot(tapPoint.x - previous.x, tapPoint.y - previous.y) < 28;
      if (previous && nearPrevious && now - previous.time < DOUBLE_TAP_DELAY) {
        lastTapRef.current = null;
        toggleZoom();
      } else {
        lastTapRef.current = { time: now, ...tapPoint };
      }
    }

    if (pointersRef.current.size >= 2) startPinch();
    else if (pointersRef.current.size === 1) startPan([...pointersRef.current.values()][0]);
    else {
      gestureRef.current.mode = "idle";
      setIsInteracting(false);
    }
  };

  const isZoomed = view.scale > MIN_SCALE + 0.01;

  return (
    <motion.figure
      className="w-full max-w-6xl touch-none"
      initial={{ scale: 0.94, y: 16 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.96, y: 10 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        ref={stageRef}
        className={`relative flex w-full items-center justify-center overflow-hidden border border-line bg-[#0b1424] ${
          isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        }`}
        style={{ height: "min(78vh, 720px)", touchAction: "none", overscrollBehavior: "contain" }}
        aria-label="صورة قابلة للتكبير. دبل كليك أو عجلة الماوس أو كبّر بإصبعين"
        role="group"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onMouseDown={handleMouseDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishPointer(event)}
        onPointerCancel={(event) => finishPointer(event, true)}
        onDoubleClick={(event) => {
          event.preventDefault();
          toggleZoom();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleZoom();
          }
        }}
      >
        <img
          ref={imageRef}
          src={enc(zoom.src)}
          alt={zoom.alt}
          decoding="async"
          draggable={false}
          onLoad={() => applyView(viewRef.current.scale, viewRef.current.x, viewRef.current.y)}
          className="pointer-events-none max-h-full max-w-full select-none object-contain will-change-transform"
          style={{
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
            transformOrigin: "center center",
            transition: isInteracting ? "none" : "transform 180ms ease-out",
          }}
        />

        <div className="pointer-events-none absolute bottom-3 start-3 inline-flex items-center gap-2 bg-ink/80 px-3 py-2 text-[0.65rem] text-paper/85 backdrop-blur">
          <ZoomIn className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span>{isZoomed ? `${view.scale.toFixed(1)}× — اسحب الصورة أو استخدم عجلة الماوس` : "دبل كليك أو عجلة الماوس أو بإصبعين للتكبير"}</span>
        </div>

        {isZoomed && (
          <button
            type="button"
            className="absolute top-3 start-3 inline-flex h-9 items-center gap-2 border border-line bg-ink/90 px-3 text-[0.68rem] text-paper backdrop-blur transition-colors hover:border-accent hover:text-accent"
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              reset();
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            رجوع للحجم الطبيعي
          </button>
        )}
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-4 text-[0.75rem] text-muted">
        <span>{zoom.alt}</span>
        <span className="label-mono !text-[0.55rem] shrink-0 text-dim">اضغط خارج الصورة للإغلاق</span>
      </figcaption>
    </motion.figure>
  );
}

function Slide({
  slide,
  index,
  onZoom,
  registerRef,
  loadImages,
  active,
}: {
  slide: ResultSlide;
  index: number;
  onZoom: (s: ZoomTarget) => void;
  registerRef: (el: HTMLDivElement | null) => void;
  loadImages: boolean;
  active: boolean;
}) {
  const cols =
    slide.shots.length === 1
      ? "grid-cols-1"
      : slide.shots.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3";

  return (
    <div
      ref={registerRef}
      className="flex h-full w-[88vw] shrink-0 select-none flex-col sm:w-[640px] lg:w-[880px]"
    >
      {/* slide header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="tnum grid h-9 w-9 place-items-center border border-line bg-panel text-[0.75rem] font-semibold text-accent" dir="ltr">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display font-bold text-lg text-paper md:text-xl">
            {slide.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[0.68rem] text-dim">
          <span className="flex items-center gap-1.5 border border-line px-2.5 py-1">
            <Globe2 className="h-3 w-3" />
            {slide.market}
          </span>
          <span className="border border-line px-2.5 py-1">{slide.period}</span>
        </div>
      </div>

      {/* browser window */}
      <div className="flex flex-1 flex-col overflow-hidden border border-line bg-panel transition-colors duration-500 hover:border-accent/35">
        {/* chrome bar */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5" dir="ltr">
          <span className="flex gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-[#3a4a66]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#3a4a66]" />
            <i className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          </span>
          <span className="label-mono !text-[0.55rem] text-dim">
            search.google.com / search-console
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[0.62rem] font-medium text-accent">
            <span className={cn("h-1.5 w-1.5 rounded-full bg-accent", active && "blink")} />
            LIVE PROOF
          </span>
        </div>
        <div className={cn("grid flex-1 gap-px bg-line-soft", cols)}>
          {slide.shots.map((shot) => (
            <ShotFigure key={shot.src} shot={shot} onZoom={onZoom} loadImage={loadImages} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  const n = RESULT_SLIDES.length;
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isResultsInView = useInView(sectionRef, { amount: 0.05 });
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxX, setMaxX] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState<ZoomTarget | null>(null);

  const measure = useCallback(() => {
    const slide = slideRefs.current[0];
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!slide || !vp) return;
    const s = slide.offsetWidth + GAP;
    setStep(s);
    if (track) {
      // scrollWidth يشمل الـ padding-inline فبنطلع آخر سلايد كامل
      setMaxX(Math.max(0, track.scrollWidth - vp.clientWidth));
    }
  }, [n]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const target = Math.min(index * step, maxX);
    const ctrl = animate(x, target, { type: "spring", stiffness: 180, damping: 26 });
    return ctrl.stop;
  }, [index, step, maxX, x]);

  // Lock page scrolling and Lenis while an image is being manipulated.
  useEffect(() => {
    if (!zoom) return;
    const html = document.documentElement;
    html.classList.add("lightbox-open");
    window.dispatchEvent(new CustomEvent("portfolio:lightbox", { detail: { open: true } }));

    return () => {
      html.classList.remove("lightbox-open");
      window.dispatchEvent(new CustomEvent("portfolio:lightbox", { detail: { open: false } }));
    };
  }, [zoom]);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => Math.max(0, Math.min(n - 1, i + dir))),
    [n],
  );

  /* Only animate the carousel while it can actually be seen. */
  useEffect(() => {
    if (paused || zoom || !isResultsInView) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, zoom, isResultsInView, n]);

  /* esc close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative overflow-hidden border-t border-line-soft py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* watermark */}
      <span
        aria-hidden
        dir="ltr"
        className="text-stroke pointer-events-none absolute top-10 end-0 tnum select-none font-bold leading-none text-[16vw] opacity-[0.45]"
      >
        PROOF
      </span>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            index="02"
            latin="PROOF OF WORK"
            title={
              <>
                الكلام سهل.. <span className="text-accent">الأرقام</span> هي اللي
                <br className="hidden md:block" /> بتتكلم عني.
              </>
            }
            sub="لقطات حقيقية من لوحات Search Console و Analytics للمشاريع اللي اشتغلت عليها — اسحب أو استخدم الأسهم للتصفح، واضغط على أي لقطة للتكبير."
          />

          {/* controls */}
          <Reveal delay={0.15}>
            <div className="flex items-center gap-3">
              <span className="tnum me-2 text-sm text-dim" dir="ltr">
                <span className="text-accent font-semibold">{String(index + 1).padStart(2, "0")}</span>
                {" / "}
                {String(n).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={index === n - 1}
                className="grid h-12 w-12 place-items-center border border-line text-paper transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-paper"
                aria-label="التالي"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={index === 0}
                className="grid h-12 w-12 place-items-center border border-line text-paper transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-paper"
                aria-label="السابق"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* slider */}
      <Reveal delay={0.1}>
        <div ref={viewportRef} dir="rtl" className="relative mt-12 overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex w-max cursor-grab active:cursor-grabbing"
            style={{
              x,
              gap: GAP,
              paddingInline: "max(1.25rem, calc((100vw - 1400px) / 2 + 2.5rem))",
              touchAction: zoom ? "auto" : "pan-y",
            }}
            drag={zoom ? false : "x"}
            dragConstraints={{ left: 0, right: maxX }}
            dragElastic={0.08}
            onDragStart={() => setPaused(true)}
            onDragEnd={() => {
              if (!step) return;
              const current = x.get();
              const nearest = Math.max(0, Math.min(n - 1, Math.round(current / step)));
              setIndex(nearest);
              setPaused(false);
            }}
          >
            {RESULT_SLIDES.map((slide, i) => (
              <Slide
                key={slide.title}
                slide={slide}
                index={i}
                onZoom={setZoom}
                // Keep the current slide and one neighbour ready, instead of
                // decoding every screenshot in the carousel at once.
                loadImages={Math.abs(i - index) <= 1}
                active={i === index}
                registerRef={(el) => (slideRefs.current[i] = el)}
              />
            ))}
          </motion.div>
        </div>
      </Reveal>

      {/* progress */}
      <div className="relative mx-auto mt-10 max-w-[1400px] px-5 md:px-10">
        <div className="flex items-center gap-5">
          <span className="label-mono !text-[0.55rem] text-dim shrink-0" dir="ltr">DRAG / SCROLL</span>
          <div className="h-px flex-1 bg-line">
            <motion.div
              className="h-full bg-brand"
              animate={{ width: `${((index + 1) / n) * 100}%` }}
              transition={{ type: "spring", stiffness: 160, damping: 24 }}
            />
          </div>
          <span className="tnum shrink-0 text-[0.65rem] text-dim" dir="ltr">
            {index + 1}/{n}
          </span>
        </div>
        <p className="mt-6 text-[0.72rem] text-dim">
          * الأرقام من تقارير Search Console و Google Analytics الفعلية — تم إخفاء أسماء العلامات التجارية حفاظًا على خصوصية العملاء.
        </p>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
          >
            <button
              type="button"
              className="absolute top-5 end-5 z-10 grid h-11 w-11 place-items-center border border-line bg-panel text-paper transition-colors hover:border-accent hover:text-accent"
              aria-label="إغلاق"
              onClick={(event) => {
                event.stopPropagation();
                setZoom(null);
              }}
            >
              <X className="h-5 w-5" />
            </button>
            <ZoomableImage zoom={zoom} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
