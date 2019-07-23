This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Then [craco](https://github.com/wwlib/cra-craco-electron-example) was added to enable file access using create-react-app. Then [Redux](https://www.npmjs.com/package/redux) was added. Then the scripts were upated to allow debugging and file access.

## Basic usage

### `Electron Debugging (from vscode)`

1. From the Chrome browser, install the [react devtools plugin](https://chrome.google.com/webstore/detail/react-developer-tools) and the [redux devtools plugin](https://chrome.google.com/webstore/detail/redux-devtools).
 
2. Use the command:
`npm run electron-dev`
to force the install of react of react and redux devtools into electron.

3. From the debugging tab in VsCode, select `Electron All` from the drop down and press the play button. The page will hot-reload if you make edits.

Subsequently, you can press `F5` to launch Electron with the Chromium browser.

### `Launching the Web version`
`npm run web-dev`

or

`npm run web-prod`

Runs the app in the development mode.<br>
Opens [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `Testing`

`npm test` Launches the test runner in the interactive watch mode. There is a single test but it is recommended to use [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `Build Electron App`
```
npm run electron-pack
npm run dist
```

Builds the app for production to the `build` folder. Then it is compiled into `dist` folder. Currently only tested for Windows. An unpacked `.exe` version is available in `dist/win-unpacked`<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


Webpack installed with:
https://www.codementor.io/randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer
