/* ==========================================================================
   Data + rendering
   Each dish is an abstract "plated" composition rendered in SVG so the
   gallery has no dependency on external photography. Swap `art` for a
   licensed photograph whenever one is ready — see README.
   ========================================================================== */

const dishes = [
  {
    no: "01",
    title: "Heirloom Tomato & Basil Tart",
    medium: "Heirloom tomato, olive oil, thyme, shortcrust",
    note: "A study in concentric colour — the tomato is sliced thin enough to read as pigment rather than produce, arranged like a colour wheel across a blind-baked shell.",
    time: "1 hr 20 min",
    serves: "6",
    difficulty: "Easy",
    ingredients: [
      ["Shortcrust pastry, blind-baked", "1 (9in) shell"],
      ["Heirloom tomatoes, mixed colours", "700 g"],
      ["Fresh ricotta", "200 g"],
      ["Dijon mustard", "1 tbsp"],
      ["Olive oil", "3 tbsp"],
      ["Fresh thyme", "6 sprigs"],
      ["Flaky sea salt", "to taste"],
      ["Cracked black pepper", "to taste"],
    ],
    steps: [
      "Slice tomatoes into rounds, lay on paper towel and salt lightly. Let sit 20 minutes to draw out excess liquid.",
      "Blind-bake the shortcrust shell until golden. Let it cool fully before filling.",
      "Whisk ricotta with the mustard and a pinch of salt. Spread in an even layer across the base of the cooled shell.",
      "Pat the tomato slices dry, then layer them over the ricotta in loose concentric rings, alternating colours.",
      "Scatter thyme leaves over the top, drizzle with olive oil, and finish with flaky salt and pepper just before serving.",
    ],
    palette: { a: "#a15c3e", b: "#5b6146", c: "#e8d9b8" },
    art: (p) => svgTart(p),
  },
  {
    no: "02",
    title: "Charred Octopus, Lemon & Smoked Paprika",
    medium: "Octopus, lemon, smoked paprika, olive oil",
    note: "The char is the point, not the flaw — a hard sear against a slow braise gives a surface like scorched paper wrapped around something tender underneath.",
    time: "2 hr 30 min",
    serves: "4",
    difficulty: "Intermediate",
    ingredients: [
      ["Octopus, cleaned", "1.2 kg"],
      ["Bay leaves", "2"],
      ["Garlic cloves, smashed", "4"],
      ["Olive oil", "4 tbsp"],
      ["Smoked paprika", "1 tsp"],
      ["Lemon", "1, juiced and zested"],
      ["Flaky sea salt", "to taste"],
      ["Fresh parsley, chopped", "2 tbsp"],
    ],
    steps: [
      "Simmer the octopus gently with bay leaves and garlic for about 90 minutes, until a knife slides into the thickest part with no resistance.",
      "Cool the octopus in its liquid, then drain well and pat completely dry — this is what allows a proper char later.",
      "Cut into large pieces and toss with 2 tbsp olive oil and the smoked paprika.",
      "Sear hard in a very hot pan or on a grill, 2–3 minutes a side, until deeply charred at the edges.",
      "Rest briefly, then finish with lemon juice and zest, remaining olive oil, parsley, and flaky salt.",
    ],
    palette: { a: "#7a3b32", b: "#b08a4e", c: "#20180f" },
    art: (p) => svgOctopus(p),
  },
  {
    no: "03",
    title: "Brown Butter Sage Pappardelle",
    medium: "Pappardelle, brown butter, sage, parmesan",
    note: "Butter pushed just past caution — nutty, dark gold, and poured over ribbons wide enough to actually hold it.",
    time: "35 min",
    serves: "4",
    difficulty: "Easy",
    ingredients: [
      ["Fresh pappardelle", "450 g"],
      ["Unsalted butter", "115 g"],
      ["Fresh sage leaves", "14"],
      ["Parmesan, grated", "60 g"],
      ["Lemon zest", "1 tsp"],
      ["Flaky sea salt", "to taste"],
    ],
    steps: [
      "Bring a large pot of well-salted water to a boil and cook the pappardelle until just shy of al dente.",
      "Melt the butter in a wide pale-coloured pan over medium heat. Add the sage leaves once it begins to foam.",
      "Swirl the pan constantly as the butter turns from gold to a deep amber and smells nutty — pull it from the heat right as the milk solids brown, not blacken.",
      "Toss the drained pasta directly into the brown butter with a splash of pasta water to loosen the sauce.",
      "Plate with the crisped sage on top, a generous grating of parmesan, lemon zest, and flaky salt.",
    ],
    palette: { a: "#b08a4e", b: "#5b6146", c: "#e8d9b8" },
    art: (p) => svgPasta(p),
  },
  {
    no: "04",
    title: "Roasted Stone Fruit, Honey & Thyme",
    medium: "Stone fruit, honey, thyme, crème fraîche",
    note: "Heat concentrates what raw fruit only implies — the sugars caramelise at the cut edge while the centre stays loose and warm.",
    time: "30 min",
    serves: "4",
    difficulty: "Easy",
    ingredients: [
      ["Peaches or plums, halved and pitted", "6"],
      ["Honey", "3 tbsp"],
      ["Fresh thyme", "4 sprigs"],
      ["Unsalted butter, small pieces", "2 tbsp"],
      ["Crème fraîche", "150 g"],
      ["Flaky sea salt", "a pinch"],
    ],
    steps: [
      "Heat the oven to 200°C (400°F). Arrange the fruit halves cut-side up in a baking dish.",
      "Drizzle with honey, scatter the thyme sprigs, and dot with butter.",
      "Roast 18–22 minutes, until the fruit is tender and the cut edges have caramelised.",
      "Let cool for 5 minutes — the residual heat finishes the centre without turning it to mush.",
      "Serve warm with a spoonful of crème fraîche and a pinch of flaky salt to cut the sweetness.",
    ],
    palette: { a: "#c98a5b", b: "#a15c3e", c: "#e8c9a8" },
    art: (p) => svgStoneFruit(p),
  },
  {
    no: "05",
    title: "Dark Chocolate & Olive Oil Torte",
    medium: "Dark chocolate, olive oil, espresso, sea salt",
    note: "No flour, no apology — a torte that stays dense and glossy because there is nothing in it to lighten it.",
    time: "1 hr, plus chilling",
    serves: "8",
    difficulty: "Intermediate",
    ingredients: [
      ["Dark chocolate (70%), chopped", "250 g"],
      ["Extra virgin olive oil", "120 ml"],
      ["Eggs", "4"],
      ["Sugar", "100 g"],
      ["Espresso, cooled", "2 tbsp"],
      ["Flaky sea salt", "to finish"],
    ],
    steps: [
      "Heat the oven to 160°C (325°F) and line an 8in round tin.",
      "Melt the chocolate and olive oil together gently, either over a double boiler or in short bursts in the microwave.",
      "Whisk the eggs and sugar until pale and roughly doubled in volume, about 4 minutes.",
      "Fold the melted chocolate and the espresso into the eggs in three additions, keeping as much air in the batter as you can.",
      "Bake 24–28 minutes, until the edges are set but the centre still holds a slight wobble. Cool fully, then chill at least 2 hours before slicing. Finish with flaky salt.",
    ],
    palette: { a: "#2a1a12", b: "#b08a4e", c: "#7a3b32" },
    art: (p) => svgTorte(p),
  },
  {
    no: "06",
    title: "Herb-Crusted Lamb, Charred Leeks",
    medium: "Lamb rack, herb crust, charred leek",
    note: "A green crust holds the roast at the exact moment it leaves the oven, while the leeks are pushed toward collapse and blackened at the tips on purpose.",
    time: "1 hr 10 min",
    serves: "4",
    difficulty: "Intermediate",
    ingredients: [
      ["Lamb rack, frenched", "1 (8-bone)"],
      ["Fresh parsley, rosemary, thyme", "1 cup, mixed"],
      ["Garlic cloves", "3"],
      ["Dijon mustard", "2 tbsp"],
      ["Breadcrumbs", "60 g"],
      ["Olive oil", "3 tbsp"],
      ["Leeks, halved lengthwise", "4"],
      ["Flaky sea salt", "to taste"],
    ],
    steps: [
      "Heat the oven to 200°C (400°F). Season the lamb rack well and sear all sides in a hot pan until browned.",
      "Pulse the herbs, garlic, and breadcrumbs with 2 tbsp olive oil into a coarse paste.",
      "Brush the seared lamb with mustard, then press the herb mixture firmly over the fat side.",
      "Char the halved leeks cut-side down in a hot dry pan until well blackened at the edges, about 5 minutes.",
      "Roast the lamb 18–22 minutes for medium-rare, then rest 10 minutes before slicing between the bones. Serve over the charred leeks.",
    ],
    palette: { a: "#5b6146", b: "#7a3b32", c: "#2a1a12" },
    art: (p) => svgLamb(p),
  },
];

