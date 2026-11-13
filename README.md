# Mingjie Yu Photography

A build-free photography portfolio for GitHub Pages: plain HTML, one stylesheet and one small JavaScript file.

- Live site: https://jasonnotreally.github.io/JasonPhotoWEb/
- Detailed working rules, design system and page recipes: see `AGENT.md`

## Pages

- `index.html`: home
- `work/`: work index and eight project galleries (`on-film`, `portrait-studies`, `quiet-objects`, `selected-events`, `city-within`, `rocky-mountains`, `natural-studies`, `wildlife`)
- `reviews/`: camera and lens reviews, grouped into six systems (`canon-fd`, `contax-n`, `contax-rf`, `ltm-m39`, `medium-format`, `pentax-k`)
- `about/` and `commission/`

Shared files live in `assets/`: `css/styles.css`, `js/main.js`, self-hosted IBM Plex fonts in `fonts/`, and photographs in `images/`.

## Preview locally

From the repository root:

```
python -m http.server 8000
```

Then open http://localhost:8000/.

## Publish

Work on the `dev` branch. Pushing to `main` runs `.github/workflows/static.yml`, which publishes the whole repository to GitHub Pages, so everything committed is public.

## Images

- WebP only, longest edge at most 2400 pixels, lowercase file names.
- Work photographs go in `assets/images/<project>/`, numbered `01.webp`, `02.webp` and so on. Selected Events files are prefixed with the event name, for example `tedx-01.webp`.
- Review photographs go in `assets/images/reviews/<system>/<item>/`.
- The About portrait is `assets/images/about/portrait.webp`.
- A gallery's sequence is the order of the `<figure>` blocks in that project's `index.html`, not the file numbers. Wrap two figures in a `gallery-row` to show them side by side on wide screens.
- Each project card names its cover image directly in `work/index.html` and `index.html`.

## Image manager

`image-manager/` is a temporary local tool for adding, replacing, removing and reordering photographs, reordering project cards and editing page text. Put the folder in the repository root, double-click `Launch Image Manager.bat`, make the changes, press Apply, then delete the folder before pushing. It is listed in `.gitignore` and is never published. Its own `README.txt` has the full instructions.

## Features worth knowing

- Clicking a photograph in a work gallery opens it full screen; clicking anywhere closes it. This is switched on by the `data-zoom` attribute on a gallery.
- Email links also copy the address and show a confirmation, for visitors without a mail application.
- All animation is switched off for visitors who ask their device for reduced motion, and every page works without JavaScript.
