# Cellular atutomata playground

## Used technologies
HTML
CSS
Javascript
React
Typescript
Tailwind
MaterialUI
Redux


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## TODO
- [ ] Appearance settings
  - [ ] Color themes
- [ ] Space topology (finite space, toroid)
- [x] Adjust canvas size when resizing window
- [ ] Show generation counter
- [ ] Help menu
- [ ] Common rules set options (classic game of life, etc)
- [ ] Save rules and configurations
- [ ] Run different configurations and rules on the same canvas (show as color layers)
  - [ ] Two cells alive in the same cell on different layers produce another cell in another layer.
- [x] show the rules as image
- [ ] show and change on every iteration the current state as image
- [ ] show how the current state (as integer) change over iterations
- [x] Use a text field in input numbers
- [x] Justify neighborhood and rules components
- [x] put control buttons together
  - [x] remove clear button
- [x] replace speed and zoom labels by icons
- [ ] replace title with dropdown selector
- [x] implement routes /1d /2d
- [x] improve 2d rules horizontal scrolling
- [x] add initial state config on 2d
- [ ] import random color pallete from some api
- [ ] fullscreen mode with floating controls (or absolute positioned)
- [ ] put settings on side menu
- [ ] edit cells number
- [ ] stop autimatically when current state is all zeroes
- [x] replace neighborhood 2d type diagonal by custom
  - [x] update main cell selector 2d for custom neighborhood
- [ ] 2d Cellular automata
  - [ ] Buttons to mark all rules
  - [ ] Fix scroll coords gap
  - [ ] Clean scene
  - [ ] Save init state and load again when stop.
  - [ ] Show grid on stopped and paused states
  - [ ] disable cell toggle when running
- [ ] Allow to choose different models


## Notes
