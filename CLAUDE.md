# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static GitHub Pages website for **OxfordXML**, a cross-disciplinary machine learning research cluster based at Wolfson College, University of Oxford. The entire site is a single `index.html` file with no build pipeline — changes are made directly to HTML/CSS and deployed via git push.

## Developing locally

Open `index.html` directly in a browser. No server is required for most changes, but parallax effects need a served environment. Prepros (`prepros-6.config`) was historically used for SCSS compilation and live reload, but the compiled CSS files in `styles/` are what the page actually loads — edit those directly.

To serve locally with live reload, any static server works:
```
npx serve .
# or
python -m http.server
```

Cache-busting query strings on CSS/JS links (e.g. `?v=1.9`) must be incremented manually when deploying changes.

## Architecture

Everything lives in `index.html`. The page sections in order:
1. **Header + mobile menu** — sticky on scroll via `custom.js`
2. **Home** — hero with parallax background
3. **Quote + Mission** — static content
4. **Upcoming event** — manually updated for each new event
5. **Past events** — year-bucketed lists (`#year2025`, `#year2024`, etc.) toggled by `.year-toggle` buttons
6. **About** — committee bios
7. **Footer / Contact**

### CSS

- `styles/main_styles.css` — all custom styles, organized with a table of contents at the top
- `styles/responsive.css` — breakpoint overrides
- Third-party CSS in `plugins/` and `styles/bootstrap4/` — do not edit

### JavaScript

Only `js/events.js` is loaded by the page (bottom of `index.html`). It handles:
- Sticky header on scroll
- Hamburger mobile menu open/close
- Year-toggle accordion for past events (`toggleSection()`)
- Navbar active-link highlighting

`js/custom.js` and `js/main.js` are present in the repo but **not loaded** — they are unused template remnants.

## Common content updates

### Adding a new upcoming event

Two HTML patterns exist in `index.html` around line 174–284:
- **Standard talk** (single speaker, smaller image): `col-lg-4` image + `col-lg-8` content, uses `.upcoming_image`
- **Debate/workshop with poster**: `col-lg-5` image + `col-lg-7` content, uses `.upcoming_image_debaters` and a click-to-enlarge anchor wrapper with class `poster_link`

The previous upcoming event is typically commented out in-place rather than deleted, so it can serve as a reference for the next one.

### Moving an event to past events

Past events are grouped under `<div id="yearXXXX" class="events-container">` blocks. Each `.events_item` follows this structure:
```html
<div class="events_item">
  <div class="events_item_content d-flex flex-row align-items-start justfy-content-start">
    <div class="event_date">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <div class="event_day">DAY</div>
        <div class="event_month">Mon YYYY</div>
      </div>
    </div>
    <div class="event_content">
      <div class="event_title">TITLE</div>
      Speaker Name<br/>
      <ul class="event_row">
        <li><div class="event_icon"><img src="images/calendar.png" alt="Wolfson College"></div><span>TIME</span></li>
        <li><div class="event_icon"><img src="images/location.png" alt="Wolfson College"></div><span>LOCATION</span></li>
      </ul>
    </div>
  </div>
</div>
```

When the number of items in a year group is odd, a blank spacer `.events_item` (with empty title and no date) must be added at the end to maintain the flex grid alignment.

### Adding a new year to past events

1. Add a `<button class="year-toggle" data-year="yearXXXX">XXXX</button>` to the `.year-buttons` div (~line 304)
2. Add a corresponding `<div id="yearXXXX" class="events-container">` block with the events inside
