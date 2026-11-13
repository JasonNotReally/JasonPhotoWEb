# AGENT.md

Instructions for any agent working on this repository: Mingjie Yu's photography website.

- Live site: https://jasonnotreally.github.io/JasonPhotoWEb/
- Repository: https://github.com/JasonNotReally/JasonPhotoWEb
- Owner: Mingjie Yu, also known as Jason. Based in Toronto.

Read this file fully before changing anything. Then read the page you are about to change and `assets/css/styles.css`. Most requests are small adjustments to the existing site, not redesigns. Never propose or build a new design without first looking at what is already there.

## 1. What this site is

A build-free static site: plain HTML, one stylesheet, one script. There is no framework, bundler, package manager, template engine or CSS preprocessor, and none should be added. Every page is a hand-written `index.html` inside its own folder, so URLs are clean (`/work/on-film/`).

```
index.html                     Home
work/index.html                Work index (project cards)
work/<project>/index.html      Eight project galleries
reviews/index.html             Camera and lens review index
reviews/<system>/index.html    One page per camera system (six systems)
reviews/<system>/<item>/       One page per camera or lens
about/index.html               About
commission/index.html          Commission enquiries
assets/css/styles.css          The only stylesheet
assets/js/main.js              The only script
assets/fonts/                  Self-hosted IBM Plex (woff2)
assets/images/<project>/       Photographs, WebP only
assets/images/reviews/...      Review photographs
sitemap.xml, robots.txt        Search engine files
.github/workflows/static.yml   GitHub Pages deployment
image-manager/                 Temporary local tool, never committed (section 8)
```

The eight work projects: `on-film`, `portrait-studies`, `quiet-objects`, `selected-events`, `city-within`, `rocky-mountains`, `natural-studies`, `wildlife`.

## 2. Working rules

1. **Look first.** Open the live site or serve the folder locally and view the page before editing it.
2. **Small, targeted edits.** Change the existing rule or element in place. Do not append override blocks to the end of `styles.css`, and do not add a second stylesheet or script.
3. **Preserve line endings.** Files in the working copy use Windows CRLF line endings. Keep them; do not rewrite a whole file with LF.
4. **Do not retype files from memory or tool output.** Edit in place with exact replacements.
5. **No new dependencies, CDNs, web fonts, analytics or trackers.**
6. **Ask before** committing, pushing, merging, deleting files, or changing anything outside this folder.
7. **Check your work** in a browser at desktop width (about 1440px) and phone width (about 390px) before reporting it as done. Say plainly what you did not check.
8. **Do not leave stray files** in the repository (backups such as `styles-1.css`, patch files, scratch folders). Tell the owner about any you find; do not delete them without asking.

## 3. Git and deployment

- Day-to-day work happens on the `dev` branch.
- Pushing to `main` triggers `.github/workflows/static.yml`, which publishes the whole repository to GitHub Pages. Anything committed is public.
- `.gitignore` excludes `/image-manager/`, `/Website/`, `/Website_source/` and `/REVIEW_STRUCTURE.txt`. Original, full-size photographs must never be committed.
- Preview locally from the repository root: `python -m http.server 8000`, then open `http://localhost:8000/`. Opening the HTML files directly from disk also works because all links are relative.

## 4. Page skeleton

Every page uses the same shell. Copy an existing page of the same type instead of writing one from scratch.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Name — Mingjie Yu</title>
  <meta name="description" content="One or two sentences.">
  <meta property="og:title" content="Page Name — Mingjie Yu">
  <meta property="og:description" content="Short line">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://jasonnotreally.github.io/JasonPhotoWEb/path/">
  <meta property="og:image" content="https://jasonnotreally.github.io/JasonPhotoWEb/assets/images/.../01.webp">
  <link rel="canonical" href="https://jasonnotreally.github.io/JasonPhotoWEb/path/">
  <link rel="icon" href="../../assets/images/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <script>document.documentElement.classList.add("js")</script>
  <script src="../../assets/js/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"> ... brand, menu toggle, nav ... </header>
  <main id="main" class="shell"> ... </main>
  <footer class="site-footer"> ... </footer>
