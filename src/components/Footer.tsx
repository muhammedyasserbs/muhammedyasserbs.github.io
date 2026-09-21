import { ArrowUp, MessageCircle } from "lucide-react";
import { NAV_LINKS, WHATSAPP, LOGO, LINKEDIN } from "../data/content";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-panel">
      {/* giant name */}
      <div className="overflow-hidden border-b border-line-soft">
        <h2
          aria-hidden
          className="mx-auto max-w-[1400px] px-5 md:px-10 py-10 md:py-14 font-display font-extrabold text-[clamp(3.4rem,12vw,10rem)] leading-none tracking-tight text-paper/[0.06] select-none whitespace-nowrap"
        >
          محمد ياسر<span className="text-accent/20">.</span>
        </h2>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 overflow-hidden border border-line bg-ink">
              <img src={LOGO} alt="محمد ياسر" className="h-full w-full object-cover" />
            </span>
            <div className="leading-tight">
              <span className="block font-display font-bold text-paper">محمد ياسر</span>
              <span className="block label-mono !text-[0.55rem] text-dim" dir="ltr">SEO SPECIALIST</span>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[0.84rem] leading-loose text-muted">
            أخصائي SEO بساعد المتاجر الإلكترونية والمواقع الخدمية ومواقع SaaS
            تظهر في الصفحة الأولى من بحث Google — بشغل مبني على بيانات، مش وعود.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[0.84rem] font-semibold text-accent hover:gap-3.5 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span dir="ltr">+20 100 933 2728</span>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[0.84rem] font-semibold text-muted transition-all hover:gap-3.5 hover:text-accent"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span dir="ltr">Muhammed Yasser</span>
            </a>
          </div>
        </div>

        <div>
          <span className="label-mono !text-[0.58rem] text-dim">الموقع</span>
          <nav className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
            {NAV_LINKS.slice(0, 5).map((l) => (
              <a key={l.href} href={l.href} className="text-[0.84rem] text-muted transition-colors hover:text-accent">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <span className="label-mono !text-[0.58rem] text-dim">التخصصات</span>
          <ul className="mt-5 space-y-3 text-[0.84rem] text-muted">
            <li>On-Page SEO وكتابة المحتوى</li>
            <li>Technical SEO والفحص التقني</li>
            <li>SEO المتاجر الإلكترونية</li>
            <li>SEO المواقع الخدمية و SaaS</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 md:px-10 py-6">
          <span className="text-[0.72rem] text-dim">
            © {new Date().getFullYear()} محمد ياسر — كل الحقوق محفوظة.
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-10 w-10 place-items-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="ارجع لفوق"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
