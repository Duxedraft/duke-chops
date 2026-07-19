/**
 * PlateArt
 * Renders a dish's image inside a bordered "frame" div. Used both as the
 * thumbnail on gallery cards and as the header image in the recipe detail
 * view — pass a `className` to control aspect ratio / hover behavior per
 * use case.
 *
 * @param {object} dish - a dish object from dishes.js (needs `image`, `title`)
 * @param {string} [className] - extra classes applied to the wrapping frame
 */
export default function PlateArt({ dish, className = "" }) {
  return (
    <div
      className={`relative block overflow-hidden bg-hush after:absolute after:inset-0 after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] after:content-[''] ${className}`}
    >
      <img
        src={dish.image}
        alt={dish.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}