</body>
</html>
```

Rules for the shell:

- **Relative links only** inside the site (`../`, `../../`). The site is served from the `/JasonPhotoWEb/` subpath, so a link starting with `/` breaks. Only `canonical`, `og:url` and `og:image` use the full absolute URL.
- **Header, navigation and footer are identical on every page** apart from the relative path depth and `aria-current="page"` on the current section's nav link. If the navigation changes, change it on every page.
- The inline `<script>` that adds the `js` class must stay in the `<head>`, before `main.js`. Reveal and entrance animations depend on it, and the site stays fully visible without JavaScript.
- Navigation order: Work, Review, About, Commission, then the mail icon link.

## 5. Creating pages

### A new work project gallery

1. Copy an existing `work/<project>/index.html` to `work/<new-slug>/index.html`. Use `selected-events` as the model only when the project is split into chapters.
2. Update `<title>`, description, Open Graph tags, canonical URL, the `<h1 class="project-title">`, the `.lead-copy` text and the gallery's `aria-label`.
3. Put photographs in `assets/images/<new-slug>/` (section 7) and list them in the gallery:

```html
<section class="gallery" data-zoom aria-label="Project Name photographs">
  <figure class="photo-frame" data-reveal><img src="../../assets/images/slug/01.webp" alt="Photograph 01 from Project Name" loading="lazy"></figure>
  <div class="gallery-row"><figure class="photo-frame" data-reveal>...</figure><figure class="photo-frame" data-reveal>...</figure></div>
  <figure class="photo-frame is-portrait" data-reveal>...</figure>
</section>
```

   - A bare `<figure>` is full width. Two figures inside `<div class="gallery-row">` sit side by side on wide screens.
   - Add `is-portrait` to a full-width figure holding a vertical photograph.
   - Keep the wrapper as exactly `class="gallery"` followed by other attributes. The image manager finds galleries by that exact class attribute.
   - Keep `data-zoom` on the gallery wrapper (section 6, gallery zoom).
4. Add a project card to `work/index.html`, and to the home page's "Selected work" grid if it should be featured:

```html
<article class="project-card project-card--portrait" data-reveal><a href="slug/"><div class="cover-frame"><img src="../assets/images/slug/01.webp" alt="Short description"></div><div class="card-copy"><h3>Project Name</h3><p class="meta">Category</p></div></a></article>
```

5. Add the URL to `sitemap.xml`.
6. Update visible counts that mention the number of projects: the "01—08" text on the work index, and "Eight projects" plus the `08` register number on the home page.

### A new review page

- A camera system lives at `reviews/<system>/index.html` with `<body class="review-page theme-<system>">`. Each theme class sets `--review-accent` in `styles.css`; a new system needs a new `.theme-<system>` rule next to the existing ones.
- An item lives at `reviews/<system>/<item>/index.html`. Copy an existing item page from the same system and keep its sections in order: breadcrumbs, `project-lead`, `review-hero` photograph, opening statement, detail photographs, specifications, sample photographs.
- Item photographs go in `assets/images/reviews/<system>/<item>/`.
- Add the item's card to its system page, update the item counts shown on the system page and review index, and add the URL to `sitemap.xml`.
- Unfinished reviews keep the placeholder text and "Review in preparation" status. Do not invent specifications, dates or opinions about equipment; leave "To be documented" until the owner supplies the facts.

### Any other page

Copy `about/index.html` for a simple text page. Add it to the navigation on every page only if the owner asks for a new top-level section.

## 6. Design system

### Art direction

The look is Constructivist and Agitprop poster design: Suprematist geometry (Malevich) and, more strongly, Soviet agitation posters (El Lissitzky). In practice:

- **Three colours carry the design:** paper, ink and one red. Shapes are flat and hard-edged.
- **No soft effects on shapes:** no blur, gradients, glows, drop-shadow haze or pastel tints. The earlier pastel washes were deliberately replaced with flat ink and red.
- **Geometry frames photographs and never covers them.** Photographs are shown upright, uncropped by shapes, with nothing overlapping the image.
- **Borrow the visual language, not specific posters.** Compose original arrangements of wedges, bars, discs and slabs. Do not recreate a historical poster, and do not use mock-Cyrillic lettering.
- **Half the portfolio is colour and half is black and white.** Keep large red shapes away from the edges of colour photographs.

### Tokens (in `:root` of `styles.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#d8cfb8` | Page background |
| `--paper-light` | `#e8dfca` | Mats, light text on red or ink |
| `--ink` | `#171613` | Text, black shapes, rules |
| `--red` | `#c9281c` | The single accent |
| `--olive`, `--blue-grey`, `--ochre`, `--clay` | muted | Review themes and minor details only; not for new home or work page shapes |
| `--max`, `--gutter`, `--header-height` | layout | Page width, side padding, header height |
| `--ease-strike` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrance easing |
| `--ambient-*` | drift | Duration and distance of the slow drift |

