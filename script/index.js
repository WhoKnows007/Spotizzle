// this file is not used as the code for electron needed to be in renderer.js
// instead if have a bunch of commented code which i wrote trying to get audio to play in spotizzle
// this works in the browser, but not in electron. So i decided not to use audio in spotizzle.
// instead i will connect with spotify and play everything through that, and edit the currently playing song there.
// now this leaves a bunch of code for getting playlists, songs and playing them, which i want to keep for a future version.
// maybe ill never get to it, but as im the only person who cares about this anyway, its not my problem HA!
// so the following commented code blocks are from the client and the server which a commented code block between to separate.


/*


INDEX.HTML (client html)


*/

{/* <script src="./script/spotify-player-1.7.1.js"></script> */ }

{/* <script>
            window.onSpotifyWebPlaybackSDKReady = () => {
            // moving this gives an error, for now leave it here. Seems inside renderer the timing is wrong, probably because electron script loading.
            console.log('onSpotifyWebPlaybackSDKReady on index.html ready.');
            };
    </script> */}

    // < !-- < script id = "footer-template" type = "text/x-handlebars-template" >
    // <div class="fixed-bottom">
    //     <div class="c-audio-player  bg-danger">
    //         <div class="c-audio-player  d-flex  align-items-center  justify-content-center">
    //             <button class="btn btn-primary  mx-2" id="js-button--previous">Previous</button>
    //             <button class="btn btn-primary  mx-2" id="js-button--play">Play/Pause</button>
    //             <button class="btn btn-primary  mx-2" id="js-button--next">Next</button>
    //         </div>
    //     </div>
    // </div>
    // </script > -->

    // <script id="playlists-template" type="text/x-handlebars-template">
    //     <ul class="list-unstyled">
    //         {{#each playlists}}
    //         <li class="js-playlist  mb-2" data-id="{{this.id}}">
    //             {{#each this.images}} {{#unless @index}} <img style="max-width: 50px; max-height: 50px;" src="{{this.url}}" alt="Album cover"> {{/unless}} {{/each}} {{this.name}}
    //             {{this.owner.display_name}} {{this.tracks.total}} {{this.description}}
    //         </li>
    //         {{else}}
    //         <li>No playlists have been found!</li>
    //         {{/each}}
    //     </ul>
    // </script>

    // <script id="songs-template" type="text/x-handlebars-template">
    //     <ul class="list-unstyled">
    //         {{#each songs}}
    //         <li class="js-song  mb-2" data-id="{{this.uri}}">
    //             {{#each this.artists}} {{this.name}} {{/each}} {{this.name}}
    //         </li>
    //         {{else}}
    //         <li>No songs have been found!</li>
    //         {{/each}}
    //     </ul>
    // </script>

    // var playlists = document.getElementById('playlists');
    // playlists.innerHTML = Handlebars.compile(document.getElementById('playlists-template').innerHTML)(viewModel.playlists);
    // playlists.style.display = 'none';

    // var songs = document.getElementById('songs');
    // songs.innerHTML = Handlebars.compile(document.getElementById('songs-template').innerHTML)(viewModel.songs);
    // songs.style.display = 'none';

        // < !-- < div id = "devices" ></div > -->
        // < !-- < div id = "playlists" ></div > -->
        // < !-- < div id = "songs" ></div > -->

        // < !-- < div id = "footer" ></div > -->



