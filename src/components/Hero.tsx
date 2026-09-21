import { useEffect, useRef } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Search, Star, TrendingUp, ArrowUpLeft, MousePointerClick } from "lucide-react";
import { WHATSAPP, STATS, LOGO } from "../data/content";
import { CountUp, Magnetic } from "./ui";
import { scrollToSection } from "../utils/scroll";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <m.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.62, delay, ease }}
      >
        {children}
      </m.span>
    </span>
  );
}

/* ---- The SERP mockup ---- */
function SerpCard() {
  return (
    <div className="relative">
      {/* search bar */}
      <div className="flex items-center gap-3 rounded-full border border-line bg-card px-5 py-3.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
        <Search className="h-4 w-4 text-dim shrink-0" />
        <span className="text-[0.9rem] text-paper/85">خبير سيو للمتاجر الإلكترونية</span>
        <span className="ms-auto h-4 w-[2px] bg-accent blink" />
      </div>

      {/* result card */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.62, ease }}
        className="relative mt-4 border border-line bg-panel p-5 md:p-6"
      >
        {/* rank badge */}
        <div className="absolute -top-3.5 -end-3.5 grid h-11 w-11 place-items-center bg-brand text-white rotate-6 shadow-[0_10px_30px_-8px_rgba(59,130,246,0.6)]">
          <span className="tnum font-bold text-sm" dir="ltr">#1</span>
        </div>

        <div className="flex items-center gap-2.5 text-[0.72rem]" dir="ltr">
          <span className="h-6 w-6 overflow-hidden rounded-full border border-line">
            <img src={LOGO} alt="" decoding="async" className="h-full w-full object-cover" />
          </span>
          <span className="text-paper/70">muhammedyasserbs.github.io</span>
          <span className="text-dim">›</span>
          <span className="text-dim">seo-specialist</span>
        </div>

        <h4 className="mt-2.5 text-[1.05rem] md:text-lg font-medium text-[#9ec2f7] leading-snug hover:underline cursor-pointer decoration-[#9ec2f7]/60">
          محمد ياسر | خبير SEO للمواقع والمتاجر الإلكترونية
        </h4>

        <div className="mt-1.5 flex items-center gap-2 text-[0.72rem] text-dim">
          <span className="flex items-center gap-0.5" dir="ltr">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" />
            ))}
          </span>
          <span dir="ltr">5.0</span>
          <span>·</span>
          <span>+30 مشروع ناجح</span>
        </div>

        <p className="mt-2.5 text-[0.82rem] leading-relaxed text-muted">
بساعد المواقع والمتاجر الإلكترونية تحقق ظهور أفضل في Google من خلال On-Page وTechnical SEO، من تحسين الصفحات والكلمات المفتاحية لإصلاح المشاكل التقنية والأرشفة.
        </p>

        {/* sitelinks */}
        <div className="mt-4 grid grid-cols-2 gap-px bg-line-soft border border-line-soft">
          {[
            ["احجز استشارة مجانية", "استشارة"],
            ["شوف النتايج بالأرقام", "النتايج"],
            ["الخدمات بالتفصيل", "الخدمات"],
            ["الأسئلة الشائعة", "الأسئلة"],
          ].map(([label]) => (
            <span key={label} className="bg-panel px-3 py-2 text-[0.7rem] text-[#9ec2f7]/90 hover:bg-card transition-colors cursor-pointer">
              {label}
            </span>
          ))}
        </div>
      </m.div>

      {/* floating analytics card */}
      <m.div
        initial={{ opacity: 0, y: 24, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: 0.58, duration: 0.62, ease }}
        className="absolute -bottom-8 -start-2 md:-start-10 w-[190px] border border-line bg-card/95 backdrop-blur px-4 py-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center justify-between">
          <span className="label-mono !text-[0.55rem] text-dim" dir="ltr">ORGANIC CLICKS</span>
          <TrendingUp className="h-3.5 w-3.5 text-accent" />
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="tnum text-xl font-bold text-paper" dir="ltr">9.06K</span>
          <span className="tnum text-[0.68rem] font-semibold text-accent" dir="ltr">+212%</span>
        </div>
        {/* micro sparkline */}
        <svg viewBox="0 0 120 32" className="mt-2 w-full h-8" fill="none" style={{ direction: "ltr" }}>
          <m.path
            d="M0 28 L12 24 L24 26 L36 19 L48 21 L60 14 L72 16 L84 9 L96 11 L108 4 L120 6"
            stroke="#3b82f6"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.85, duration: 1.05, ease: "easeInOut" }}
          />
          <m.circle cx="120" cy="6" r="2.5" fill="#3b82f6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} />
        </svg>
        <span className="mt-1 block text-[0.62rem] text-dim">آخر 3 شهور — Search Console</span>
      </m.div>
    </div>
  );
}

