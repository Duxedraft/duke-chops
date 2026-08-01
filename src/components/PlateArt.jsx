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