/* --------------------------------------------------------------------------
   Abstract plate compositions — one per dish, built from primitives so the
   gallery never depends on external image hosting.
   -------------------------------------------------------------------------- */
function svgWrap(inner, bg) {
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="500" fill="${bg}"/>
    ${inner}
  </svg>`;
}

function svgTart(p) {
  const rings = [180, 155, 128, 100, 70, 40].map((r, i) => {
    const fill = i % 2 === 0 ? p.a : "#c9522f";
    return `<circle cx="200" cy="250" r="${r}" fill="none" stroke="${fill}" stroke-width="13" opacity="${0.9 - i * 0.06}"/>`;
  }).join("");
  const leaves = Array.from({ length: 7 }).map((_, i) => {
    const angle = (i / 7) * Math.PI * 2;
    const x = 200 + Math.cos(angle) * 165;
    const y = 250 + Math.sin(angle) * 165;
    return `<ellipse cx="${x}" cy="${y}" rx="9" ry="16" fill="${p.b}" transform="rotate(${(angle * 180) / Math.PI + 40} ${x} ${y})" opacity="0.85"/>`;
  }).join("");
  return svgWrap(`
    <circle cx="200" cy="250" r="205" fill="${p.c}"/>
    ${rings}
    <circle cx="200" cy="250" r="14" fill="${p.b}"/>
    ${leaves}
  `, "#141010");
}

function svgOctopus(p) {
  const tentacles = Array.from({ length: 5 }).map((_, i) => {
    const baseAngle = -90 + (i - 2) * 26;
    const x1 = 200, y1 = 260;
    const x2 = 200 + Math.cos((baseAngle * Math.PI) / 180) * 150;
    const y2 = 260 + Math.sin((baseAngle * Math.PI) / 180) * 150;
    const midx = 200 + Math.cos((baseAngle * Math.PI) / 180) * 80 + (i - 2) * 14;
    const midy = 250 + Math.sin((baseAngle * Math.PI) / 180) * 80;
    return `<path d="M ${x1} ${y1} Q ${midx} ${midy} ${x2} ${y2}" stroke="${p.a}" stroke-width="${26 - i * 2}" fill="none" stroke-linecap="round" opacity="0.92"/>`;
  }).join("");
  return svgWrap(`
    <circle cx="200" cy="250" r="200" fill="${p.c}"/>
    <circle cx="200" cy="250" r="150" fill="none" stroke="#3a2a1c" stroke-width="1" opacity="0.4"/>
    ${tentacles}
    <circle cx="200" cy="255" r="40" fill="${p.a}" opacity="0.95"/>
    <circle cx="320" cy="130" r="26" fill="${p.b}" opacity="0.9"/>
    <circle cx="320" cy="130" r="26" fill="none" stroke="#fff8e8" stroke-width="1" opacity="0.15"/>
  `, "#141010");
}

function svgPasta(p) {
  const ribbons = Array.from({ length: 6 }).map((_, i) => {
    const y = 130 + i * 45;
    const amp = 24 + (i % 3) * 8;
    return `<path d="M 40 ${y} Q 140 ${y - amp} 200 ${y} T 360 ${y}" stroke="${i % 2 === 0 ? p.a : "#c9a668"}" stroke-width="17" fill="none" stroke-linecap="round" opacity="0.9"/>`;
  }).join("");
  const sage = Array.from({ length: 4 }).map((_, i) => {
    const x = 90 + i * 70;
    const y = 90 + (i % 2) * 30;
    return `<ellipse cx="${x}" cy="${y}" rx="12" ry="20" fill="${p.b}" transform="rotate(${20 + i * 15} ${x} ${y})" opacity="0.85"/>`;
  }).join("");
  return svgWrap(`
    <circle cx="200" cy="250" r="205" fill="${p.c}"/>
    ${ribbons}
    ${sage}
  `, "#141010");
}

