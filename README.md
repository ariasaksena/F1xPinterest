# FORMULA PLANNER — Product Interface (MVP)

A mock official-race-account trip-planning site for the **F1 Las Vegas GP**, in the style of
ShopMy: a profile, a set of shoppable **guides**, and product links that click out to real
retail/booking pages.

This is the **Product Interface** page of the larger project. The Dashboard and About pages are
stubbed and ready to build next.

## Run it locally

You need [Node.js](https://nodejs.org) (v18+). Then:

```bash
npm install      # first time only
npm run dev      # start the dev server
```

Open the URL it prints (usually http://localhost:5173).

## Build for deploy

```bash
npm run build    # outputs a static site to /dist
```

Drag the `dist` folder onto Netlify or Vercel to put it online.

## Where things live

- `src/data.js` — all guide + product content (names, prices, links, images). Edit here to change items.
- `src/assets/` — the images (already sized uniformly).
- `src/components/` — NavBar, ProfileHeader, GuideIndex, Footer.
- `src/pages/` — Product (home), GuidePage (a guide's items), Dashboard + About (stubs).
- `src/index.css` — the whole design system (colors, type, layout). Brand color is `--oxblood: #7A1818`.

## Notes

- Prices: merch is live ($175 / $182 / $55). Hotel + hospitality show "View rates" since those
  vary by date — swap in fixed figures in `data.js` anytime.
- MVP scope: browse guides + shop the links. No account creation or guide editing (that's for the
  race accounts, not this mockup).
