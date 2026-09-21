import CaseStudies from "./CaseStudies";
import Comparison from "./Comparison";
import SerpTool from "./SerpTool";
import Process from "./Process";
import Platforms from "./Platforms";
import Tools from "./Tools";
import Experience from "./Experience";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Marquee from "./Marquee";
import { MARQUEE_ITEMS } from "../data/content";

/**
 * Sections that sit below the first interaction area are kept in a separate
 * chunk. App loads this after the page is interactive, so the hero, navigation
 * and results viewer do not compete with the rest of the portfolio at startup.
 */
export default function BelowFoldSections() {
  return (
    <>
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
    </>
  );
}