function svgStoneFruit(p) {
  const fruits = [
    { x: 150, y: 210, r: 78 },
    { x: 270, y: 300, r: 66 },
    { x: 180, y: 350, r: 54 },
  ];
  const halves = fruits.map((f, i) => `
    <circle cx="${f.x}" cy="${f.y}" r="${f.r}" fill="${i % 2 === 0 ? p.a : p.b}" opacity="0.95"/>
    <circle cx="${f.x}" cy="${f.y}" r="${f.r * 0.42}" fill="${p.c}" opacity="0.9"/>
    <circle cx="${f.x}" cy="${f.y}" r="${f.r * 0.1}" fill="${p.b}"/>
  `).join("");
  const drizzle = `<path d="M 60 120 Q 150 90 240 130 T 360 110" stroke="#e8b860" stroke-width="4" fill="none" opacity="0.55" stroke-linecap="round"/>`;
  return svgWrap(`
    <circle cx="200" cy="250" r="205" fill="#3a2417"/>
    ${halves}
    ${drizzle}
  `, "#141010");
}

function svgTorte(p) {
  return svgWrap(`
    <circle cx="200" cy="250" r="205" fill="${p.a}"/>
    <circle cx="200" cy="250" r="150" fill="#1c110a" opacity="0.9"/>
    <circle cx="200" cy="250" r="150" fill="none" stroke="${p.b}" stroke-width="2" opacity="0.5"/>
    <path d="M 90 200 A 150 150 0 0 1 310 200" stroke="#fff8e8" stroke-width="3" fill="none" opacity="0.08"/>
    <circle cx="235" cy="180" r="8" fill="${p.c}"/>
    <circle cx="252" cy="196" r="6" fill="${p.c}"/>
    <rect x="120" y="330" width="20" height="4" fill="${p.b}" opacity="0.6"/>
  `, "#0d0906");
}

