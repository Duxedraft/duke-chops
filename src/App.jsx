import { useCallback, useEffect, useState } from "react";
import { exhibitions } from "./data/exhibitions";
import PlateArt from "./components/PlateArt";
import PlateCard from "./components/PlateCard";
import { XCircleIcon } from '@heroicons/react/24/solid'
import ExhibitionTabs from "./components/ExhibitionTabs";
import { edge, edgeStrong, pxPage } from "./lib/theme";
import "./index.css";

function getExhibitionIdFromURL() {
  // This function checks the URL for a "vol" query parameter and returns the corresponding exhibition ID if it exists in the exhibitions array. If not, it returns null.
  const fromURL = new URLSearchParams(window.location.search).get("vol");
  return exhibitions.some((e) => e.id === fromURL) ? fromURL : null;
}

function MetaFact({
  label,
  value,
  labelClassName = "text-hush/50",
  valueClassName = "text-hush",
}) {
  return (
    <div
      className={`font-mono text-[11px] tracking-[0.08em] uppercase ${labelClassName}`}
    >
      {label}
      <div
        className={`mt-1.5 block font-mono text-xs tracking-normal normal-case ${valueClassName}`}
      >
        {value}
      </div>
    </div>
  );
}

function RecipeDetail({ dish, onClose, isOpen }) {
  // Change how the recipe card looks here.
  return (
    <div
      className={`relative overflow-hidden mx-auto w-full max-w-220 rounded-3xl border-2 border-hush bg-paper ${edgeStrong} duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-y-0 scale-100" : "translate-y-4.5 scale-[0.985]"}`}
      role="dialog"
      aria-modal="true"
    >
      <button
        className={`absolute top-4.5 right-4.5 z-3 flex h-9.5 w-9.5 cursor-pointer ${edge}`}
        aria-label="Close recipe"
        onClick={onClose}
      >
        <XCircleIcon className="size-8 text-hush transition-[color,transform] ease-in-out duration-350 hover:text-brass" />
      </button>
      <PlateArt dish={dish} className="aspect-16/8" />
      <div className="p-[clamp(24px,4vw,46px)]">
        <span className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">
          Dish No. {dish.no} — {dish.medium}
        </span>
        <h2 className="my-2.5 mb-3.5 font-serif text-[clamp(28px,4vw,42px)] leading-[1.08] font-normal text-hush">
          {dish.title}
        </h2>
        <p className="mb-7 text-[15px] leading-[1.75] text-hush/50">
          {dish.note}
        </p>
        <div
          className={`mb-8 flex flex-wrap gap-10 border-y py-4 font-mono text-[10.5px] tracking-widest text-paper uppercase ${edge}`}
        >
          <MetaFact
            label="Time"
            value={dish.time}
            labelClassName="text-hush/60"
            valueClassName="text-hush"
          />
          <MetaFact
            label="Serves"
            value={dish.serves}
            labelClassName="text-hush/60"
            valueClassName="text-hush"
          />
          <MetaFact
            label="Difficulty"
            value={dish.difficulty}
            labelClassName="text-hush/60"
            valueClassName="text-hush"
          />
        </div>
        <div className="grid grid-cols-1 gap-[clamp(28px,4vw,56px)] min-[620px]:grid-cols-[1fr_1.5fr]">
          <div>
            <h4 className="mb-4 font-semibold text-xs tracking-[0.14em] text-brass uppercase">
              Ingredients
            </h4>
            <ul className="m-0 list-none p-0">
              {dish.ingredients.map(([name, amt]) => (
                <li
                  key={name}
                  className="flex justify-between gap-3 border-b border-dashed border-brass/30 py-2.5 text-sm leading-snug"
                >
                  <span className="text-hush/80">{name}</span>
                  <span className="font-mono text-sm whitespace-nowrap text-hush/60">
                    {amt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-xs tracking-[0.14em] text-brass uppercase">
              Method
            </h4>
            <ol className="m-0 list-none p-0">
              {dish.steps.map((step, i) => (
                <li
                  key={step}
                  className="relative pb-5.5 pl-10 text-[14.5px] leading-[1.7] text-hush last:pb-0"
                >
                  <span
                    className={`absolute -top-px left-0 flex h-6.5 w-6.5 items-center justify-center rounded-full border-[1.5px] border-brass text-xs text-brass ${edge}`}
                  >
                    {i + 1}
                  </span>
                  {i < dish.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-6.5 bottom-0 left-3.25 w-px bg-[rgba(176,138,78,0.2)]"
                    />
                  )}
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main app component
export default function App() {
  const [activeExhibitionId, setActiveExhibitionId] = useState(
    () =>
      getExhibitionIdFromURL() ??
      exhibitions.find((e) => e.status === "current")?.id ??
      exhibitions[0].id,
  );
  const activeExhibition =
    exhibitions.find((e) => e.id === activeExhibitionId) ?? exhibitions[0];
  const dishes = activeExhibition.dishes;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const isOpen = selectedIndex !== null;
  const selectedDish = isOpen ? dishes[selectedIndex] : null;

  const closeDetail = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleSelectExhibition = useCallback((id) => {
    setActiveExhibitionId(id);
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeDetail();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeDetail]);

  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set("vol", activeExhibitionId);
    window.history.replaceState({}, "", url);
  }, [activeExhibitionId]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[3px_3px] opacity-50"
        aria-hidden="true"
      />

      <nav
        className={`sticky top-0 z-50 flex items-center justify-between py-5.5 ${pxPage} bg-paper backdrop-blur-[6px]`}
      >
        <a
          href="#"
          className="font-serif text-xl text-hush font-semibold tracking-[0.02em] [font-optical-sizing:auto] duration-200 hover:text-hush/50"
        >
          Duke Chops<em className="italic">.</em>
        </a>
        <a
          href="#gallery"
          className={`rounded-full border px-3.5 py-2 text-[10px] tracking-[0.12em] font-medium text-hush/50 transition-[border-color,color] duration-200 hover:border-brass hover:text-hush ${edge}`}
        >
          View Catalog
        </a>
      </nav>

      <header
        className={`relative z-1 mx-auto max-w-7xl pt-[clamp(48px,12vh,120px)] pb-[clamp(40px,8vh,90px)] ${pxPage}`}
      >
        <div className="mb-8">
          <ExhibitionTabs
            exhibitions={exhibitions}
            activeId={activeExhibitionId}
            onSelect={handleSelectExhibition}
          />
        </div>
        <div className="mb-7 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-hush/30 uppercase">
          {" "}
          {/* code for a dash before the text (before:h-px before:w-7.5 before:bg-hush before:content-[''])*/}
          {activeExhibition.status === "current"
            ? "Current exhibition"
            : "Archived exhibition"}{" "}
          — {activeExhibition.volume}
        </div>
        <h1 className="mb-7 max-w-[30ch] text-hush font-serif text-[clamp(40px,7vw,92px)] leading-[1.02] font-extralight tracking-[-0.01em] [font-optical-sizing:auto]">
          {activeExhibition.headingPlain}{" "}
          <span className="font-[480] text-clay italic">
            {activeExhibition.headingAccent}
          </span>
        </h1>
        <p className="mb-10 max-w-[120ch] text-[clamp(15px,1.6vw,18px)] leading-[1.7] text-hush/50">
          {activeExhibition.intro}
        </p>
        <div
          className={`flex flex-wrap gap-10 border-t pt-5.5 font-mono text-[11px] tracking-[0.08em] text-hush/50 uppercase ${edge}`}
        >
          <MetaFact label="Pieces" value={activeExhibition.meta.pieces} />
          <MetaFact label="Category" value={activeExhibition.meta.category} />
          <MetaFact
            label="Curated for"
            value={activeExhibition.meta.curatedFor}
          />
        </div>
      </header>

      <main
        className={`relative z-1 mx-auto grid max-w-7xl grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[clamp(28px,3vw,44px)] pt-5 pb-35 scroll-mt-20 ${pxPage}`}
        id="gallery"
        aria-label="Recipe gallery"
        key={activeExhibitionId}
      >
        {dishes.map((dish, index) => (
          <PlateCard
            key={dish.no}
            dish={dish}
            index={index}
            onOpen={setSelectedIndex}
          />
        ))}
      </main>

      <div
        className={`fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-ink/70 p-4 py-[clamp(16px,4vh,64px)] backdrop-blur-[3px] transition-opacity duration-300 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDetail();
        }}
      >
        {selectedDish && (
          <RecipeDetail
            dish={selectedDish}
            onClose={closeDetail}
            isOpen={isOpen}
          />
        )}
      </div>

      <div className={`relative flex flex-col sm:flex-row gap-3 items-start justify-center border-t py-10 text-[11px] tracking-[0.08em] text-hush/70 ${edge} ${pxPage}`}>
        <h5 className="flex tracking-normal normal-case text-[11px] font-semibold">About the curator</h5>
        <p className="max-w-5xl flex flex-wrap gap-3 leading-[1.7] text-hush/50 text-xs">
          Duke Chops by Aman. D, is written and photographed from a small kitchen with one
          good window. There is no test kitchen, no team — just one cook who
          believes a plate deserves the same attention as a painting, and
          roughly the same lifespan as a bouquet.
          <a href="mailto:chopsbyduke@gmail.com" className="text-hush/50 hover:text-brass">
            chopsbyduke@gmail.com
          </a>
        </p>
      </div>

      <footer
        className={`relative z-1 flex flex-wrap items-center justify-between gap-4 border-t py-10 pb-14 font-mono text-xs tracking-[0.08em] text-hush/30 ${edge} ${pxPage}`}
      >
        <span className="font-serif tracking-normal normal-case">
          Duke Chops — A food journal.
        </span>
        <span className="text-[10px]">All rights reserved. Eaten shortly after publication.</span>
      </footer>
    </>
  );
}
