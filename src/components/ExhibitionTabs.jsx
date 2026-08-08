import { edge } from "../lib/theme";

/**
 * ExhibitionTabs
 * Tab strip for switching between exhibitions. Archived exhibitions get a
 * small "(archived)" label so it's clear they're not the current hang.
 *
 * @param {Array} exhibitions - the full exhibitions list
 * @param {string} activeId - id of the currently viewed exhibition
 * @param {(id: string) => void} onSelect - called with an exhibition's id on click
 */
export default function ExhibitionTabs({ exhibitions, activeId, onSelect }) {
  return (
    <div
      role="tablist"
      aria-label="Exhibitions"
      className={`flex flex-wrap gap-1 border-b ${edge}`}
    >
      {exhibitions.map((exhibition) => {
        const isActive = exhibition.id === activeId;
        return (
          <button
            key={exhibition.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(exhibition.id)}
            className={`relative -mb-px cursor-pointer border-b-2 px-4 py-2.5 font-mono text-[10px] tracking-[0.12em] transition-colors duration-200 ${
              isActive
                ? "border-brass text-hush"
                : "border-transparent text-hush/50 hover:text-hush/70"
            }`}
          >
            {exhibition.volume}
            {exhibition.status === "archived" && (
              <span className="ml-1.5 normal-case text-paper-dim/70"></span>
            )}
          </button>
        );
      })}
    </div>
  );
}
