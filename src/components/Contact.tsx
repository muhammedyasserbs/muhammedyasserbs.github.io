import { motion } from "framer-motion";
import { ArrowUpLeft, MessageCircle, CalendarCheck } from "lucide-react";
import { WHATSAPP, CONTACT_STEPS } from "../data/content";
import { SectionHeader, Reveal, Magnetic, Ticks } from "./ui";

export default function Contact() {
  return (
    <section id="contact" className="grid-bg relative overflow-hidden border-t border-line-soft py-24 md:py-36">
      <div className="pointer-events-none absolute -bottom-52 start-1/2 h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="11"
          latin="LET'S TALK"
          align="center"
          title={
            <>
              جاهز توصل لـ
              <span className="text-accent">الصفحة الأولى</span>؟
            </>
          }
          sub="احجز استشارتك المجانية دلوقتي — هراجع موقعك، أشخص أهم المشاكل، وأقولك بوضوح إيه المتوقع لو اشتغلنا صح."
        />

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.25}>
              <motion.a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-brand px-9 h-16 font-display font-bold text-lg text-white shadow-[0_12px_36px_-10px_rgba(59,130,246,0.6)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <MessageCircle className="relative h-5 w-5" />
                <span className="relative">كلمني واتساب</span>
                <ArrowUpLeft className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
              </motion.a>
            </Magnetic>
            <div className="flex items-center gap-3 text-[0.82rem] text-muted">
              <CalendarCheck className="h-4.5 w-4.5 text-accent" />
              عادةً برد خلال أقل من 24 ساعة
            </div>
          </div>
        </Reveal>

        {/* after-contact flow */}
        <div className="mt-24">
          <Reveal>
            <div className="mb-10 flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-line" />
              <span className="label-mono text-dim">إيه اللي بيحصل بعد ما تبعت؟</span>
              <span className="h-px w-16 bg-line" />
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_STEPS.map((s, i) => (
              <Reveal key={s.num} delay={0.08 * i}>
                <div data-hover className="group relative h-full border border-line bg-ink/80 backdrop-blur p-6 transition-all duration-500 hover:border-accent/40 hover:-translate-y-1">
                  <Ticks className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="tnum text-2xl font-bold text-stroke-accent" dir="ltr">{s.num}</span>
                  <h3 className="mt-4 font-display font-bold text-[1.05rem] text-paper">{s.title}</h3>
                  <p className="mt-2.5 text-[0.8rem] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
