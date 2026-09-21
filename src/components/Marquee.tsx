import { Asterisk } from "lucide-react";

export default function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      className={
        "relative overflow-hidden border-y py-5 " +
        (dark ? "border-line bg-panel" : "border-accent2/40 bg-brand")
      }
      dir="ltr"
    >
      <div
        className="marquee-track flex w-max items-center gap-8 whitespace-nowrap"
        style={{ ["--marquee-duration" as string]: "34s", direction: "rtl" }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={
                "font-display font-bold text-xl md:text-2xl " +
                (dark ? "text-muted" : "text-white")
              }
            >
              {item}
            </span>
            <Asterisk className={"h-5 w-5 " + (dark ? "text-accent" : "text-white/60")} />
          </span>
        ))}
      </div>
    </div>
  );
}