/*


RENDERER.JS (client js)


*/




    // let player;
    // footer: {},
    // playlists: { playlists: [] },
    // songs: { songs: [] },
    // devices: { },

        // let currentDevice;
        // these mostly work, (audio player is not supported in electron) but i decided to just use the spotify player and not play songs through this.
        // getUserPlaylists();
        // createAudioPlayer();
    // getDevices();


    // $(document).on('click', '.js-playlist', function (e) {
    //     getPlaylistSongs($(e.currentTarget).data("id"));
    // });

    // window.addEventListener('keyup', function () {
    //     //                    console.log("keyup browser");
    // }, true);


    // $("#js-button--previous").click(function () {
    //     player.previousTrack().then(() => {
    //         console.log('Set to previous track!');
    //     });
    // });

    // $("#js-button--play").click(function () { //play = pause
    //     player.togglePlay().then(() => {
    //         console.log('Toggled playback!');
    //     });
    // });

    // $("#js-button--next").click(function () {
    //     player.nextTrack().then(() => {
    //         console.log('Skipped to next track!');
    //     });
    // });

    // works but due to electron audio player not working commented for possible later use
    // function getUserPlaylists() {
    //     promises.playlists = $.when.apply($, [promises.loggedInUser]).then(function () {
    //         console.log('getUserPlaylists');

    //         return $.ajax({
    //             url: serverAddress + '/getAllPlaylists',
    //             dataType: 'json',
    //             data: {
    //                 user_id: viewModel.userProfile.user_id,
    //                 offset: 0,
    //                 limit: 5,
    //             },
    //         }).done(function (response, textStatus, jqXHR) {
    //             viewModel.playlists.playlists = response.data.items;
    //             playlists.innerHTML = Handlebars.compile(document.getElementById('playlists-template').innerHTML)(viewModel.playlists);
    //             playlists.style.display = 'block';
    //         }).fail(function (jqXHR, textStatus, errorThrown) {
    //             console.log(jqXHR);
    //             console.log(textStatus);
    //             console.log(errorThrown);
    //         }).always(function () {
    //             //
    //         });
    //     });
    // }

        // works partially, works in chrome, not in electron, but due to electron audio player not working commented for possible later use
    // function createAudioPlayer() {

    //     // promises.playlists = $.when.apply($, [promises.loggedInUser]).then(function () {



    //     // promises.audioPlayer = $.when.apply($, []).then(function () {

    //     //     if (!player) {
    //     //         player = new Spotify.Player({
    //     //             name: 'A Spotify Web SDK Player',
    //     //             getOAuthToken: callback => {
    //     //                 //does access_token have an object to see expires_in
    //     //                 callback(access_token);
    //     //             },
    //     //             volume: 0.3,
    //     //         });
    //     //         console.log("created spotify player since there is none");
    //     //     }

    //     //     console.log('initAudioPlayer');
    //     //     return $.ajax({
    //     //         url: serverAddress + '/initAudioPlayer',
    //     //         dataType: 'json',
    //     //         data: {},
    //     //     }).done(function (response, textStatus, jqXHR) {
    //     //         console.log('success');

    //     //         // should be playing the song
    //     //     }).fail(function (jqXHR, textStatus, errorThrown) {
    //     //         console.log('error');
    //     //         console.log(jqXHR);
    //     //         console.log(textStatus);
    //     //         console.log(errorThrown);
    //     //     }).always(function () {
    //     //         //
    //     //     });
    //     // });
    // }

        // works but due to electron audio player not working commented for possible later use
    // function getPlaylistSongs(playlistId) {
    //     promises.playlistsongs = $.when.apply($, [promises.playlists]).then(function () {
    //         console.log('getPlaylistSongs');
    //         return $.ajax({
    //             url: serverAddress + '/getAllSongsByPlaylistId',
    //             dataType: 'json',
    //             data: {
    //                 playlist_id: playlistId,
    //                 offset: 0,
    //                 limit: '5',
    //             },
    //         }).done(function (response, textStatus, jqXHR) {

    //             //asign items to viewmodel and load template
    //             //
    //             //                            viewModel.songs = response.items;
    //             //                            songs.innerHTML = Handlebars.compile(document.getElementById('songs-template').innerHTML)(viewModel.songs);
    //             //                            songs.style.display = 'block';

    //             getSongTitlesFromPlaylistSongs(response);
    //         }).fail(function (jqXHR, textStatus, errorThrown) {
    //             console.log(jqXHR);
    //             console.log(textStatus);
    //             console.log(errorThrown);
    //         }).always(function () {
    //             //
    //         });
    //     });
    // }

        // works but due to electron audio player not working commented for possible later use
    // function getSongTitlesFromPlaylistSongs(response) {
    //     viewModel.songs.songs = [];

    //     //get the current playlist using currentplaylist in the viewModel.playlists object, add the songs to that found object
    //     for (let songCounter = 0; songCounter < response.data.items.length; songCounter++) {
    //         let song = response.data.items[songCounter].track;
    //         let artists = "";

    //         for (let artistCounter = 0; artistCounter < song.artists.length; artistCounter++) {
    //             artists += song.artists[artistCounter].name;
    //         }
    //         viewModel.songs.songs.push(song);
    //     }

    //     songs.innerHTML = Handlebars.compile(document.getElementById('songs-template').innerHTML)(viewModel.songs);
    //     songs.style.display = 'block';


    //     $(".js-song").click(function (e) {

    //         //                        var player2 = new Spotify.Player({
    //         //                            name: 'Carly Rae Jepsen Player',
    //         //                            getOAuthToken: callback => {
    //         //                                // Run code to get a fresh access token
    //         //
    //         //                                callback(access_token);
    //         //                            },
    //         //                            volume: 0.5
    //         //                        });
    //         //
    //         //
    //         //                        const play = ({
    //         //                                          spotify_uri,
    //         //                                          playerInstance: {
    //         //                                              _options: {
    //         //                                                  getOAuthToken,
    //         //                                                  id
    //         //                                              }
    //         //                                          }
    //         //                                      }) => {
    //         //                            getOAuthToken(access_token => {
    //         //                                fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //         //                                    method: 'PUT',
    //         //                                    body: JSON.stringify({ uris: [spotify_uri] }),
    //         //                                    headers: {
    //         //                                        'Content-Type': 'application/json',
    //         //                                        'Authorization': `Bearer ${access_token}`
    //         //                                    },
    //         //                                });
    //         //                            });
    //         //                        };
    //         //                        player2.getCurrentState().then(state => {
    //         //
    //         //                            play({
    //         //                                playerInstance: player2,
    //         //                                spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
    //         //                            });
    //         //                        });


    //         //                        player.getCurrentState().then(state => {
    //         //
    //         //
    //         //                            if (state) {
    //         //                                console.log('Player has a state, adding ready listener');
    //         //                                player.addListener('ready', ({device_id}) => {
    //         //                                    console.log('Connected with Device ID', device_id);
    //         //                                });
    //         //                                //something is playing, replace it with the clicked song
    //         //                            } else {
    //         //                                console.log('No state available');
    //         //                            }

    //         playSong($(e.currentTarget).data("id"));
    //         //
    //         //                                if (!state) {
    //         //                                    //not playing anything, play the clicked song
    //         //
    //         //                                } else{
    //         //                                    player.togglePlay().then(() => {
    //         //                                        console.log('Toggled playback!');
    //         //                                    });
    //         //								}
    //         //
    //         //                                let {
    //         //                                    current_track,
    //         //                                    next_tracks: [next_track]
    //         //                                } = state.track_window;
    //         //
    //         //                                console.log('Currently Playing', current_track);
    //         //                                console.log('Playing Next', next_track);
    //         //                        });

    //     });
    // }

        // works but due to electron audio player not working commented for possible later use
    // var asd;
    // function playSong(songUri) {
    //     console.log('play song clicked.', songUri);
    //     let device_id;

    //     // const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
    //     // console.log("The Web Playback SDK has loaded.");

    //     var access_token = 'BQCgRYn4xV4soewfouIqA6CT2Yaxntvq-aKXbSbOm13dyh3HwEgjXSvE_-RuopQ9ueORoweYiwgWqy2lu6PquqnUwG9mu-2gkg6T2ngMPkTYZg1HS5HlinPGEWNiwQ3IJeDPZ156Hw4rgzRQZwiv3s5G4pCZw8OPtcHquQl9_XcYT_SRGvYdshLtuSi6NgED8rQ5Zg';

    //     if (!player) {
    //         player = new Spotify.Player({
    //             name: 'Carly Rae Jepsen Player',
    //             getOAuthToken: callback => {
    //                 // Run code to get a fresh access token
    //                 callback(access_token);
    //             },
    //             volume: 1
    //         });

    //         player.connect().then(success => {
    //             if (success) {
    //                 console.log('The Web Playback SDK successfully connected to Spotify!');
    //             } else {
    //                 console.log('The Web Playback SDK can\'t connect to Spotify!');
    //             }
    //         });

    //         player.addListener('ready', ({ device_id }) => {
    //             console.log('The Web Playback SDK is ready to play music on device: ', device_id);
    //             asd = device_id;

    //             const play = ({
    //                 spotify_uri,
    //                 playerInstance: {
    //                     _options: {
    //                         getOAuthToken
    //                     }
    //                 }
    //             }) => {
    //                 getOAuthToken(access_token => {
    //                     console.log('Get oauth token.');
    //                     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${asd}`, {
    //                         method: 'PUT',
    //                         body: JSON.stringify({ uris: [spotify_uri] }),
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                             'Authorization': `Bearer ${access_token}`
    //                         },
    //                     });
    //                 });
    //             };

    //             console.log('play song');
    //             play({
    //                 playerInstance: player,
    //                 spotify_uri: songUri,
    //             });
    //         });
    //     };


    //     // const play = ({
    //     //     spotify_uri,
    //     //     playerInstance: {
    //     //         _options: {
    //     //             getOAuthToken
    //     //         }
    //     //     }
    //     // }) => {
    //     //     getOAuthToken(access_token => {

    //     //         $.ajax({
    //     //             method: 'PUT',
    //     //             url: `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
    //     //             dataType: 'json',
    //     //             body: JSON.stringify({ uris: [spotify_uri] }),
    //     //             cors: true,
    //     //             headers: {
    //     //                 'Access-Control-Allow-Origin': '*',
    //     //                 'Content-Type': 'application/json',
    //     //                 'Authorization': `Bearer ${access_token}`
    //     //             },
    //     //         }).done(function (response, textStatus, jqXHR) {
    //     //             debugger;


    //     //         })
    //     //     });
    //     // };

    //     // play({
    //     //     playerInstance: player,
    //     //     spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
    //     // });


    //     // player.getCurrentState().then(state => {
    //     //     if (!state) {
    //     //         console.error('User is not playing music through the Web Playback SDK');
    //     //         return;
    //     //     }

    //     //     var current_track = state.track_window.current_track;
    //     //     var next_track = state.track_window.next_tracks[0];

    //     //     console.log('Currently Playing', current_track);
    //     //     console.log('Playing Next', next_track);
    //     // });

    //     // player.getVolume().then(volume => {
    //     //     let volume_percentage = volume * 100;
    //     //     console.log(`The volume of the player is ${volume_percentage}%`);
    //     // });

    //     // player.setVolume(0.5).then(() => {
    //     //     console.log('Volume updated!');
    //     // });

    //     // player.togglePlay().then(() => {
    //     //     console.log('Toggled playback!');
    //     // });

    //     // player.seek(60 * 1000).then(() => {
    //     //     console.log('Changed position!');
    //     // });

    //     // player.previousTrack().then(() => {
    //     //     console.log('Set to previous track!');
    //     // });

    //     // player.nextTrack().then(() => {
    //     //     console.log('Skipped to next track!');
    //     // });


    //     // Connect to the player created beforehand, this is equivalent to
    //     // creating a new device which will be visible for Spotify Connect
    //     // player.connect().then(success => {
    //     //     console.log('connecting to the player');

    //     //     if (success) {
    //     //         console.log('The Web Playback SDK successfully connected to Spotify!');
    //     //     } else {
    //     //         console.log('the web player cant connect');
    //     //     }
    //     // });

    //     //                    console.log('Adding a ready listener to the player');
    //     //                    // Called when connected to the player created beforehand successfully
    //     //                    player.addListener('ready', ({device_id}) => {
    //     //                        console.log('Ready with Device ID', device_id);


    //     //                        const play =
    //     //                            function ({
    //     //                                          spotify_uri,
    //     //                                          playerInstance: {
    //     //                                              _options: {
    //     //                                                  getOAuthToken,
    //     //                                                  id
    //     //                                              }
    //     //                                          }
    //     //                                      }) {
    //     //                                getOAuthToken(
    //     //                                    function (access_token) {
    //     //                                        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //     //                                            method: 'PUT',
    //     //                                            body: JSON.stringify({uris: [spotify_uri]}),
    //     //                                            headers: {
    //     //                                                'Content-Type': 'application/json',
    //     //                                                'Authorization': 'Bearer ' + access_token
    //     //                                            },
    //     //                                        });
    //     //                                    });
    //     //                            };
    //     //
    //     //                        console.log('Play song...');
    //     //
    //     //                        play({
    //     //                            playerInstance: player,
    //     //                            spotify_uri: songUri,
    //     //                        });

    //     // const play = ({
    //     //     spotify_uri,
    //     //     playerInstance: {
    //     //         _options: {
    //     //             getOAuthToken,
    //     //             id,
    //     //         },
    //     //     },
    //     // }) => {
    //     //     getOAuthToken(access_token => {
    //     //         fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    //     //             method: 'PUT',
    //     //             body: JSON.stringify({ uris: [spotify_uri] }),
    //     //             headers: {
    //     //                 'Content-Type': 'application/json',
    //     //                 'Authorization': `Bearer ${access_token}`,
    //     //             },
    //     //         });
    //     //     });
    //     // };


    //     // console.log('Triggering the play function on the player, lets hear!');
    //     // play({
    //     //     playerInstance: player,
    //     //     spotify_uri: songUri,
    //     // });

    //     //                    });

    //     //                    player.addListener('player_state_changed',
    //     //                        ({
    //     //                             position,
    //     //                             duration,
    //     //                             track_window: {current_track}
    //     //                         }) => {
    //     ////                            console.log('Currently Playing', current_track);
    //     ////                            console.log('Position in Song', position);
    //     ////                            console.log('Duration of Song', duration);
    //     //                        });

    //     // Not Ready
    //     //                    player.addListener('not_ready', ({device_id}) => {
    //     //                        console.log('Device ID has gone offline', device_id);
    //     //                    });
    //     // }

    // }

    // find the spotify player to track what is playing and which song to add/delete
    // function getDevices() {
    //     promises.devices = $.when.apply($, [promises.loggedInUser]).then(function () {
    //         console.log('getDevices');

    //         return $.ajax({
    //             url: serverAddress + '/getDevices',
    //             dataType: 'json',
    //         }).done(function (response, textStatus, jqXHR) {
    //             if (response.data.devices.length === 0) {
    //                 console.log('Please open spotify on pc to register the device.');
    //             } else {
    //                 var deviceToPlayOn = response.data.devices.find(obj => {
    //                     return obj.type === 'Computer' && obj.name === 'DESKTOP-JELLE'
    //                 })
    //                 currentDevice = deviceToPlayOn;

    //                 // update models and views
    //                 viewModel.devices = {
    //                     name: deviceToPlayOn.name,
    //                     type: deviceToPlayOn.type,
    //                 };

    //                 devices.innerHTML = Handlebars.compile(document.getElementById('devices-template').innerHTML)(viewModel.devices);
    //                 devices.style.display = 'block';
    //             }
    //         }).fail(function (jqXHR, textStatus, errorThrown) {
    //             console.log(jqXHR);
    //             console.log(textStatus);
    //             console.log(errorThrown);
    //         }).always(function () {
    //             //
    //         });
    //     });
    // }


    // inside the loginUser function success
    // update the user information and once that is finished use that info to get the playlists
    // as the audio player wont work atm in electron (would need to attempt to get certain plugins to work blabla)
    // i decided to use the playing functionality from spotify and use spotify and my app in tandem.
    // $.when.apply($, [promises.loggedInUser]).then(function () {
    //     getUserPlaylists();
    // });


    //get the footer and pass a template with a model. Default application state hide/show after.
    // var footer = document.getElementById('footer');
    // footer.innerHTML = Handlebars.compile(document.getElementById('footer-template').innerHTML)(viewModel.footer);
    // footer.style.display = 'none';


    // var devices = document.getElementById('devices');
    // devices.innerHTML = Handlebars.compile(document.getElementById('devices-template').innerHTML)(viewModel.devices);
    // devices.style.display = 'none';


