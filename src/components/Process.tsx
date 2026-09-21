import { m } from "framer-motion";
import { PROCESS } from "../data/content";
import { SectionHeader, Reveal } from "./ui";

export default function Process() {
  return (
    <section id="process" className="relative border-t border-line-soft bg-panel/40 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="06"
          latin="METHODOLOGY"
          title={
            <>
              طريقة شغل <span className="text-accent">واضحة</span>،
              <br className="hidden md:block" /> من أول يوم للنتيجة.
            </>
          }
          sub="مفيش صندوق أسود — بتعرف كل خطوة بتحصل إمتى وليه، وبتتابع التقدم بتقارير شهرية مفصلة."
        />

        <div className="relative mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* connector line */}
          <m.div
            className="absolute top-[26px] inset-x-10 hidden xl:block h-px bg-line"
            aria-hidden
          >
            <m.div
              className="h-full bg-accent origin-right"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </m.div>

          {PROCESS.map((p, i) => (
            <Reveal key={p.num} delay={0.1 * i}>
              <div data-hover className="group relative h-full">
                {/* node */}
                <div className="relative z-10 mb-7 hidden xl:flex h-[52px] items-center">
                  <span className="grid h-[52px] w-[52px] place-items-center border border-line bg-ink tnum text-sm font-semibold text-dim transition-all duration-500 group-hover:border-accent group-hover:bg-brand group-hover:text-white group-hover:rotate-90" dir="ltr">
                    {p.num}
                  </span>
                </div>
                <article className="h-full border border-line bg-ink p-7 transition-all duration-500 group-hover:border-accent/40 group-hover:-translate-y-1.5">
                  <span className="tnum text-xs text-dim xl:hidden" dir="ltr">STEP {p.num}</span>
                  <h3 className="mt-2 xl:mt-0 font-display font-bold text-lg md:text-xl text-paper">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.84rem] leading-loose text-muted">{p.desc}</p>
                </article>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border border-line bg-ink px-6 py-5">
            <span className="label-mono !text-[0.58rem] text-dim">المدة المتوقعة</span>
            {[
              ["تحسن واضح", "شهر 2–3"],
              ["نتايج كبيرة", "شهر 4–6"],
              ["تقارير أداء", "شهريًا"],
            ].map(([k, v]) => (
              <span key={k} className="flex items-center gap-2.5 text-[0.82rem]">
                <span className="text-muted">{k}</span>
                <span className="h-3 w-px bg-line" />
                <span className="tnum font-semibold text-accent" dir="ltr">{v}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
