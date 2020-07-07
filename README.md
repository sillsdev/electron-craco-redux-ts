This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [craco](https://github.com/wwlib/cra-craco-electron-example) which enables file access using create-react-app. `Create-react-app` will manage dependency updates and web packaging. Then [Redux](https://www.npmjs.com/package/redux) was added. Then the scripts were upated to allow debugging and file access.

## Basic usage

### Getting Started

The `npm install` command will install the dependencies.

### Electron Debugging (from vscode)

1. From the Chrome browser, install the [react devtools plugin](https://chrome.google.com/webstore/detail/react-developer-tools) and the [redux devtools plugin](https://chrome.google.com/webstore/detail/redux-devtools).

2. Use the command:
   `npm run electron-dev`
   to force the install of react and redux devtools into electron.

3. From the debugging tab in VsCode, select `Electron All` from the drop down and press the play button. The page will hot-reload if you make edits.

Subsequently, you can press `F5` to launch Electron with the Chromium browser. If breakpoints are disappearing, check that the debug chooser is still set to `Electron All`.

### Launching the Web version

`npm start` runs the app in the development mode.<br>
It opens [http://localhost:3000](http://localhost:3000) in the default browser.

You will have access to two new tabs in the Dev tools, React and Redux inspectors. Local file access is disabled in this web version. Web safe file access can still be used. Any code that is not web safe should be wrapped in a condition as is done in [testFs.tsx](https://github.com/sillsdev/electron-craco-redux-ts/blob/943f8e466a56ef9151cb8ac048078991a5121003/src/model/testFs.tsx#L2)

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Testing

`npm test` Launches the test runner in the interactive watch mode. There is a single test but it is recommended to use [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build Electron App

```
npm run build
npm run dist
```

Builds the app for production to the `build` folder. Then it is compiled into `dist` folder. Currently only tested for Windows. An unpacked `.exe` version is available in `dist/win-unpacked`<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

[Ejecting](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) is not recommended but read the discussion at the link if you are considering it.

## Preparing for production

Warning messages concerning security issues are disabled for development builds in the [electron-dev.js](https://github.com/sillsdev/electron-craco-redux-ts/blob/943f8e466a56ef9151cb8ac048078991a5121003/public/electron-dev.js#L9) and [electron-debug.js](https://github.com/sillsdev/electron-craco-redux-ts/blob/943f8e466a56ef9151cb8ac048078991a5121003/public/electron-debug.js#L9) files on line 9. As you prepare for production, it is recommended to enable these warnings and make any necessary changes to address the [issues](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#electron-security-warnings) they are highlighting.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Webpack installed with:
https://www.codementor.io/randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer

## Updating Dependencies

To update the dependencies it is helpfule to use the command:

```
    npx create-react-app crat --template="typescript"
```

which will show you the latest dependencies recommended by create-react-app.

Additional the command `npm update` will go through the list of dependencies and recommend updates to the currently used packages. Once the packages dependencies are updated it is important to test the whole system using:

```
    rm -Force -Recurse node_modules
    rm package-lock.json
    npm install
```

Which reloads all the dependencies based on what is currently specificified in the package.json file.
