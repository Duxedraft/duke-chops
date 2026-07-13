# The Table — an exhibition of everyday cooking

A small, static food website that treats each dish like a piece hung in a
gallery: a full-bleed "plate," a brass museum plaque with a plate number and
medium, and a recipe label that opens on click — clean, minimal, and meant
to actually cook from.

**[Open `index.html` in a browser — no build step required.]**

## Structure

```
food-gallery/
├── index.html      # markup: nav, hero, gallery mount point, detail dialog
├── styles.css      # design tokens + all styling (see :root for the palette)
├── script.js       # dish data + rendering/interaction logic
└── README.md
```

## How it works

- `script.js` holds a `dishes` array — one object per plate, with its title,
  curatorial note, timing, ingredients, and method.
- Each dish renders as an **abstract SVG composition** instead of a stock
  photo, so the site has zero external image dependencies and nothing to
  license. The shapes are generated from a small palette per dish
  (`palette: { a, b, c }`), so the whole gallery stays tonally consistent.
- Clicking (or pressing Enter/Space on) a plate opens the recipe as a full
  label: ingredients on the left, numbered method on the right.

## Adding a new piece

Append an object to the `dishes` array in `script.js`:

```js
{
  no: "07",
  title: "Your Dish Name",
  medium: "Three or four key ingredients",
  note: "One curatorial sentence — what makes this dish worth framing.",
  time: "40 min",
  serves: "4",
  difficulty: "Easy",
  ingredients: [["Ingredient", "Amount"], ...],
  steps: ["Step one.", "Step two.", ...],
  palette: { a: "#hex", b: "#hex", c: "#hex" },
  art: (p) => svgTart(p), // reuse an existing composition, or write a new svg___() function
}
```

## Swapping in real photography

The SVG art is a deliberate placeholder — copyright-safe and dependency-free
for a first version. To use real photography instead, replace the `<div
class="frame">` content in `script.js`'s `renderGallery()` (and the matching
spot in `openDetail()`) with an `<img>` tag pointing at a licensed photo, and
drop the images into an `/images` folder. The plaque and detail-label layout
will work unchanged either way.

## Design notes

- **Palette:** ink (`#17140f`), paper (`#efe8dc`), brass (`#b08a4e`), clay
  (`#a15c3e`), moss (`#5b6146`) — a dim gallery wall with a warm brass
  hairline, rather than a bright kitchen palette.
- **Type:** Fraunces (display serif, used sparingly for titles), Inter
  (body), IBM Plex Mono (plate numbers, labels, facts — the "museum
  signage" voice).
- **Signature element:** the brass plaque under each piece, which doubles as
  the entry point into the recipe.

## Browser support

Plain HTML/CSS/JS, no build tooling or framework. Works in any modern
evergreen browser. Respects `prefers-reduced-motion`.
