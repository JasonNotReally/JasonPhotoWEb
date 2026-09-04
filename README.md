# Mingjie Yu Photography

A build-free portfolio for GitHub Pages. The site uses plain HTML, CSS, and a small JavaScript file.

## Before launch

1. Replace every occurrence of `your-email@example.com` with the real enquiry address.
2. Add the About portrait at `assets/images/about/portrait.webp`.
3. Add the prepared WebP photographs using the paths below.
4. Preview locally from the repository root with `python -m http.server 8000`.
5. Push to `main`; the existing Pages workflow publishes the repository.

## Image paths

All photographs should be WebP files with a longest edge of approximately 2400 pixels. The HTML currently expects:

- `assets/images/on-film/01.webp` through `15.webp`
- `assets/images/portrait-studies/01.webp` through `10.webp`
- `assets/images/quiet-objects/01.webp` through `08.webp`
- `assets/images/city-within/01.webp` through `08.webp`
- `assets/images/rocky-mountains/01.webp` through `06.webp`
- `assets/images/natural-studies/01.webp` through `10.webp`
- `assets/images/wildlife/01.webp` through `08.webp`
- `assets/images/about/portrait.webp`

Selected Events expects five photographs for each event:

- `fashion-for-change-01.webp` through `fashion-for-change-05.webp`
- `tedx-01.webp` through `tedx-05.webp`
- `tech-horizons-executive-forum-01.webp` through `tech-horizons-executive-forum-05.webp`
- `quantify-01.webp` through `quantify-05.webp`
- `canadian-engineering-competition-01.webp` through `canadian-engineering-competition-05.webp`

`assets/images/on-film/01.webp` is both the homepage hero and the On Film cover. Every other main project uses `01.webp` as its cover. Selected Events uses `fashion-for-change-01.webp`.

To change a gallery sequence, rename the files or move the corresponding `<figure>` blocks in that project's `index.html`. Add or remove a `gallery-row` wrapper to change whether two photographs appear together on wide screens.