/*



APP.JS (server js)


*/


    // attempt to init the audio player and do it all server side, to not have to give the access_token to the client
    // app.get('/initAudioPlayer', cors(), function (req, res) {
    //     console.log('/initAudioPlayer');


    // });

    // app.get('/getAllPlaylists', cors(), function (req, res) {
    //     console.log('/getAllPlaylists');

    //     getValidAccessToken().then(function () {
    //         let offset = req.query.offset;
    //         let limit = req.query.limit;

    //         return axios({
    //             url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
    //             params: {
    //                 offset: offset,
    //                 limit: limit,
    //             },
    //             headers: {
    //                 'Authorization': 'Bearer ' + access_token,
    //             },
    //         }).then(function (response) {
    //             res.send({
    //                 status: response.status,
    //                 data: response.data,
    //                 headers: response.headers,
    //             });
    //         }).catch(function (error) {
    //             return SPOError(res, error.response.status, 'getAllPlaylists', 'The server could not retrieve the user\'s playlists. Please redirect the user to the login page.');
    //         });
    //     }).catch(function (error) {
    //         res.send(error);
    //         return error;
    //     });
    // });

    // app.get('/getAllSongsByPlaylistId', cors(), function (req, res) {
    //     console.log('/getAllSongsByPlaylistId');

    //     getValidAccessToken().then(function () {
    //         let limit = req.query.limit;
    //         let offset = req.query.offset;
    //         let playlist_id = req.query.playlist_id;

    //         return axios({
    //             url: 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks',
    //             params: {
    //                 offset: offset,
    //                 limit: limit,
    //             },
    //             headers: {
    //                 'Authorization': 'Bearer ' + access_token,
    //             },
    //         }).then(function (response) {
    //             res.send({
    //                 status: response.status,
    //                 data: response.data,
    //                 headers: response.headers,
    //             });
    //         }).catch(function (error) {
    //             return SPOError(res, error.response.status, 'getAllSongsByPlaylistId', 'The server could not retrieve the user\'s selected playlist. Please redirect the user to the login page.');
    //         });
    //     }).catch(function (error) {
    //         res.send(error);
    //         return error;
    //     });
    // });

    // attempt to get the users devices
    // app.get('/getdevices', cookieParser(), function (req, res) {
    //     console.log('/getdevices');

    //     getValidAccessToken().then(function () {
    //         return axios({
    //             url: 'https://api.spotify.com/v1/me/player/devices',
    //             headers: {
    //                 'Authorization': 'Bearer ' + access_token,
    //             },
    //         }).then(function (response) {
    //             console.log('Get devices succesfull!');
    //             console.log(response)

    //             res.send({
    //                 status: response.status,
    //                 data: response.data,
    //                 headers: response.headers,
    //             });
    //         })

    //             .catch(function (error) {
    //                 return SPOError(res, error.response.status, 'getdevices', 'The server could not retrieve the user\'s devices. Please redirect the user to the login page.');
    //             });
    //     }).catch(function (error) {
    //         res.send(error);
    //         return error;
    //     });
    // });