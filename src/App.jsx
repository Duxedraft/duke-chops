import { useCallback, useEffect, useState } from "react";
import { dishes } from "./dishes";
import "./styles.css";

function PlateArt({ dish }) {
  return (
    <div
      className="frame"
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
      className="plate"
      tabIndex={0}
      role="button"
      aria-label={`Open recipe for ${dish.title}`}
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={() => onOpen(index)}
      onKeyDown={handleKeyDown}
    >
      <PlateArt dish={dish} />
      <div className="plaque">
        <span className="plate-no">Plate No. {dish.no}</span>
        <h3>{dish.title}</h3>
        <p className="medium">{dish.medium}</p>
      </div>
    </article>
  );
}

function RecipeDetail({ dish, onClose }) {
  return (
    <div className="detail" role="dialog" aria-modal="true">
      <button className="detail-close" aria-label="Close recipe" onClick={onClose}>
        &times;
      </button>
      <div
        className="detail-art"
        dangerouslySetInnerHTML={{ __html: dish.art(dish.palette) }}
      />
      <div className="detail-body">
        <span className="plate-no">
          Plate No. {dish.no} — {dish.medium}
        </span>
        <h2>{dish.title}</h2>
        <p className="note">{dish.note}</p>
        <div className="detail-facts">
          <div>
            <span>Time</span>
            <strong>{dish.time}</strong>
          </div>
          <div>
            <span>Serves</span>
            <strong>{dish.serves}</strong>
          </div>
          <div>
            <span>Difficulty</span>
            <strong>{dish.difficulty}</strong>
          </div>
        </div>
        <div className="detail-columns">
          <div>
            <h4>Ingredients</h4>
            <ul className="ingredients">
              {dish.ingredients.map(([name, amt]) => (
                <li key={name}>
                  <span>{name}</span>
                  <span>{amt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Method</h4>
            <ol className="steps">
              {dish.steps.map((step) => (
                <li key={step}>{step}</li>
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
      <div className="wall-texture" aria-hidden="true" />

      <nav className="site-nav">
        <a href="#" className="mark">
          The Table<em>.</em>
        </a>
        <a href="#gallery" className="catalog-link">
          View Catalog
        </a>
      </nav>

      <header className="hero">
        <div className="eyebrow">Exhibition No. 01 — Open Now</div>
        <h1>
          Six dishes, <span className="accent">hung like paintings.</span>
        </h1>
        <p className="sub">
          A small collection of everyday cooking, treated with the same attention a gallery gives its walls. Every plate is labelled like a piece — medium, composition, and the recipe behind it — kept clean, minimal, and easy to actually cook from.
        </p>
        <div className="meta-row">
          <div>
            Pieces<strong>06</strong>
          </div>
          <div>
            Medium<strong>Seasonal, everyday</strong>
          </div>
          <div>
            Curated for<strong>Home kitchens</strong>
          </div>
        </div>
      </header>

      <main className="gallery" id="gallery" aria-label="Recipe gallery">
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
        className={`veil${isOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDetail();
        }}
      >
        {selectedDish && <RecipeDetail dish={selectedDish} onClose={closeDetail} />}
      </div>

      <footer className="site-footer">
        <span className="mark">The Table.</span>
        <span>Every piece cooks in under two hours — no reservation required.</span>
      </footer>
    </>
  );
}
