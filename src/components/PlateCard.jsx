import PlateArt from "./PlateArt";
import { edge } from "../lib/theme";

/**
 * PlateCard
 * One gallery tile: plate image, plate number, title, and medium line.
 * Clicking (or pressing Enter/Space while focused) calls `onOpen(index)`
 * so the parent can open the matching RecipeDetail.
 *
 * @param {object} dish - a dish object from dishes.js
 * @param {number} index - this dish's position in the dishes array
 * @param {(index: number) => void} onOpen - called with `index` on activation
 */
export default function PlateCard({ dish, index, onOpen }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(index);
    }
  };

  return (
    <article
      className={`group relative cursor-pointer overflow-hidden rounded-xs border bg-ink-soft opacity-0 translate-y-6 animate-rise ${edge} transition-[border-color,box-shadow] duration-350 ease-out hover:border-brass hover:shadow-[0_22px_50px_-20px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-4 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
      tabIndex={0}
      role="button"
      aria-label={`Open recipe for ${dish.title}`}
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={() => onOpen(index)}
      onKeyDown={handleKeyDown}
    >
      <PlateArt
        dish={dish}
        className="aspect-4/5 [&_img]:transition-transform [&_img]:duration-600 [&_img]:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[&_img]:scale-[1.035]"
      />
      <div className={`border-t ${edge} px-5.5 pt-5 pb-5.5`}>
        <span className="mb-2 block font-mono text-[10.5px] tracking-[0.14em] text-brass uppercase">
          Plate No. {dish.no}
        </span>
        <h3 className="mb-2 font-serif text-[21px] leading-tight font-[460]">
          {dish.title}
        </h3>
        <p className="m-0 text-[12.5px] leading-normal text-paper-dim">
          {dish.medium}
        </p>
      </div>
    </article>
  );
}
