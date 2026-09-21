export const SCROLL_TO_SECTION_EVENT = "portfolio:scroll-to";

export type ScrollToSectionDetail = {
  target: string;
};

// Internal section navigation stays out of the address bar. Components emit
// this event and App performs the scroll with Lenis when it is available.
export function scrollToSection(target: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ScrollToSectionDetail>(SCROLL_TO_SECTION_EVENT, {
      detail: { target },
    }),
  );
}
