import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpLeft } from "lucide-react";
import { NAV_LINKS, WHATSAPP, LOGO } from "../data/content";
import { cn } from "../utils/cn";
import { scrollToSection } from "../utils/scroll";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed top-0 inset-x-0 h-[2px] bg-brand z-[80] origin-right"
        style={{ scaleX: progress }}
      />

      <header
        className={cn(
          "fixed top-0 inset-x-0 z-[70] transition-all duration-500",
          scrolled
            ? "bg-ink/85 backdrop-blur-md border-b border-line-soft"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-[68px] flex items-center justify-between">
          {/* logo */}
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="flex cursor-pointer items-center gap-3 group"
            aria-label="الرجوع لبداية الصفحة"
          >
            <span className="h-9 w-9 overflow-hidden border border-line bg-panel transition-colors duration-300 group-hover:border-accent/60">
              <img
                src={LOGO}
                alt="محمد ياسر"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="leading-tight text-start">
              <span className="block font-display font-bold text-[0.95rem] text-paper">محمد ياسر</span>
              <span className="mt-1.5 block label-mono text-dim !text-[0.55rem]" dir="ltr">
                SEO SPECIALIST
              </span>
            </span>
          </button>

          {/* desktop links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <button
                key={l.target}
                type="button"
                onClick={() => scrollToSection(l.target)}
                className="relative cursor-pointer text-[0.83rem] text-muted hover:text-paper transition-colors duration-300 after:absolute after:-bottom-1 after:start-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-brand text-white font-semibold text-[0.83rem] px-5 h-10 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-8px_rgba(59,130,246,0.5)]"
            >
              احجز استشارة مجانية
              <ArrowUpLeft className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden grid h-10 w-10 place-items-center border border-line text-paper"
              aria-label="القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] bg-ink flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-5 h-[68px] border-b border-line-soft">
              <span className="font-display font-bold text-paper">القائمة</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center border border-line text-paper"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.target}
                  type="button"
                  onClick={() => {
                    scrollToSection(l.target);
                    setOpen(false);
                  }}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex cursor-pointer items-baseline gap-4 border-b border-line-soft py-3 text-start"
                >
                  <span className="label-mono text-accent">0{i + 1}</span>
                  <span className="font-display font-bold text-3xl text-paper group-hover:text-accent transition-colors">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="p-8">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-brand text-white font-semibold h-14 w-full"
              >
                احجز استشارة مجانية
                <ArrowUpLeft className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
