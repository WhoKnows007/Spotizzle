/**
 server
 */

let express = require('express'); // Express web server framework
let request = require('request'); // "Request" library deprecated, replace with ajax? Maybe with bent? https://github.com/mikeal/bent


const host = 'localhost';
const productionStylesAndScripts = true; //either send minified/production ready, or send the dev/debug assets like css and js from node_modules

const axios = require('axios').default; //replace bent and require
// const getJSON = bent('json')
// const getBuffer = bent('buffer')
// let obj = await getJSON('http://site.com/json.api')
// let buffer = await getBuffer('http://site.com/image.png')


let port = 8888; //when changing this port, also update the redirect uri on the spotify developer dashboard
let cors = require('cors');
let querystring = require('querystring');
let cookieParser = require('cookie-parser');

let redirect_uri = 'http://localhost:' + port + '/callback'; // Your redirect uri (set in the spotify developer dashboard)

(async () => {

    // Generates a random string containing numbers and letters
    let generateRandomString = (length) => {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    let app = express();


    //redirect calls to a different directory, default directory is __dirname, enabling cors and cookieparser (not sure if still needed)
    app.use(express.static(__dirname))
        .use(cors())
        .use(cookieParser());

    if (productionStylesAndScripts) {
        app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // bootstrap.min.css
        app.use('/css', express.static(__dirname + '/css')); // my css
        app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // jquery.min.js
        app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); // popper.min.js
        app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // bootstrap.min.js
        app.use('/js', express.static(__dirname + '/script')); // my index.min.js (currently no minification file created)
    } else {
        app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // bootstrap.css
        app.use('/css', express.static(__dirname + '/css')); // my css
        app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // jquery.js
        app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); // popper.js
        app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // bootstrap.js
        app.use('/js', express.static(__dirname + '/script')); // my index.js
    }

    //express routing path return
    app.get('/login', function (req, res) {
        let state = generateRandomString(16);
        res.cookie('spotify_auth_state', state);

        // your application requests authorization
        let scope = 'streaming user-read-private user-read-email playlist-modify';

        // todo: redirect to other page if user declines spotify authorization, currently shows an error.

        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    });

    // app.get('/pages/index2', function(req, res) {
    //     //viewname can include or omit the filename extension
    //     res.render(__dirname + '/pages/index2.html');
    // });​​​​​​​​​​

    app.get('/authorize', function(req, res){
        var access_token = req.query.access_token;

        return axios({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token,
            },
        }).then(function (response) {
            res.send({
                status: response.status,
                data: response.data,
                headers: response.headers,
            });
        }).catch(function (error) {
            res.json(400, {'error': error})
        });


    });

    app.get('/callback', function (req, res) {
        // your application requests refresh and access tokens after checking the state parameter
        let code = req.query.code || null;
        let state = req.query.state || null;
        let storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;

        if (state === null || state !== storedState) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            res.clearCookie('spotify_auth_state');
            let authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    let access_token = body.access_token,
                        refresh_token = body.refresh_token;

                    let options = {
                        url: 'https://api.spotify.com/v1/me',
                        headers: {'Authorization': 'Bearer ' + access_token},
                        json: true
                    };

                    // use the access token to access the Spotify Web API
                    request.get(options, function (error, response, body) {
                        console.log(body);
                    });

                    // we can also pass the token to the browser to make requests from there
                    res.redirect('/#' +
                        querystring.stringify({
                            access_token: access_token,
                            refresh_token: refresh_token
                        }));
                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            });
        }
    });

    app.get('/getAllPlaylists', function (req, res) {
        var access_token = req.query.access_token;
        var limit = req.query.limit;
        var offset = req.query.offset;
        var user_id = req.query.user_id;

        return axios({
            url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
            params: {
                offset: offset,
                limit: limit
            },
            headers: {
                'Authorization': 'Bearer ' + access_token,
            },
        }).then(function (response) {
            res.send({
                status: response.status,
                data: response.data,
                headers: response.headers,
            });
        }).catch(function (error) {
            res.json(400, {'error': error})
        });
    });

    app.get('/getAllSongsByPlaylistId', function (req, res) {
        var access_token = req.query.access_token;
        var limit = req.query.limit;
        var offset = req.query.offset;
        var playlist_id = req.query.playlist_id;

        return axios({
            url: 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks',
            params: {
                fields: [],
                offset: offset,
                limit: limit
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
        }).then(function (response) {
            res.send({
                status: response.status,
                data: response.data,
                headers: response.headers,
            });
        }).catch(function (error) {
            res.json(400, {'error': error})
        });

    });

    app.get('/refresh_token', function (req, res) {
        // requesting access token from refresh token
        let refresh_token = req.query.refresh_token;

        function a() {
            return axios({
                url: 'https://accounts.spotify.com/api/token',
                method: 'post',
                params: {
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                auth: {
                    username: client_id,
                    password: client_secret
                }
            }).then(function (response) {
                let access_token = response.data.access_token;
                res.send({
                    'access_token': access_token
                });
            }).catch(function (error) {
                //show error
                console.log("Error: " + error.message);
                console.log("Description: " + error.response.data.error_description);
            });
        }

        // add beforesend? with loader and always to hide
        axios.all([a()])
            .then(axios.spread(function () {
                console.log("done");
            }));
    });


    app.listen(port, function () {
        console.log(`Server running on http://${host}:${port}`)
    });
})();

async function asyncAxiosRequest() {

}