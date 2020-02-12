/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 *
 * This file should be ran on a server
 * consider if this should be a completely separate project, ( i think so ) since npm dependancies and location of the project are different.
 */



let express = require('express'); // Express web server framework
let request = require('request'); // "Request" library deprecated, replace with ajax? Maybe with bent? https://github.com/mikeal/bent

//bent, handles http requests to this server

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
    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    let generateRandomString = function (length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    let stateKey = 'spotify_auth_state';


    let app = express();

    app.use(express.static(__dirname))
        .use(cors())
        .use(cookieParser());

    //express routing path return
    app.get('/login', function (req, res) {
        console.log("/login called");
        let state = generateRandomString(16);
        res.cookie(stateKey, state);

        // your application requests authorization
        let scope = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    });

    app.get('/callback', function (req, res) {
        // your application requests refresh and access tokens
        // after checking the state parameter

        let code = req.query.code || null;
        let state = req.query.state || null;
        let storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            res.clearCookie(stateKey);
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


    app.get('/refresh_token', function (req, res) {

        // requesting access token from refresh token
        let refresh_token = req.query.refresh_token;
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))},
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };

        //replace this call by axios
        // request.post(authOptions, function (error, response, body) {
        //     if (!error && response.statusCode === 200) {
        //         let access_token = body.access_token;
        //         res.send({
        //             'access_token': access_token
        //         });
        //     }
        // });


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

    console.log('Listening on port ' + port + '   localhost:' + port);
    app.listen(port);
})();