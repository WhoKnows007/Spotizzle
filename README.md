# How to run
- Go to the Spotizzle main folder.
- npm install
- npm run browser
- Go to you browser and check http://localhost:8888
    - OR
- npm run application

# Todo
- Connect to spotify --> basic version done. Improve.
- Get a list of playlists --> basic version done. Improve.
- Get the selected playlist from previously mentioned playlists --> basic version done. Improve.
- Put the private.js on a server and extract keys/tokens/etc..
- Test deploy: Host the authorization code on a server and generate an electron executable to test the application.

# Extra / dev
- Fix live server/live reload and open it in chrome.
- Add linters.

# Choices
- Spotify Authorization code flow, does require a server but is safe and does give a refresh token. 

# Electron
**Use this app along with the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron
- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

