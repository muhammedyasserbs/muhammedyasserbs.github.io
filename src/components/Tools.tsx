import { TOOLS } from "../data/content";
import { SectionHeader, Reveal } from "./ui";
import { Wrench } from "lucide-react";

export default function Tools() {
  return (
    <section className="relative border-t border-line-soft bg-panel/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="08"
            latin="TECH STACK"
            title={
              <>
                ترسانة الأدوات اللي
                <br className="hidden md:block" /> <span className="text-accent">بشتغل بيها يوميًا.</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <div className="flex items-center gap-3 border border-line bg-ink px-5 py-3.5 text-[0.82rem] text-muted">
              <Wrench className="h-4.5 w-4.5 text-accent" />
              11+ أداة احترافية — مدفوعة ومجانية
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3 xl:grid-cols-4">
          {TOOLS.map((t, i) => (
            <Reveal key={t.name} delay={0.03 * i} className="h-full">
              <div
                data-hover
                className="group relative flex h-full items-center justify-between gap-3 bg-ink px-5 py-5 transition-colors duration-500 hover:bg-accent"
              >
                <div>
                  <span className="tnum block text-[0.92rem] font-semibold text-paper transition-colors duration-500 group-hover:text-white" dir="ltr">
                    {t.name}
                  </span>
                  <span className="mt-1 block text-[0.72rem] text-dim transition-colors duration-500 group-hover:text-white/70">
                    {t.role}
                  </span>
                </div>
                <span className="tnum shrink-0 text-[0.6rem] text-dim transition-colors duration-500 group-hover:text-white/60" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}

          {/* filler cell */}
          <Reveal delay={0.36} className="h-full">
            <div className="relative hidden h-full items-center justify-center bg-ink px-5 py-5 xl:flex">
              <span className="label-mono !text-[0.55rem] text-dim" dir="ltr">
                + ALWAYS LEARNING
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
