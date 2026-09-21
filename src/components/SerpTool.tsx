import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { Globe, FlaskConical } from "lucide-react";
import { SectionHeader, Reveal, Ticks } from "./ui";
import { LOGO } from "../data/content";
import { cn } from "../utils/cn";

type Tone = "idle" | "short" | "good" | "over";

const TONE: Record<Tone, { bar: string; text: string; label: string }> = {
  idle: { bar: "bg-line", text: "text-dim", label: "ابدأ الكتابة" },
  short: { bar: "bg-[#fbbf24]", text: "text-[#fbbf24]", label: "قصير شوية" },
  good: { bar: "bg-accent2", text: "text-accent2", label: "طول ممتاز" },
  over: { bar: "bg-[#f87171]", text: "text-[#f87171]", label: "طويل — هيتقطع" },
};

function Field({
  label,
  hint,
  value,
  onChange,
  max,
  goodMin,
  placeholder,
  dir = "auto",
  multiline = false,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  max: number;
  goodMin: number;
  placeholder: string;
  dir?: string;
  multiline?: boolean;
}) {
  const len = value.length;
  const tone: Tone = !len ? "idle" : len > max ? "over" : len >= goodMin ? "good" : "short";
  const t = TONE[tone];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-[0.82rem] font-medium text-paper/85">{label}</label>
        <div className="flex items-center gap-3">
          <span className={cn("text-[0.68rem] font-medium transition-colors", t.text)}>{t.label}</span>
          <span className="tnum text-[0.72rem] text-dim" dir="ltr">
            <span className={cn("font-semibold transition-colors", t.text)}>{len}</span>
            {" / "}
            {max}
          </span>
        </div>
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir as "auto"}
          rows={3}
          className="w-full resize-none border border-line bg-ink px-4 py-3 text-[0.88rem] leading-relaxed text-paper placeholder:text-dim/70 transition-colors focus:border-accent/60 focus:outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir as "auto"}
          className="w-full border border-line bg-ink px-4 py-3 text-[0.88rem] text-paper placeholder:text-dim/70 transition-colors focus:border-accent/60 focus:outline-none"
        />
      )}
      <div className="mt-2 h-[3px] w-full bg-line/60">
        <m.div
          className={cn("h-full", t.bar)}
          animate={{ width: `${Math.min((len / max) * 100, 100)}%` }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
        />
      </div>
      <p className="mt-1.5 text-[0.62rem] text-dim">{hint}</p>
    </div>
  );
}

