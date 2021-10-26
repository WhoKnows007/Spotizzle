
// This file is required by the index.html file and will
// be executed in the renderer process for that window. (electron)
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off in the main.js. Use `preload.js` to
// selectively enable features needed in the rendering
// process. This is now equal to the commonly used index.js.

////is this needed?
//const filter = {
//	urls: ['*://*.google.com/*']
//};
//const session = electron.remote.session
//session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
//	details.requestHeaders['Origin'] = null;
//	details.headers['Origin'] = null;
//	callback({ requestHeaders: details.requestHeaders })
//});

const debug = true; // set to false and push to master for a live deploy

(function () {
    let serverAddress = (debug) ? 'http://localhost:4444' : 'https://spotizzle.herokuapp.com';

    let viewModel = {
        error: {
            statusCode: '999',
            error: 'Error',
            message: 'Something went wrong, but what?',
        },
        login: {
            buttonUrl: serverAddress + '/login',
            showElectronButton: navigator.userAgent.toLowerCase().indexOf(' electron/') <= -1 ? 'd-none' : '', // show a different login button to prevent cors based on if running in electron or not
            showBrowserButton: navigator.userAgent.toLowerCase().indexOf(' electron/') > -1 ? 'd-none' : '' // show a different login button to prevent cors based on if running in electron or not
        },
        userProfile: { display_name: 'Not logged in.' },
        title: { title: 'Spotizzle' },
        menu: { menu: 'Menu' },
        logbox: { logboxMessages: [] }
    };
    const errorPrefix = 'SPO CLIENT: ';

    var login = document.getElementById('login');
    login.innerHTML = Handlebars.compile(document.getElementById('login-template').innerHTML)(viewModel.login);
    login.style.display = 'none';

    var logbox = document.getElementById('logbox');
    logbox.innerHTML = Handlebars.compile(document.getElementById('logbox-template').innerHTML)(viewModel.logbox);
    logbox.style.display = 'none';

    var error = document.getElementById('error');
    error.innerHTML = Handlebars.compile(document.getElementById('error-template').innerHTML)(viewModel.error);
    error.style.display = 'none';

    var userProfile = document.getElementById('user-profile');
    userProfile.innerHTML = Handlebars.compile(document.getElementById('user-profile-template').innerHTML)(viewModel.userProfile);
    userProfile.style.display = 'none';

    var pagetitle = document.getElementsByTagName('title')[0];
    pagetitle.innerHTML = Handlebars.compile(document.getElementById('title-template').innerHTML)(viewModel.title);
    pagetitle.style.display = 'none';

    var title = document.getElementById('title');
    title.innerHTML = Handlebars.compile(document.getElementById('title-template').innerHTML)(viewModel.title);
    title.style.display = 'none';

    var menu = document.getElementById('menu');
    menu.innerHTML = Handlebars.compile(document.getElementById('menu-template').innerHTML)(viewModel.menu);
    menu.style.display = 'none';

    // since a lot of calls depend on other calls, keep the states of which calls have successfully executed
    var promises = {};

    initClickHandlers();
    getLoggedInUser();

    // attempt to get the user if logged in, otherwise show login buttons
    function getLoggedInUser() {
        promises.loggedInUser = $.when.apply($, []).then(function () {
            return $.ajax({
                url: serverAddress + '/getLoggedInUser',
                dataType: 'json',
                data: {},
            }).done(function (response, textStatus, jqXHR) {
                showLog('Authorize succesfull.');
                console.log(errorPrefix + 'authorize success');

                title.innerHTML = Handlebars.compile(document.getElementById('title-template').innerHTML)(viewModel.title);
                title.style.display = 'block';

                login.style.display = 'none';
                menu.style.display = 'block';

                // update models and views
                viewModel.userProfile = {
                    display_name: response.data.display_name,
                    user_id: response.data.id,
                };

                userProfile.innerHTML = Handlebars.compile(document.getElementById('user-profile-template').innerHTML)(viewModel.userProfile);
                userProfile.style.display = 'block';
            }).fail(function (jqXHR, textStatus, errorThrown) {
                viewModel.error = {
                    statusCode: '401',
                    error: 'Unauthorized',
                    message: 'You are not logged in. Please log in first.',
                };

                error.innerHTML = Handlebars.compile(document.getElementById('error-template').innerHTML)(viewModel.error);
                error.style.display = 'block';

                login.innerHTML = Handlebars.compile(document.getElementById('login-template').innerHTML)(viewModel.login);
                login.style.display = 'block';

                title.style.display = 'none';

                showLog('Authorize fail.');
                console.log(errorPrefix + 'authorize fail.');
            });
        });
    }

    // login the user to spotify (request rights if needed), and request playlists when succesfull
    function loginUser() {
        promises.loginUser = $.when.apply($, []).then(function () {
            return $.ajax({
                url: serverAddress + '/login',
                dataType: 'json',
                data: {},
                cors: true,
                contentType: 'application/json',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }).done(function (response, textStatus, jqXHR) {
                showLog('Login succesfull.');
                console.log(errorPrefix + 'login success');

                // hide previously visible error after not being logged in when starting the application
                viewModel.error = {
                    statusCode: '401',
                    error: 'Unauthorized',
                    message: 'You are not logged in. Please log in first.',
                };

                error.innerHTML = Handlebars.compile(document.getElementById('error-template').innerHTML)(viewModel.error);
                error.style.display = 'none';

                title.innerHTML = Handlebars.compile(document.getElementById('title-template').innerHTML)(viewModel.title);
                title.style.display = 'block';

                login.style.display = 'none';
                menu.style.display = 'block';

                // update models and views
                viewModel.userProfile = {
                    display_name: response.data.display_name,
                    user_id: response.data.id,
                };

                userProfile.innerHTML = Handlebars.compile(document.getElementById('user-profile-template').innerHTML)(viewModel.userProfile);
                userProfile.style.display = 'block';

                getLoggedInUser();
                $.when.apply($, [promises.loggedInUser]).then(function () {
                    initLog();
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                showLog('Login fail.');
                console.log(errorPrefix + 'login fail');

                viewModel.error = {
                    statusCode: '401',
                    error: 'Unauthorized',
                    message: 'Login failed. Please try again.',
                };
            });
        });
    }

    function initClickHandlers() {
        $(document).on('click', '#js-button--login', function (e) {
            loginUser();
        });
    }

    // to communicate with the main electron process which catches the shortcuts, i also need to call methods here in return.
    require('electron').ipcRenderer.on('asyncChannelToRenderer', (event, arg) => {
        if (arg === 'addSongToAwesomium') {
            addSongToAwesomium();
        } else if (arg === 'removeSongFromAwesomiumandAddSongToNoDeleteAgain') {
            removeSongFromAwesomiumandAddSongToNoDeleteAgain();
        } else {
            showLog('Únknown shortcut..');
            console.log(errorPrefix + 'Únknown shortcut.');
        }
    })

    // add song to awesomium, could be cleaned up a lot but for now it works.
    function addSongToAwesomium() {
        // get currently playing song from connected device //getCurrentlyPlayingSong
        let currentlyPlayingSongUri;
        let awesomiumPlaylistId;
        let currentlyPlayingSongName;
        let awesomiumPlaylistName;

        promises.getCurrentlyPlayingSongId = $.when.apply($, [promises.loggedInUser]).then(function () {
            return $.ajax({
                url: serverAddress + '/getCurrentlyPlayingSong',
                dataType: 'json',
            }).done(function (response, textStatus, jqXHR) {
                if (response.data) {
                    currentlyPlayingSongName = response.data.item.name;
                    currentlyPlayingSongUri = response.data.item.uri;

                    showLog('Current song: ' + response.data.item.name);
                    console.log(errorPrefix + 'Current song and uri: ' + response.data.item.name + " - " + response.data.item.uri);
                } else {
                    showLog('Currently playing song could not be retrieved, please play something on spotify.');
                    console.log(errorPrefix + 'Currently playing song could not be retrieved, please play something on spotify.');
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }).always(function () {
                //
            });
        });

        // get awesomium playlist
        promises.getAwesomiumPlaylistId = $.when.apply($, [promises.loggedInUser]).then(function () {
            return $.ajax({
                url: serverAddress + '/getPlaylists',
                dataType: 'json',
            }).done(function (response, textStatus, jqXHR) {
                if (response.data) {
                    var AwesomiumPlaylist = response.data.items.filter(function (obj) {
                        return (obj.name === "Awesomium");
                    })[0];
                    awesomiumPlaylistId = AwesomiumPlaylist.id;
                    awesomiumPlaylistName = AwesomiumPlaylist.name;

                    showLog('Retrieved playlist name: ' + AwesomiumPlaylist.name);
                    console.log(errorPrefix + 'Retrieved playlist name and id: ' + AwesomiumPlaylist.name + " - " + AwesomiumPlaylist.id);
                } else {
                    showLog('No playlists retrieved, what happened?');
                    console.log(errorPrefix + 'No playlists retrieved, what happened?');
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }).always(function () {
                //
            });
        });


        // add song to playlist
        promises.addSong = $.when.apply($, [promises.getCurrentlyPlayingSongId, promises.getAwesomiumPlaylistId]).then(function () {
            return $.ajax({
                url: serverAddress + '/addSongToAwesomiumById',
                dataType: 'json',
                data: { 'currentlyPlayingSongUri': currentlyPlayingSongUri, 'playlistId': awesomiumPlaylistId }
            }).done(function (response, textStatus, jqXHR) {
                showLog('Song ' + currentlyPlayingSongName + ' added to ' + awesomiumPlaylistName + ' succesfully.');
                console.log(errorPrefix + 'Song ' + currentlyPlayingSongName + ' added to ' + awesomiumPlaylistName + ' succesfully.');
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }).always(function () {
                //
            });
        });
    }

    // add song to no delete again! and remove from awesomium, could be cleaned up a lot but for now it works.
    function removeSongFromAwesomiumandAddSongToNoDeleteAgain() {
        let currentlyPlayingSongUri;
        let currentlyPlayingSongName;
        let awesomiumPlaylistId;
        let awesomiumPlaylistName;
        let noDeleteAgainPlaylistId;
        let noDeleteAgainPlaylistName;

        promises.getCurrentlyPlayingSongId = $.when.apply($, [promises.loggedInUser]).then(function () {
            return $.ajax({
                url: serverAddress + '/getCurrentlyPlayingSong',
                dataType: 'json',
            }).done(function (response, textStatus, jqXHR) {
                if (response.data) {
                    // update UI
                    currentlyPlayingSongName = response.data.item.name;
                    currentlyPlayingSongUri = response.data.item.uri;

                    showLog('Retrieved current song: ' + response.data.item.name);
                    console.log(errorPrefix + 'Retrieved current song and uri: ' + response.data.item.name + " - " + response.data.item.uri);
                } else {
                    showLog('Currently playing song could not be retrieved, please play something on spotify.');
                    console.log(errorPrefix + 'Currently playing song could not be retrieved, please play something on spotify.');
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }).always(function () {
                //
            });
        });

        // get playlists
        promises.getAwesomiumPlaylistId = $.when.apply($, [promises.loggedInUser]).then(function () {
            return $.ajax({
                url: serverAddress + '/getPlaylists',
                dataType: 'json',
            }).done(function (response, textStatus, jqXHR) {
                if (response.data) {
                    var AwesomiumPlaylist = response.data.items.filter(function (obj) {
                        return (obj.name === "Awesomium");
                    })[0];

                    var NoDeleteAgainPlaylist = response.data.items.filter(function (obj) {
                        return (obj.name === "No Delete Again!");
                    })[0];

                    awesomiumPlaylistId = AwesomiumPlaylist.id;
                    awesomiumPlaylistName = AwesomiumPlaylist.name;

                    noDeleteAgainPlaylistId = NoDeleteAgainPlaylist.id;
                    noDeleteAgainPlaylistName = NoDeleteAgainPlaylist.name;

                    showLog('Retrieved playlist name: ' + awesomiumPlaylistName);
                    console.log(errorPrefix + 'Retrieved playlist name and id: ' + awesomiumPlaylistName + " - " + awesomiumPlaylistId);

                    showLog('Retrieved playlist name: ' + noDeleteAgainPlaylistName);
                    console.log(errorPrefix + 'Retrieved playlist name and id: ' + noDeleteAgainPlaylistName + " - " + noDeleteAgainPlaylistId);
                } else {
                    showLog('No playlists retrieved, what happened?');
                    console.log(errorPrefix + 'No playlists retrieved, what happened?');
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }).always(function () {
                //
            });
        });

        // add song to playlist
        promises.addSongToNoDeleteAgain = $.when.apply($, [promises.getCurrentlyPlayingSongId, promises.getAwesomiumPlaylistId]).then(function () {
            return $.ajax({
                url: serverAddress + '/addSongToNoDeleteAgainById',
                dataType: 'json',
                data: { 'currentlyPlayingSongUri': currentlyPlayingSongUri, 'playlistId': noDeleteAgainPlaylistId }
            }).done(function (response, textStatus, jqXHR) {
                showLog('Song ' + currentlyPlayingSongName + ' added to ' + noDeleteAgainPlaylistName + ' succesfully.');
                console.log(errorPrefix + 'Song ' + currentlyPlayingSongName + ' added to ' + noDeleteAgainPlaylistName + ' succesfully.');
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }).always(function () {
                //
            });
        });

        // remove song from playlist
        promises.removeSong = $.when.apply($, [promises.getCurrentlyPlayingSongId, promises.getAwesomiumPlaylistId, promises.addSongToNoDeleteAgain]).then(function () {
            return $.ajax({
                url: serverAddress + '/removeSongFromAwesomiumById',
                dataType: 'json',
                data: { 'currentlyPlayingSongUri': currentlyPlayingSongUri, 'playlistId': awesomiumPlaylistId }
            }).done(function (response, textStatus, jqXHR) {
                showLog('Song ' + currentlyPlayingSongName + ' removed from ' + awesomiumPlaylistName + ' succesfully.');
                console.log(errorPrefix + 'Song ' + currentlyPlayingSongName + ' removed from ' + awesomiumPlaylistName + ' succesfully.');
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }).always(function () {
                //
            });
        });
    }

    function showLog(message) {
        viewModel.logbox.logboxMessages.push(new Date().toLocaleString() + ' - ' + message);
        logbox.innerHTML = Handlebars.compile(document.getElementById('logbox-template').innerHTML)(viewModel.logbox);
        logbox.style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    }

})();