Always use the tokens. Do not hard-code these colours elsewhere.

### Type

Self-hosted IBM Plex, loaded with `@font-face` from `assets/fonts/`:

- **IBM Plex Sans** 400 and 600: body text and the large page titles (600, uppercase, tight tracking).
- **IBM Plex Sans Condensed** 600: section headings, card titles, register numbers.
- **IBM Plex Mono** 400: small uppercase labels (`.meta`, `.eyebrow`), buttons, navigation.

Sizes use `clamp()` so they scale with the viewport. Follow the existing scale instead of adding new fixed sizes.

### Contrast

- Ink on paper and paper-light on ink are safe at any size.
- Paper-light on red is acceptable for large text only (the home page name). Do not set small text on red, and do not set ink text on red.
- Red text on paper is for large numerals only.

### Layout and components

- `.shell` centres content at `--max` width with `--gutter` side padding.
- `.section` and `.section-heading` (h2 plus a `.meta` line, with a 4px ink rule and red marker).
- `.project-card` with `.cover-frame` and `.card-copy`; modifiers `--portrait` and `--landscape`. Each card has a flat panel behind it, drawn by `::before`: ink by default and red on every `3n + 2` card.
- `.photo-frame` for any photograph outside a card.
- `.page-lead`, `.project-lead` and `.lead-copy` for page headers.
- `.button`, `.text-link`, `.meta`, `.eyebrow`.
- Decorative shapes are CSS pseudo-elements or empty `aria-hidden="true"` spans. Do not add decorative images.
- Breakpoints: `max-width: 52rem` (single column, menu toggle) and `max-width: 34rem`. When adding or moving a shape, check both, and check that light text never runs off its red or ink backing.

### Motion

All motion is CSS plus the small observer in `main.js`. No animation libraries.

- **Character:** shapes strike in fast and stop hard, using `--ease-strike`. Nothing floats, bounces or loops, except the slow drift below.
- **Photographs only fade.** Never zoom, slide, parallax or tilt a photograph.
- **Home hero entrance, once per load:** the red wedge drives in from the right, the red name slab from the left, the black statement card drops in, then the text appears. It is triggered by the `hero-ready` class that `main.js` adds to `.hero`.
- **Ambient drift:** only the hero ring (`.geometry-disc`) and axis bar (`.geometry-axis`) drift slowly. Do not add drift to other shapes.
- **Scroll reveals:** any element with `data-reveal` fades in when it enters the viewport (`is-visible` is added by `main.js`). On project cards the panel strikes in first and the photograph fades up after it. Section heading rules draw from left to right, then the red marker lands.
- **Hover:** a card's panel shifts slightly from under the photograph, and the red tick beside the title grows.
- **Reduced motion:** the `prefers-reduced-motion` block at the end of `styles.css` disables all of this. Keep it last and keep it working.
- **No JavaScript:** hidden starting states are all scoped under `.js`, so the page is complete without scripts. Any new entrance must follow the same pattern.

### Gallery zoom

Clicking a photograph in a work project gallery opens it full screen on a near-black backdrop. Clicking anywhere, or pressing Escape, Enter or Space, closes it.

- It is enabled only by the `data-zoom` attribute on a gallery wrapper, and only the eight work project galleries have it. Do not add it to review pages, the home page, or the work index unless the owner asks.
- The behaviour lives at the end of `main.js`, and the styles are the `.zoom-view` rules in `styles.css`. Figures need no extra markup; the script makes each `.photo-frame` inside a `data-zoom` gallery focusable and clickable.

### Email links

