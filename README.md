# Cellular atutomata playground

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


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
- [ ] implement routes /1d /2d
- [ ] improve 2d rules horizontal scrolling
- [ ] add initial state config on 2d
- [ ] import random color pallete from some api
- [ ] fullscreen mode with floating controls (or absolute positioned)
- [ ] put settings on side menu
- [ ] edit cells number
- [ ] stop autimatically when current state is all zeroes


## Notes
- To mantain an updated version of the rules set state is necessary to update it when the state of a single rule changes. But change the sate of the set invokes the render of every single rule, even those which value was not changed. To avoid this, it is possible to make a single rule holds its own state. 
