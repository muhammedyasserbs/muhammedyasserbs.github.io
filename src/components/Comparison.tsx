import { useState } from "react";
import { m } from "framer-motion";
import { X, Check, Megaphone, LineChart } from "lucide-react";
import { SectionHeader, Reveal } from "./ui";
import { cn } from "../utils/cn";

const ADS = [
  "نتايج فورية — لكن بتقف أول ما توقف الدفع",
  "كل نقرة بتتخصم من ميزانيتك",
  "توقف الدفع = اختفاء الزيارات فورًا",
  "مش بتبني أصل يفضل ملكك",
];

const SEO = [
  "بياخد وقت في البداية لكنه بيبني ظهور عضوي تراكمي",
  "مفيش تكلفة مباشرة على كل نقرة من Google",
  "بيخدم الصفحات اللي عليها بحث فعلي من عملائك",
  "قيمته بتتراكم مع التحسين والمتابعة على المدى الطويل",
];

export default function Comparison() {
  const [hover, setHover] = useState<"ads" | "seo" | null>(null);

  return (
    <section className="relative border-t border-line-soft py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="04"
          latin="ADS VS SEO"
          align="center"
          title={
            <>
              الفرق بين <span className="text-muted line-through decoration-accent/60 decoration-2">تستأجر</span> الزيارات
              <br className="hidden md:block" /> و<span className="text-accent">تملكها</span>.
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {/* Ads */}
          <Reveal>
            <div
              data-hover
              onMouseEnter={() => setHover("ads")}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "relative h-full border p-7 md:p-9 transition-all duration-500",
                hover === "ads" ? "border-paper/25 bg-card" : "border-line bg-panel"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center border border-line text-muted">
                    <Megaphone className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-xl text-paper/80">الإعلانات الممولة</h3>
                    <span className="label-mono !text-[0.55rem] text-dim" dir="ltr">PAID ADS</span>
                  </div>
                </div>
                <span className="tnum text-xs text-dim" dir="ltr">RENTED</span>
              </div>

              <ul className="mt-8 space-y-4">
                {ADS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-line text-dim">
                      <X className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-dashed border-line pt-4 text-[0.75rem] text-dim">
                التكلفة: مستمرة ما دمت بتدفع
              </div>
            </div>
          </Reveal>

          {/* SEO */}
          <Reveal delay={0.12}>
            <div
              data-hover
              onMouseEnter={() => setHover("seo")}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "relative h-full border p-7 md:p-9 transition-all duration-500 overflow-hidden",
                hover === "seo"
                  ? "border-accent/60 bg-[#132648]"
                  : "border-accent/30 bg-[#101f3c]"
              )}
            >
              <div className="pointer-events-none absolute -top-20 -end-20 h-52 w-52 rounded-full bg-accent/10 blur-[70px]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center bg-brand text-white">
                    <LineChart className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-xl text-paper">تحسين محركات البحث</h3>
                    <span className="label-mono !text-[0.55rem] text-accent/70" dir="ltr">ORGANIC SEO</span>
                  </div>
                </div>
                <span className="tnum text-xs text-accent" dir="ltr">OWNED</span>
              </div>

              <ul className="mt-8 space-y-4">
                {SEO.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-paper/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center bg-accent/15 text-accent border border-accent/40">
                      <Check className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-dashed border-accent/25 pt-4 text-[0.75rem] text-accent/80">
                التكلفة: استثمار بيرجع قيمته كل شهر
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <m.p className="mx-auto mt-10 max-w-2xl text-center text-[0.9rem] leading-loose text-muted">
            الأفضل مش دايمًا واحد بدل التاني —{" "}
            <span className="text-paper font-semibold">الإعلانات</span> بتدعم احتياجك السريع،
            و<span className="text-accent font-semibold"> SEO </span>
            بيبني حضور عضوي يشتغل لصالحك على المدى الطويل.
          </m.p>
        </Reveal>
      </div>
    </section>
  );
}
