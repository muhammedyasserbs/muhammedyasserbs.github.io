import { useEffect } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Results from "./components/Results";
import CaseStudies from "./components/CaseStudies";
import Comparison from "./components/Comparison";
import SerpTool from "./components/SerpTool";
import Process from "./components/Process";
import Platforms from "./components/Platforms";
import Tools from "./components/Tools";
import Experience from "./components/Experience";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { MARQUEE_ITEMS, WHATSAPP } from "./data/content";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // The image lightbox owns touch gestures while it is open. Pausing Lenis
    // prevents its RAF loop from competing with pinch/pan on mobile.
    const onLightbox = (event: Event) => {
      const open = (event as CustomEvent<{ open?: boolean }>).detail?.open;
      if (open) lenis.stop();
      else lenis.start();
    };
    window.addEventListener("portfolio:lightbox", onLightbox);
    if (document.documentElement.classList.contains("lightbox-open")) lenis.stop();

    // anchor navigation through lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -70 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("portfolio:lightbox", onLightbox);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="noise min-h-screen bg-ink text-paper selection:bg-accent selection:text-white">
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} />
        <Services />
        <Results />
        <CaseStudies />
        <Comparison />
        <SerpTool />
        <Process />
        <Platforms />
        <Marquee items={MARQUEE_ITEMS.slice().reverse()} dark />
        <Tools />
        <Experience />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      {/* floating whatsapp — official style */}
      <motion.a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل عبر واتساب"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
        className="group fixed bottom-6 end-6 z-[75] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25d366]/50 opacity-0 group-hover:opacity-100 [animation-duration:1.6s]" aria-hidden />
        <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  );
}
