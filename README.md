# playCounter

A small React timing game: start a countdown, then try to stop it as close to zero as you can without running out of time.

Built as a practice project while learning React (refs, portals and `useImperativeHandle`).

![Landing page](./screenshots/LandingPage.png)
![Score modal](./screenshots/scoreModal.png)

## Features

- Enter a player name to personalise the greeting (remembered between visits)
- Four challenges with target times of 1, 5, 10 and 15 seconds
- Start/stop a countdown measured against real elapsed time (`performance.now()`), so it stays accurate even when the browser throttles timers
- Result dialog with a progress bar, the remaining time and a score (closer to zero scores higher); letting the timer run out counts as a loss
- Best score per challenge saved in `localStorage`, with a "New best score!" badge
- Close the dialog with the button or the Escape key; either way the challenge resets
- Responsive layout and visible keyboard focus styles

## Tech stack

- React 18
- Vite 4
- Native `<dialog>` rendered through a React portal
- Deployed to GitHub Pages from the `gh-pages` branch

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
git clone https://github.com/AkshayTripathiAI/playCounter.git
cd playCounter
npm install
npm run dev
```

Then open the URL Vite prints (by default http://localhost:5173).

Other scripts:

- `npm run build` - production build to `dist/`
- `npm run preview` - serve the production build locally

## Project structure

```
src/
  App.jsx                # renders the player section and the four challenges
  components/
    Player.jsx           # name input (uses a ref), persisted to localStorage
    TimerChallenge.jsx   # countdown logic and best score for one challenge
    ResultModal.jsx      # result dialog via createPortal + useImperativeHandle
```

## Deploying

`vite.config.js` sets `base: '/playCounter/'` for GitHub Pages. Run `npm run build` and publish the contents of `dist/` (plus an empty `.nojekyll`) to the `gh-pages` branch.

## License

MIT - see [LICENSE](LICENSE).
