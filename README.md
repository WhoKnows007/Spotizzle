# How to run for me as developer
- start the server from the terminal from the spotizzleserver dir, with:
    - npm run start OR npm run dev
- if you want to debug the server, run it with the debug tools from the dev environment instead.
- start the client from the terminal from the spotizzle dir, either the webbrowser or electron client:
    - npm run browser
    - npm run application

# How to run
- IF you want to run the server instead of using mine: create a client_id and client_secret in the app.js. Add better instructions later. 
- Go to the Spotizzle main folder.
- npm install

Each of the following needs a new terminal prompt, pick either electron or browser or serve (to not also run watchers? tbd):
- npm run browser               to enable the watchers
- npm run application           to start electron
- serve                         to simulate a local http server (note the missing npm run) (also included in the npm run browser)

# Todo
scartch the part below, new plan!
as electron does not like the audio player from spotify, which is required, i decided to not play music in my app.
I will play everything through spotify, but use my app to check what song is playing and delete/add it based on that.
So the shortcuts will be the core component. I have also added a log on the main screen removing the playlist stuff.
Maybe in the future i can look into fixing the audio player, but i just want to get a version done asap.
The code is placed in index.js, which is not used anyway, in case i will pick it up later.


- Connect to spotify --> basic version done. Improve.
- Get a list of playlists --> basic version done. Improve.
- Get the selected playlist from previously mentioned playlists --> basic version done. Improve.
- replacing require with axion. First method (refresh token) --> success.
- Create a basic design to show the playlists and allow selecting one to show it's songs --> basic version done. Improve.
- Add custom shortcuts. Working on desktop without focus and in the browser with. (pref without focus too) --> basic version done. Improve.
- Add audio player --> basic version done. Improve.
- Fix js/npm integration using a main js file that is easily expandable. --> basic version done.
- Separate the client and server side ajax calls. --> basic version done.
- Very basic project cleanup.
- Add custom shortcuts which were the reason to actually build this shit.
- Look at licensing/rights.
- Test deploy: Host the authorization code on a server and generate an electron executable to test the application --> current. Generate executable and host website on domain.

# Todo after first very basic release
- The big cleanup:
    - Replace handlebars with a two way data-binding library. Yes lets use Vue. Already done a course for it, lets go.
    - Etc.
- Optimize and secure server and app. See express instructions online.
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
- Save the access_token and expire time in a cookie/local storage/db on the server, see what is save with oath2.
- Add alexa intergration to save the currently playing song to a playlist for Bazzle. (https://blog.prototypr.io/using-voice-commands-to-control-a-website-with-amazon-echo-alexa-part-1-6-a35edbfef405)
- After that add more spotify functionalities if i feel like they add something for the greater good.

# Extra / dev
- Fix live server/live reload and open it in chrome.
- Add linters.
- Remove Jquery.

# Choices
- Spotify Authorization code flow, does require a server but is safe and does give a refresh token. 
- To be able to easily adjust code for a specific scenario, i prefer not to use generic methods for everything. For example one re-useable ajax call function will require a lot of exception and configuration, making it one big complex method instead of multiple smaller, easier to edit ones. Yes this does increase the risc of forgetting to update something in both ajax calls, but that is a risc i much prefer.

### Release notes V1 
#####(went through every phase of development, not safe/use-able by the masses)


### Release notes V2 
#####(First real use-able release for everyone)
