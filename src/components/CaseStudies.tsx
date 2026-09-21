import { TrendingUp, ArrowUpLeft, FileSearch, Clock } from "lucide-react";
import { CASES, CASE_STUDIES } from "../data/content";
import { SectionHeader, Reveal } from "./ui";

export default function CaseStudies() {
  return (
    <section id="cases" className="relative border-t border-line-soft py-24 md:py-32 overflow-hidden">
      <span
        aria-hidden
        dir="ltr"
        className="text-stroke pointer-events-none absolute top-8 start-0 tnum select-none font-bold leading-none text-[15vw] opacity-[0.4]"
      >
        CASES
      </span>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="03"
            latin="CASE STUDIES"
            title={
              <>
                كيس استادي — <span className="text-accent">القصة</span>
                <br className="hidden md:block" /> ورا الأرقام.
              </>
            }
            sub="مش مجرد لقطات شاشة: تحليل كامل للمشكلة، الاستراتيجية، التنفيذ، والنتيجة النهائية — بالأرقام قبل وبعد."
          />
          <Reveal delay={0.15}>
            <a
              href={CASE_STUDIES}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 border border-line bg-ink px-5 py-3.5 text-[0.82rem] font-medium text-paper transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              <FileSearch className="h-4 w-4 text-accent" />
              كل الكيس استادي
            </a>
          </Reveal>
        </div>

        {/* mobile: snap slider — desktop: grid */}
        <div className="mt-14 flex gap-5 overflow-x-auto pb-5 -mx-5 px-5 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
          {CASES.map((c, i) => (
            <Reveal
              key={c.url}
              delay={0.08 * i}
              className="w-[86vw] max-w-[420px] shrink-0 snap-center sm:w-[68vw] lg:w-auto lg:max-w-none lg:shrink-0 lg:snap-align-none"
            >
              <article
                data-hover
                className="group flex h-full flex-col overflow-hidden border border-line bg-ink transition-all duration-500 hover:border-accent/40 hover:-translate-y-1.5"
              >
                {/* cover */}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block aspect-[16/8.5] overflow-hidden bg-panel"
                >
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden />
                  <span
                    className="absolute top-4 start-4 border px-3 py-1 text-[0.68rem] font-medium backdrop-blur-sm"
                    style={{
                      color: c.color,
                      borderColor: c.color + "55",
                      background: c.color + "1f",
                    }}
                  >
                    {c.tag}
                  </span>
                  <span className="absolute bottom-4 end-4 flex items-center gap-1.5 bg-ink/70 px-2.5 py-1 text-[0.65rem] text-paper/80 backdrop-blur">
                    <Clock className="h-3 w-3 text-accent" />
                    {c.period}
                  </span>
                </a>

                {/* body */}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <span className="tnum text-[0.65rem] text-dim" dir="ltr">
                    CASE /{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 font-display text-xl font-bold leading-snug text-paper md:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-[0.88rem] leading-loose text-muted">{c.desc}</p>

                  {/* result banner */}
                  <div className="mt-5 flex items-start gap-3 border-s-2 border-accent bg-accent/[0.06] p-4">
                    <TrendingUp className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent" />
                    <p className="text-[0.86rem] font-semibold leading-relaxed text-paper">
                      {c.result}
                    </p>
                  </div>

                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 pt-2 text-[0.85rem] font-semibold text-accent transition-all hover:gap-3.5 hover:text-accent2"
                  >
                    اقرأ الكيس استادي كاملة بالتفاصيل
                    <ArrowUpLeft className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
