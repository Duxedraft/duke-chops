import { useCallback, useEffect, useState } from "react";
import { dishes } from "./dishes";
import "./index.css";

const edge = "border-[rgba(176,138,78,0.28)]";
const edgeStrong = "border-[rgba(176,138,78,0.55)]";
const pxPage = "px-[clamp(20px,6vw,64px)]";

function PlateArt({ dish, className = "" }) {
  return (
    <div
      className={`relative block bg-hush after:absolute after:inset-0 after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] after:content-[''] [&_svg]:absolute [&_svg]:inset-0 [&_svg]:h-full [&_svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: dish.art(dish.palette) }}
    />
  );
}

function PlateCard({ dish, index, onOpen }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(index);
    }
  };

  return (
    <article
      className={`group relative cursor-pointer overflow-hidden rounded-[2px] border bg-ink-soft opacity-0 translate-y-6 animate-rise ${edge} transition-[border-color,box-shadow] duration-[350ms] ease-out hover:border-brass hover:shadow-[0_22px_50px_-20px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-4 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
      tabIndex={0}
      role="button"
      aria-label={`Open recipe for ${dish.title}`}
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={() => onOpen(index)}
      onKeyDown={handleKeyDown}
    >
      <PlateArt
        dish={dish}
        className="aspect-[4/5] [&_svg]:transition-transform [&_svg]:duration-[600ms] [&_svg]:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[&_svg]:scale-[1.035]"
      />
      <div className={`border-t ${edge} px-[22px] pt-5 pb-[22px]`}>
        <span className="mb-2 block font-mono text-[10.5px] tracking-[0.14em] text-brass uppercase">
          Plate No. {dish.no}
        </span>
        <h3 className="mb-2 font-serif text-[21px] leading-[1.25] font-[460]">
          {dish.title}
        </h3>
        <p className="m-0 text-[12.5px] leading-normal text-paper-dim">{dish.medium}</p>
      </div>
    </article>
  );
}

function MetaFact({ label, value }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.08em] text-paper-dim uppercase">
      {label}
      <strong className="mt-1.5 block font-sans text-[15px] tracking-normal text-paper normal-case">
        {value}
      </strong>
    </div>
  );
}