export default function Hero() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [5, -5]);
  const rotateY = useTransform(sx, [0, 1], [-5, 5]);
  const boundsRef = useRef<DOMRect | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const queueTiltUpdate = (clientX: number, clientY: number) => {
    pointerRef.current = { x: clientX, y: clientY };
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const bounds = boundsRef.current;
      if (!bounds) return;
      mx.set((pointerRef.current.x - bounds.left) / bounds.width);
      my.set((pointerRef.current.y - bounds.top) / bounds.height);
    });
  };

  return (
    <section
      id="top"
      className="grid-bg relative overflow-hidden pt-[68px]"
      onMouseEnter={(e) => {
        boundsRef.current = e.currentTarget.getBoundingClientRect();
      }}
      onMouseMove={(e) => {
        // Cache layout geometry and batch high-frequency pointer events into
        // one visual update per frame, keeping the tilt responsive on 120Hz mice.
        if (!boundsRef.current) boundsRef.current = e.currentTarget.getBoundingClientRect();
        queueTiltUpdate(e.clientX, e.clientY);
      }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -start-40 h-[560px] w-[560px] rounded-full bg-accent/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 end-0 h-[420px] w-[420px] rounded-full bg-accent/[0.035] blur-[100px]" />

      {/* watermark */}
      <span
        aria-hidden
        className="text-stroke pointer-events-none absolute -bottom-8 start-1/2 translate-x-1/4 tnum select-none font-bold leading-none text-[26vw] tracking-tighter opacity-60"
        dir="ltr"
      >
        SEO
      </span>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 pt-14 md:pt-24 pb-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10" style={{ perspective: 1200 }}>
          {/* copy */}
          <div>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="label-mono text-muted" dir="ltr">AVAILABLE FOR NEW PROJECTS</span>
            </m.div>

            <h1 className="font-display font-extrabold tracking-tight leading-[1.08] text-[clamp(2.6rem,7vw,5.4rem)] text-paper">
              <Line delay={0.04}>موقعك يستاهل</Line>
              <Line delay={0.1}>
                <span className="relative inline-block text-accent">
                  الصفحة الأولى
                  <m.svg
                    viewBox="0 0 340 14"
                    className="absolute -bottom-2 start-0 w-full"
                    fill="none"
                    aria-hidden
                  >
                    <m.path
                      d="M4 10 C 80 3, 160 12, 336 5"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.52, duration: 0.58, ease: "easeOut" }}
                    />
                  </m.svg>
                </span>
                <span className="text-paper/40">.</span>
              </Line>
              <Line delay={0.16}>مش الصفحة التانية.</Line>
            </h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.58, ease }}
              className="mt-7 max-w-xl text-muted leading-loose text-[0.95rem] md:text-[1.05rem]"
            >
              أنا <span className="text-paper font-semibold">محمد ياسر</span> — أخصائي SEO
              متخصص في <span className="text-paper" dir="ltr">On-Page</span> و{" "}
              <span className="text-paper" dir="ltr">Technical SEO</span>.
              بحسّن ظهور المتاجر الإلكترونية والمواقع الخدمية ومواقع SaaS في نتايج بحث Google،
              عشان العملاء يوصلولك من غير ما تدفع في كل نقرة.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.58, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 bg-brand px-7 h-[52px] font-semibold text-white transition-shadow duration-300 hover:shadow-[0_16px_44px_-10px_rgba(59,130,246,0.55)]"
                >
                  احجز استشارة مجانية
                  <ArrowUpLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={() => scrollToSection("results")}
                className="inline-flex h-[52px] cursor-pointer items-center gap-2.5 border border-line px-7 font-medium text-paper/85 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                <MousePointerClick className="h-4 w-4" />
                شوف النتايج بالأرقام
              </button>
            </m.div>

            {/* platforms strip */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.62 }}
              className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem] text-dim"
            >
              <span className="label-mono !text-[0.6rem]">بشتغل على</span>
              {["سلة", "زد", "Shopify", "WordPress", "SaaS"].map((p, i) => (
                <span key={p} className="flex items-center gap-5">
                  <span className="text-muted font-medium">{p}</span>
                  {i < 4 && <span className="h-1 w-1 rounded-full bg-line" />}
                </span>
              ))}
            </m.div>
          </div>

          {/* visual */}
          <m.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.68, ease }}
            className="relative pb-14 hidden sm:block"
          >
            <SerpCard />
          </m.div>
        </div>

        {/* stats strip */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.64, ease }}
          className="relative mt-20 md:mt-24 border border-line bg-panel/60 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={
                  "group relative px-6 py-7 md:px-8 md:py-8 transition-colors duration-500 hover:bg-card " +
                  (i % 2 === 1 ? "border-s border-line " : "") +
                  (i >= 2 ? "border-t border-line lg:border-t-0 " : "") +
                  (i > 0 ? "lg:border-s" : "")
                }
              >
                <div className="tnum font-bold text-3xl md:text-4xl text-paper group-hover:text-accent transition-colors duration-500">
                  <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-2 text-[0.85rem] font-medium text-paper/80">{s.label}</div>
                <div className="mt-1 text-[0.72rem] text-dim">{s.note}</div>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