function svgLamb(p) {
  const bones = Array.from({ length: 5 }).map((_, i) => {
    const x = 130 + i * 35;
    return `<rect x="${x}" y="120" width="10" height="70" rx="4" fill="#e8ddc8" opacity="0.9"/>
      <circle cx="${x + 5}" cy="115" r="9" fill="#e8ddc8" opacity="0.85"/>`;
  }).join("");
  return svgWrap(`
    <circle cx="200" cy="250" r="205" fill="${p.c}"/>
    <ellipse cx="200" cy="230" rx="150" ry="80" fill="${p.a}" opacity="0.95"/>
    ${bones}
    <ellipse cx="140" cy="360" rx="60" ry="22" fill="${p.b}" opacity="0.9"/>
    <ellipse cx="255" cy="370" rx="55" ry="20" fill="#2a1a12" opacity="0.9"/>
    <ellipse cx="255" cy="370" rx="55" ry="20" fill="none" stroke="#111" stroke-width="3" opacity="0.4"/>
  `, "#141010");
}

/* --------------------------------------------------------------------------
   Render
   -------------------------------------------------------------------------- */
const galleryEl = document.getElementById("gallery");
const veilEl = document.getElementById("veil");
const detailEl = document.getElementById("detail");

function renderGallery() {
  galleryEl.innerHTML = dishes.map((d, i) => `
    <article class="plate" tabindex="0" role="button" aria-label="Open recipe for ${d.title}" data-index="${i}" style="animation-delay:${i * 70}ms">
      <div class="frame">${d.art(d.palette)}</div>
      <div class="plaque">
        <span class="plate-no">Plate No. ${d.no}</span>
        <h3>${d.title}</h3>
        <p class="medium">${d.medium}</p>
      </div>
    </article>
  `).join("");

  galleryEl.querySelectorAll(".plate").forEach((el) => {
    el.addEventListener("click", () => openDetail(Number(el.dataset.index)));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDetail(Number(el.dataset.index));
      }
    });
  });
}

function openDetail(index) {
  const d = dishes[index];
  detailEl.innerHTML = `
    <button class="detail-close" aria-label="Close recipe">&times;</button>
    <div class="detail-art">${d.art(d.palette)}</div>
    <div class="detail-body">
      <span class="plate-no">Plate No. ${d.no} — ${d.medium}</span>
      <h2>${d.title}</h2>
      <p class="note">${d.note}</p>
      <div class="detail-facts">
        <div><span>Time</span><strong>${d.time}</strong></div>
        <div><span>Serves</span><strong>${d.serves}</strong></div>
        <div><span>Difficulty</span><strong>${d.difficulty}</strong></div>
      </div>
      <div class="detail-columns">
        <div>
          <h4>Ingredients</h4>
          <ul class="ingredients">
            ${d.ingredients.map(([name, amt]) => `<li><span>${name}</span><span>${amt}</span></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4>Method</h4>
          <ol class="steps">
            ${d.steps.map((s) => `<li>${s}</li>`).join("")}
          </ol>
        </div>
      </div>
    </div>
  `;
  detailEl.querySelector(".detail-close").addEventListener("click", closeDetail);
  veilEl.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  veilEl.classList.remove("open");
  document.body.style.overflow = "";
}

veilEl.addEventListener("click", (e) => {
  if (e.target === veilEl) closeDetail();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDetail();
});

renderGallery();
