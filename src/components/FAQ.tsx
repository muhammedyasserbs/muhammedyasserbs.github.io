import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { FAQS, WHATSAPP } from "../data/content";
import { SectionHeader, Reveal } from "./ui";
import { cn } from "../utils/cn";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative border-t border-line-soft bg-panel/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHeader
              index="10"
              latin="FAQ"
              title={
                <>
                  أسئلة بتتسأل
                  <br /> <span className="text-accent">كتير.. بصراحة.</span>
                </>
              }
              sub="جاوبت على أكتر الأسئلة اللي بتوصلني من أصحاب المتاجر والمواقع — لو عندك سؤال تاني، اسألني مباشرة."
            />
            <Reveal delay={0.25}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-3 border border-line bg-ink px-6 h-[52px] text-[0.88rem] font-medium text-paper transition-colors duration-300 hover:border-accent/60 hover:text-accent"
              >
                <MessageCircleQuestion className="h-4.5 w-4.5 text-accent" />
                عندك سؤال مختلف؟ اسأل على واتساب
              </a>
            </Reveal>
          </div>

          <div className="border-t border-line">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={0.04 * i}>
                  <div data-hover className={cn("border-b border-line transition-colors duration-300", isOpen && "bg-ink/60")}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-5 px-1 py-6 text-start"
                    >
                      <span className={cn("tnum shrink-0 text-xs transition-colors duration-300", isOpen ? "text-accent" : "text-dim")} dir="ltr">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("flex-1 font-display font-bold text-lg md:text-xl leading-snug transition-colors duration-300", isOpen ? "text-accent" : "text-paper")}>
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center border transition-all duration-500",
                          isOpen ? "rotate-45 border-accent bg-brand text-white" : "border-line text-muted"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-1 pb-7 ps-12 text-[0.9rem] leading-loose text-muted max-w-2xl">
                            {f.a}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