function RecipeDetail({ dish, onClose, isOpen }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[880px] border bg-ink-soft ${edgeStrong} transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-y-0 scale-100" : "translate-y-[18px] scale-[0.985]"}`}
      role="dialog"
      aria-modal="true"
    >
      <button
        className={`absolute top-[18px] right-[18px] z-[3] flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border bg-[rgba(23,20,15,0.7)] text-lg leading-none text-paper ${edge} transition-[border-color,transform] duration-200 hover:rotate-90 hover:border-brass`}
        aria-label="Close recipe"
        onClick={onClose}
      >
        &times;
      </button>
      <PlateArt dish={dish} className="aspect-[16/8] overflow-hidden [&_svg]:relative" />
      <div className="p-[clamp(24px,4vw,46px)]">
        <span className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">
          Plate No. {dish.no} — {dish.medium}
        </span>
        <h2 className="my-[10px] mb-3.5 font-serif text-[clamp(28px,4vw,42px)] leading-[1.08] font-normal">
          {dish.title}
        </h2>
        <p className="mb-7 max-w-[62ch] text-[15px] leading-[1.75] text-paper-dim">
          {dish.note}
        </p>
        <div
          className={`mb-[34px] flex flex-wrap gap-[30px] border-y py-4 font-mono text-[10.5px] tracking-[0.1em] text-paper-dim uppercase ${edge}`}
        >
          <MetaFact label="Time" value={dish.time} />
          <MetaFact label="Serves" value={dish.serves} />
          <MetaFact label="Difficulty" value={dish.difficulty} />
        </div>
        <div className="grid grid-cols-1 gap-[clamp(28px,4vw,56px)] min-[620px]:grid-cols-[1fr_1.5fr]">
          <div>
            <h4 className="mb-4 font-mono text-[11px] tracking-[0.14em] text-brass uppercase">
              Ingredients
            </h4>
            <ul className="m-0 list-none p-0">
              {dish.ingredients.map(([name, amt]) => (
                <li
                  key={name}
                  className="flex justify-between gap-3 border-b border-dashed border-[rgba(239,232,220,0.14)] py-2.5 text-sm leading-snug"
                >
                  <span className="text-paper">{name}</span>
                  <span className="font-mono text-[12.5px] whitespace-nowrap text-paper-dim">
                    {amt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[11px] tracking-[0.14em] text-brass uppercase">
              Method
            </h4>
            <ol className="m-0 list-none p-0">
              {dish.steps.map((step, i) => (
                <li
                  key={step}
                  className="relative pb-[22px] pl-10 text-[14.5px] leading-[1.7] text-paper-dim last:pb-0"
                >
                  <span
                    className={`absolute top-[-1px] left-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border font-mono text-[11px] text-brass ${edge}`}
                  >
                    {i + 1}
                  </span>
                  {i < dish.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-[26px] bottom-0 left-[13px] w-px bg-[rgba(176,138,78,0.2)]"
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

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isOpen = selectedIndex !== null;
  const selectedDish = isOpen ? dishes[selectedIndex] : null;

  const closeDetail = useCallback(() => {
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

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:3px_3px] opacity-50"
        aria-hidden="true"
      />

      <nav
        className={`sticky top-0 z-50 flex items-center justify-between py-[22px] ${pxPage} bg-[linear-gradient(180deg,rgba(23,20,15,0.96)_0%,rgba(23,20,15,0.85)_70%,rgba(23,20,15,0)_100%)] backdrop-blur-[6px]`}
      >
        <a
          href="#"
          className="font-serif text-xl font-semibold tracking-[0.02em] [font-optical-sizing:auto]"
        >
          The Table<em className="text-clay italic">.</em>
        </a>
        <a
          href="#gallery"
          className={`rounded-full border px-3.5 py-2 font-mono text-[11px] tracking-[0.12em] text-paper-dim uppercase transition-[border-color,color] duration-200 hover:border-brass hover:text-paper ${edge}`}
        >
          View Catalog
        </a>
      </nav>

      <header className={`relative z-1 mx-auto max-w-[1180px] pt-[clamp(48px,12vh,120px)] pb-[clamp(40px,8vh,90px)] ${pxPage}`}>
        <div className="mb-7 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase before:h-px before:w-[30px] before:bg-brass before:content-['']">
          Exhibition No. 01 — Open Now
        </div>
        <h1 className="mb-7 max-w-[16ch] font-serif text-[clamp(40px,7vw,92px)] leading-[1.02] font-[340] tracking-[-0.01em] [font-optical-sizing:auto]">
          Six dishes,{" "}
          <span className="font-[480] text-clay italic">hung like paintings.</span>
        </h1>
        <p className="mb-10 max-w-[46ch] text-[clamp(15px,1.6vw,18px)] leading-[1.7] text-paper-dim">
          A small collection of everyday cooking, treated with the same attention a gallery gives its walls. Every plate is labelled like a piece — medium, composition, and the recipe behind it — kept clean, minimal, and easy to actually cook from.
        </p>
        <div
          className={`flex flex-wrap gap-10 border-t pt-[22px] font-mono text-[11px] tracking-[0.08em] text-paper-dim uppercase ${edge}`}
        >
          <MetaFact label="Pieces" value="06" />
          <MetaFact label="Medium" value="Seasonal, everyday" />
          <MetaFact label="Curated for" value="Home kitchens" />
        </div>
      </header>

      <main
        className={`relative z-1 mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[clamp(28px,3vw,44px)] pt-5 pb-[140px] ${pxPage}`}
        id="gallery"
        aria-label="Recipe gallery"
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
        className={`fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-[rgba(10,9,6,0.72)] p-4 py-[clamp(16px,4vh,64px)] backdrop-blur-[3px] transition-opacity duration-300 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDetail();
        }}
      >
        {selectedDish && (
          <RecipeDetail dish={selectedDish} onClose={closeDetail} isOpen={isOpen} />
        )}
      </div>

      <footer
        className={`relative z-1 flex flex-wrap items-center justify-between gap-4 border-t py-10 pb-14 font-mono text-[11px] tracking-[0.08em] text-paper-dim uppercase ${edge} ${pxPage}`}
      >
        <span className="font-serif text-base tracking-normal text-paper normal-case">
          The Table.
        </span>
        <span>Every piece cooks in under two hours — no reservation required.</span>
      </footer>
    </>
  );
}
