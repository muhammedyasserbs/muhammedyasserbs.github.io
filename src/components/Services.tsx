import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { SERVICES } from "../data/content";
import { SectionHeader, Reveal } from "./ui";
import { cn } from "../utils/cn";

function ServiceRow({
  s,
  open,
  onToggle,
}: {
  s: (typeof SERVICES)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal>
      <div
        data-hover
        onClick={onToggle}
        className={cn(
          "group relative cursor-pointer border-t border-line transition-colors duration-500",
          open ? "bg-card" : "hover:bg-card/60"
        )}
      >
        {/* accent fill sweep on hover */}
        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "h-[3px]" : "h-0 group-hover:h-[3px]"
          )}
        />
        <div className="grid gap-4 py-7 md:grid-cols-[90px_1fr_auto] md:items-center md:gap-5 md:py-9 grid-cols-[1fr_auto]">
          <span
            className={cn(
              "tnum text-sm font-medium transition-colors duration-300 max-md:order-1",
              open ? "text-accent" : "text-dim"
            )}
            dir="ltr"
          >
            /{s.num}
          </span>

          <div className="max-md:order-3 max-md:col-span-2">
            <h3 className="font-display font-bold text-2xl md:text-[2rem] leading-tight text-paper transition-transform duration-500 md:group-hover:-translate-x-2">
              {s.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="border border-line px-2.5 py-1 text-[0.68rem] text-muted transition-colors duration-300 group-hover:border-accent/30"
                  dir={/[A-Za-z]/.test(t) ? "ltr" : "rtl"}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <span
            className={cn(
              "grid h-11 w-11 place-items-center border transition-all duration-500 md:h-12 md:w-12 max-md:order-2",
              open
                ? "rotate-45 border-transparent bg-brand text-white"
                : "border-line text-muted group-hover:border-accent/60 group-hover:text-accent"
            )}
          >
            <Plus className="h-5 w-5" />
          </span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 pb-9 md:grid-cols-[90px_1.2fr_1fr] md:pb-11">
                <span className="hidden md:block" />
                <p className="max-w-lg text-[0.92rem] leading-loose text-muted">{s.desc}</p>
                <ul className="space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[0.85rem] text-paper/80">
                      <span className="grid h-5 w-5 shrink-0 place-items-center border border-accent/40 text-accent">
                        <Check className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Services() {
  const [open, setOpen] = useState(1);

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="01"
            latin="SERVICES"
            title={
              <>
                خدمات مبنية على <span className="text-accent">بيانات</span>،
                <br className="hidden md:block" /> مش تخمين.
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="max-w-xs text-[0.85rem] leading-relaxed text-dim">
              كل خدمة بتتنفذ بمنهج واضح: تحليل، تنفيذ، قياس.
              اضغط على أي خدمة عشان تشوف التفاصيل.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-[1400px] px-5 md:px-10 lg:max-w-[1150px]">
        <div className="border-b border-line">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.num} s={s} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