- The contact address everywhere on the site is `jasonyu20191104@gmail.com`. Do not introduce any other address.
- A `mailto:` link does nothing for visitors without a mail application, so `main.js` also copies the address and shows a toast whenever an email link is clicked. Wherever an email call to action appears, show the address as visible text with a `data-copy-email` copy button beside it, as the commission page does. Do not replace this with a contact form.

## 7. Images

- **Format:** WebP only, longest edge at most 2400px, quality about 82.
- **Names:** always lowercase. Gallery photographs are numbered with two digits (`01.webp`, `02.webp`). Selected Events files are prefixed with the event slug (`tedx-01.webp`).
- **Folders:** `assets/images/<project>/` for work, `assets/images/reviews/<system>/<item>/` for reviews, `assets/images/about/portrait.webp` for the About portrait.
- **Order:** a gallery's sequence is the order of the `<figure>` elements in its HTML, not the file numbers.
- **Covers:** each project card names its cover image directly in `work/index.html` and `index.html`.
- **Alt text:** every `<img>` has descriptive `alt` text. The default pattern for gallery photographs is "Photograph 07 from Project Name"; a real description is better when the owner provides one.
- **Loading:** gallery images use `loading="lazy"`. Hero and cover images do not.
- A missing image shows a placeholder naming the expected path. That is intentional; do not remove it.
- Do not edit, crop, recolour or re-export the owner's photographs unless asked.

## 8. The image manager

`image-manager/` is the owner's temporary local tool for managing photographs, card order and page text. It may or may not be present.

- It is a small local Python server (`server.py`, Python 3.8 or newer, with Pillow) and a browser interface (`ui.html`), started on Windows with `Launch Image Manager.bat`. Its own `README.txt` explains use.
- It converts added images to WebP (2400px, quality 82), gives new gallery photographs the next free lowercase number, rewrites the gallery section of the page's HTML, reorders project cards, and edits page text. Removed images go to `image-manager/_removed/`.
- It is listed in `.gitignore` and must never be committed or pushed. The owner deletes the folder before pushing.
- It is not part of the website. Do not link to it, import from it, or depend on it.
- It finds markup with regular expressions, so keep these exact patterns or the tool stops recognising pages:
  - gallery wrapper: `<section class="gallery" ...>` or `<div class="gallery" ...>`
  - paired row: `<div class="gallery-row">` with nothing else in the tag
  - figure: `<figure class="photo-frame" data-reveal><img src="..." alt="..." loading="lazy"></figure>`, with `is-portrait` added to the class for vertical full-width photographs
- If the site's gallery markup must change, update `server.py` to match in the same piece of work, and tell the owner.

## 9. Standards

- **HTML:** semantic elements, one `<h1>` per page, two-space indentation, double-quoted attributes, `lang="en"`. Each page keeps its skip link, `main#main`, and labelled `nav` and `section` elements.
- **CSS:** one file, plain class selectors in the existing naming style (`block`, `block-part`, `block--modifier`), one declaration per line, tokens for colour. Place new rules beside the related existing ones. Responsive overrides go inside the two existing media queries.
- **JavaScript:** plain modern JavaScript in `main.js`, loaded with `defer`, no dependencies. Every feature must leave the page usable when the script fails or is disabled.
- **Accessibility:** visible focus outlines (the red `:focus-visible` rule), keyboard access for anything clickable, `aria-hidden="true"` on decorative elements, and text contrast as described in section 6.
- **Writing:** Canadian English spelling (colour, grey, centre). Copy is calm, first-person and factual. Do not write or rewrite the owner's descriptive text unless asked, and never invent facts about him, his clients, events or equipment.
- **Search files:** keep `sitemap.xml` in step with the pages that exist, and keep each page's title, description, canonical URL and Open Graph tags accurate.

## 10. Before you finish

- [ ] Viewed the changed pages at about 1440px and about 390px wide
- [ ] No horizontal scrolling on phone width
- [ ] Light text is fully backed by red or ink at every width
- [ ] Reduced-motion and no-JavaScript states still show everything
- [ ] Navigation, footer and relative paths are correct on any new page
- [ ] `sitemap.xml` and visible counts updated if pages were added or removed
- [ ] Image names are lowercase WebP and every image has alt text
- [ ] No stray files left behind, and `image-manager/` is not staged
- [ ] Nothing committed or pushed without the owner's say-so
- [ ] Reported what changed, what was checked, and what was not