export default function SerpTool() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  const domain = useMemo(() => {
    const clean = url.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return clean || "example.com";
  }, [url]);

  return (
    <section id="snippet" className="relative border-t border-line-soft bg-panel/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="05"
            latin="SERP LAB"
            title={
              <>
                جرّب <span className="text-accent">عنوان صفحتك</span>
                <br className="hidden md:block" /> قبل ما ترفعه.
              </>
            }
            sub="اكتب الـ Title و Meta Description وشوف موقعك شكله إزاي وسط نتايج البحث — مع تقييم فوري للطول المثالي."
          />
          <Reveal delay={0.15}>
            <div className="flex items-center gap-3 border border-line bg-ink px-5 py-3.5 text-[0.82rem] text-muted">
              <FlaskConical className="h-4.5 w-4.5 text-accent" />
              نفس الأداة اللي بستخدمها قبل أي نشر
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid min-w-0 items-start gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          {/* inputs */}
          <Reveal className="min-w-0">
            <div className="relative min-w-0 border border-line bg-ink p-6 md:p-8">
              <Ticks className="opacity-60" />
              <span className="label-mono !text-[0.55rem] text-dim">المدخلات</span>
              <div className="mt-6 space-y-7">
                <Field
                  label="عنوان الصفحة (Title)"
                  hint="الطول المثالي بين 30 و 60 حرف عشان يظهر كامل في Google"
                  value={title}
                  onChange={setTitle}
                  max={60}
                  goodMin={30}
                  placeholder="مثال: متجر عطارة | زيوت طبيعية أصلية بتوصيل سريع"
                />
                <Field
                  label="وصف الميتا (Meta Description)"
                  hint="الطول المثالي بين 70 و 155 حرف — اكتب وصف يقنع العميل يضغط"
                  value={desc}
                  onChange={setDesc}
                  max={160}
                  goodMin={70}
                  placeholder="مثال: اشتري زيوت طبيعية 100% من مصادر موثوقة..."
                  multiline
                />
                <div>
                  <label className="mb-2 block text-[0.82rem] font-medium text-paper/85">
                    رابط الصفحة <span className="text-dim">(اختياري)</span>
                  </label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="example.com"
                    dir="ltr"
                    className="w-full border border-line bg-ink px-4 py-3 text-left font-[family-name:var(--font-grot)] text-[0.88rem] text-paper placeholder:text-dim/70 transition-colors focus:border-accent/60 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* live preview */}
          <Reveal delay={0.12} className="min-w-0 lg:sticky lg:top-28">
            <div className="min-w-0">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="label-mono !text-[0.55rem] text-dim">معاينة نتيجة البحث — مباشرة</span>
                <span className="tnum flex shrink-0 items-center gap-2 text-[0.62rem] text-accent" dir="ltr">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent blink" />
                  LIVE
                </span>
              </div>

              <div className="overflow-hidden border border-line bg-panel">
                {/* google chrome bar */}
                <div className="flex items-center gap-3 border-b border-line px-4 py-2.5" dir="ltr">
                  <span className="flex shrink-0 gap-1.5">
                    <i className="h-2.5 w-2.5 rounded-full bg-[#3a4a66]" />
                    <i className="h-2.5 w-2.5 rounded-full bg-[#3a4a66]" />
                    <i className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                  </span>
                  <span className="flex min-w-0 items-center gap-2 rounded-full bg-ink px-3 py-1 text-[0.62rem] text-dim">
                    <Globe className="h-3 w-3 shrink-0" />
                    <span className="truncate">google.com/search</span>
                  </span>
                </div>

                {/* result */}
                <div className="p-6 md:p-8" dir="ltr">
                  <div dir="rtl" className="text-right">
                    <div className="flex items-center gap-3">
                      <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-line bg-ink">
                        <img
                          src={LOGO}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <div className="min-w-0 leading-tight">
                        <span className="block text-[0.8rem] text-[#bdc1c6]">موقعك</span>
                        <span className="block truncate text-[0.7rem] text-dim" dir="ltr">
                          {domain}
                        </span>
                      </div>
                    </div>

                    <h4
                      className={cn(
                        "mt-3 break-words text-lg leading-snug md:text-xl",
                        title
                          ? "cursor-pointer text-[#9ec2f7] hover:underline"
                          : "text-dim italic"
                      )}
                    >
                      {title || "عنوان صفحتك هيظهر هنا — اكتب حاجة تقنع العميل يضغط"}
                    </h4>

                    <p
                      className={cn(
                        "mt-1.5 line-clamp-2 break-words text-[0.85rem] leading-relaxed",
                        desc ? "text-[#bdc1c6]" : "text-dim italic"
                      )}
                    >
                      {desc ||
                        "وصف الميتا هيظهر هنا. الوصف الجيد بيخلي العميل يفهم إنت بتقدم إيه قبل ما يضغط على النتيجة، وبيزوّد نسبة النقر CTR."}
                    </p>
                  </div>
                </div>

                {/* footer hint */}
                <div className="border-t border-line-soft bg-ink/60 px-6 py-3.5 md:px-8">
                  <p className="text-[0.68rem] leading-relaxed text-dim">
                    المعاينة للتوضيح فقط — Google ممكن يغيّر العنوان أو الوصف حسب بحث المستخدم والجهاز.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
