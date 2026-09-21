import { Briefcase, GraduationCap, Check } from "lucide-react";
import { EXPERIENCE } from "../data/content";
import { SectionHeader, Reveal } from "./ui";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-line-soft py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader
              index="09"
              latin="CAREER PATH"
              title={
                <>
                  رحلتي في
                  <br /> <span className="text-accent">عالم السيو.</span>
                </>
              }
              sub="من تدريب عملي في التسويق الرقمي، لحد إدارة حسابات SEO كاملة لعملاء في مجالات مختلفة — كل خطوة بنت على اللي قبلها."
            />
            <Reveal delay={0.25}>
              <div className="mt-10 border border-line bg-panel p-7">
                <span className="label-mono !text-[0.58rem] text-dim">الوضع الحالي</span>
                <div className="mt-3 flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="font-display font-bold text-lg text-paper">
                    متاح لمشاريع جديدة — متاجر ومواقع خدمية
                  </span>
                </div>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">
                  بستقبل عدد محدود من المشاريع عشان أضمن جودة الشغل ومتابعة دقيقة لكل عميل.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            {/* rail */}
            <span className="absolute top-2 bottom-2 start-[7px] w-px bg-line" aria-hidden />
            <div className="space-y-6">
              {EXPERIENCE.map((e, i) => (
                <Reveal key={e.company} delay={0.1 * i}>
                  <article
                    data-hover
                    className="group relative ms-8 border border-line bg-ink p-7 md:p-8 transition-all duration-500 hover:border-accent/40 hover:bg-card"
                  >
                    {/* node */}
                    <span className="absolute top-9 -start-8 grid h-[15px] w-[15px] place-items-center">
                      <span className={"h-[15px] w-[15px] border transition-all duration-500 " + (e.current ? "border-accent bg-accent/30 group-hover:rotate-45" : "border-line bg-ink group-hover:border-accent")} />
                    </span>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="label-mono !text-[0.6rem] text-dim flex items-center gap-2">
                        {e.current ? <Briefcase className="h-3.5 w-3.5 text-accent" /> : <GraduationCap className="h-3.5 w-3.5" />}
                        {e.period}
                      </span>
                      {e.current && (
                        <span className="border border-accent/40 bg-accent/10 px-3 py-1 text-[0.65rem] font-semibold text-accent">
                          حاليًا
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 font-display font-bold text-2xl text-paper" dir="ltr">{e.role}</h3>
                    <span className="mt-1 block text-[0.9rem] font-semibold text-accent/90">{e.company}</span>

                    <ul className="mt-5 space-y-2.5 border-t border-line-soft pt-5">
                      {e.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[0.84rem] leading-relaxed text-muted">
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
