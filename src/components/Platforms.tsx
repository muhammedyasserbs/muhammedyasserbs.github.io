import { ArrowUpLeft } from "lucide-react";
import { PLATFORMS } from "../data/content";
import { SectionHeader, Reveal } from "./ui";

export default function Platforms() {
  return (
    <section id="platforms" className="relative border-t border-line-soft py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="07"
          latin="PLATFORMS"
          title={
            <>
              أيًا كانت المنصة..
              <br className="hidden md:block" /> <span className="text-accent">النتيجة واحدة.</span>
            </>
          }
          sub="خبرة عملية على أشهر منصات التجارة وإدارة المحتوى — كل منصة ليها أسلوب تحسين مختلف، وأنا عارف الفروق دي كويس."
        />

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.latin} delay={0.06 * i} className="h-full">
              <article
                data-hover
                className="group relative flex h-full min-h-[220px] flex-col justify-between bg-ink p-6 transition-colors duration-500 hover:bg-card overflow-hidden"
              >
                <span
                  className="pointer-events-none absolute -bottom-10 -start-10 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
                  style={{ background: p.hue }}
                />
                <div className="flex items-start justify-between">
                  <span className="tnum text-[0.65rem] text-dim" dir="ltr">
                    0{i + 1}
                  </span>
                  <ArrowUpLeft className="h-4 w-4 text-line transition-all duration-500 group-hover:text-accent group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-2xl md:text-[1.7rem] text-paper transition-colors duration-500" dir={/[A-Za-z]/.test(p.name) ? "ltr" : "rtl"}>
                    {p.name}
                  </h3>
                  <span className="label-mono mt-1 block !text-[0.55rem] text-dim" dir="ltr">
                    {p.latin.toUpperCase()}
                  </span>
                  <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
