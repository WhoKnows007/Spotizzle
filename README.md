# How to run
- IF you want to run the server instead of using mine: create a client_id and client_secret in the app.js. Add better instructions later. 
- Go to the Spotizzle main folder.
- npm install
- npm run browser
- Go to you browser and check http://localhost:8888
    - OR
- npm run application

# app.js server debugging (PHP STORM)
Run app.js with debug configuration in the menu.
Do not start the npm run browser, since both will run on :8888, use either one of the two.
Don't forget to restart the server/debug session for each change. (no nodemon atm)

# Todo
- Connect to spotify --> basic version done. Improve.
- Get a list of playlists --> basic version done. Improve.
- Get the selected playlist from previously mentioned playlists --> basic version done. Improve.
- replacing require with axion. First method (refresh token) --> success.
- Create a basic design to show the playlists and allow selecting one to show it's songs --> basic version done. Improve.
- Add custom shortcuts. Working on desktop without focus and in the browser with. (pref without focus too) --> basic version done. Improve.
- Add audio player --> basic version done. Improve.
- Fix js/npm integration using a main js file that is easily expandable. --> basic version done.
- Separate the client and server side ajax calls. --> current, almost finished.
- Very basic project cleanup.
- Add custom shortcuts which were the reason to actually build this shit.
- Look at licensing/rights.
- Test deploy: Host the authorization code on a server and generate an electron executable to test the application.

# Todo after first very basic release
- The big cleanup:
    - Replace handlebars with a two way data-binding library.
    - Etc.
- Remove access_token from the url. https://community.auth0.com/t/how-to-remove-access-token-from-url/23969
- Add logout functionality.
- Style the navbar.
- Style the playlists.
- Style the songlist.
- Expand the getPlaylists api call to get all playlists.
- Expand the getSong api call to get all songs.
- Add audio player previous and next functionality.
- Add the currently playing song and style it.
- Add the currently playing songs (so you can also see whats next when using shuffle)
- Add a shuffle functionality.
- Add alexa intergration to save the currently playig song to a playlist for Bazzle. (https://blog.prototypr.io/using-voice-commands-to-control-a-website-with-amazon-echo-alexa-part-1-6-a35edbfef405)
- After that add more spotify functionalities if i feel like they add something for the greater good.

# Extra / dev
- Fix live server/live reload and open it in chrome.
- Add linters.
- Remove Jquery.

# Choices
- Spotify Authorization code flow, does require a server but is safe and does give a refresh token. 
- To be able to easily adjust code for a specific scenario, i prefer not to use generic methods for everything. For example one re-useable ajax call function will require a lot of exception and configuration, making it one big complex method instead of multiple smaller, easier to edit ones. Yes this does increase the risc of forgetting to update something in both ajax calls, but that is a risc i much prefer.

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

