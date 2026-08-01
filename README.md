# F1xPinterest
# Paddock to Pinterest

**An interactive executive product review exploring an unclaimed opportunity: F1 race travel on Pinterest.**

> Built as a summer internship project. This is a proof-of-concept, not a real product — the goal is to make a clear, honest argument and let anyone poke holes in it.

🔗 **Live site:** _coming soon_

---

## What this is

Right now, no Formula One team or driver has an official presence on Pinterest — but Pinterest's audience (mostly women, high purchase intent, planning trips and purchases rather than just scrolling) closely matches F1's fastest-growing group of fans since *Drive to Survive*.

This project asks what happens if you take that overlap seriously. Instead of a slide deck, it's a scrollable React site that walks through one argument from start to finish: **F1 race travel is a real, unclaimed Pinterest opportunity — and here's what would have to be true for it to be worth pursuing.**

Think of it less as a website and more as an interactive product review — the kind of thing you'd walk a decision-maker through.

## The core idea

Most people would assume the opportunity here is team merchandise. It isn't — a hoodie is a $75, two-minute decision. The real prize is **travel**. Every Grand Prix happens in a major city, and attending a race isn't one purchase; it's flights, a hotel, tickets, restaurants, and a whole itinerary planned over weeks. That's exactly the kind of thing people already use Pinterest for.

It also solves the hardest problem with a merch angle: you can't reliably prove a pin caused a hoodie sale. But travel bookings run through trackable links, so the value is measurable in a way merch never is.

The proposed owner isn't a team — it's the **race promoter and the city tourism board**, who actually benefit from filling hotels and selling tickets.

## What's inside

The site is one continuous narrative, roughly a section each:

1. **The gap** — no F1 presence on Pinterest, despite the demographic overlap.
2. **The counterfactual** — what the F1 system quietly loses by not being there.
3. **Why travel, not merch** — the pivot, and why it fixes the measurement problem.
4. **The evidence** — search-interest data showing demand spikes before races that no official account captures.
5. **The product** — a mock official race account (e.g. LasVegasGP) with boards, pins, and a working shoppable flow.
6. **The business case** — an interactive model you can adjust to see the range of outcomes.
7. **The recommendation** — who should own it, what a pilot looks like, and an honest verdict.

## Key interactive pieces

The parts that make this a React project and not a static page:

- **A live decision model** — drag the assumptions (audience reach, conversion, etc.) and watch the revenue and break-even point move. The point isn't to claim one magic number; it's to let you challenge the assumptions yourself.
- **A clickable board mockup** — click into a board and trigger the shoppable-pin flow, so you feel the fan experience instead of seeing a screenshot.
- **An explorable demand chart** — hover a race to see how travel searches spike in the weeks before it.

## About the model

The business case behind the site is a season-long model that tracks two connected revenue streams — community engagement building an audience, and that audience converting into travel bookings — across a full F1 calendar. It outputs a conservative / base / optimistic range rather than a single figure.

**A note on the numbers:** the trip-value figures (hotel rates, ticket prices, stay length) come from real race economic-impact data. The conversion *rates* are informed estimates in industry-typical ranges, deliberately left visible and adjustable. This is on purpose — the goal isn't a "right" answer, it's a model where someone can see the thinking and challenge every assumption. Treat the shape of the findings as trustworthy and the exact figures as debatable.

<!-- TODO: link the sheet if you want it public -->
The full assumption model lives in a separate Google Sheet.

## Data & methodology

Demand data comes from **Google Trends** and **Pinterest Trends**, collected manually (exported as CSVs) for a fixed set of F1-travel search terms, then mapped against the race calendar. Trends data is a *relative* interest index (0–100), not raw search counts — so the analysis reads the shape and timing of demand, not absolute volume.

## Tech stack

<!-- TODO: adjust to match what you actually used -->
- **React** (Vite)
- Charting: _e.g. Recharts / D3_
- Styling: _e.g. Tailwind / CSS Modules_

## Running locally

```bash
# clone the repo
git clone <repo-url>
cd paddock-to-pinterest

# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build
```

<!-- TODO: adjust commands if you're not using Vite -->

## Status

🚧 **In progress.** Building through mid-August, then moving into presentation form.

- [x] Problem definition & counterfactual
- [x] Pivot to race-travel direction
- [x] Demand data collected & analyzed
- [x] Business model built
- [ ] React site — narrative sections
- [ ] React site — interactive model
- [ ] React site — clickable mockup
- [ ] Deploy

## Context

This was built during a summer internship as an exercise in taking an ambiguous idea and turning it into a defined product opportunity — moving from understanding the F1 ecosystem to identifying and pressure-testing a genuine gap in it. Thanks to my mentor Neeraj for the direction and for pushing the thinking at every stage.

## Disclaimer

This is an independent, unaffiliated proof-of-concept made for learning purposes. It is not associated with or endorsed by Formula 1, McLaren, Pinterest, or any race promoter or team. All brand names and mock accounts are used illustratively to demonstrate a hypothetical concept. All figures are illustrative.

---

<!-- TODO: your name + links -->
Built by Aria Saksena
