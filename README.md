# playCounter

A small React timing game: start a countdown, then try to stop it as close to zero as you can without running out of time.

Built as a practice project while learning React (refs, portals and `useImperativeHandle`).

![Landing page](./screenshots/LandingPage.png)
![Score modal](./screenshots/scoreModal.png)

## Features

- Enter a player name to personalise the greeting
- Four challenges with target times of 1, 5, 10 and 15 seconds
- Start/stop a countdown that ticks every 10 ms
- Result dialog showing the remaining time and a score (closer to zero scores higher); letting the timer run out counts as a loss

## Tech stack

- React 18
- Vite 4
- Native `<dialog>` rendered through a React portal

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
    Player.jsx           # name input (uses a ref)
    TimerChallenge.jsx   # countdown logic for one challenge
    ResultModal.jsx      # result dialog via createPortal + useImperativeHandle
```

## Known issues

This is an unpolished learning project. The reset callback is passed to the result dialog as `onRest` instead of `onReset`, and the `<dialog>` is rendered with the `open` attribute, so resetting a challenge and the modal behaviour do not work as intended.

## License

MIT - see [LICENSE](LICENSE).
