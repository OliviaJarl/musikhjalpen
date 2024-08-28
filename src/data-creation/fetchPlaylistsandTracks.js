"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var buffer_1 = require("buffer");
var fs = require("fs");
var path = require("path");
// Before running, create a map data in src and in this map a file musikhjalpenYears.json. After running, all files should be moved to data in public
//const client_id = 'a23ba4c1f71d4732aa1fbcc5f765203b'; // original, switching between two due to error 429. Choose one when running
var client_id = "5e60e02709bb4696b4a676be1f635b9e"; // new
//const client_secret = ''; // Add when running, original
var client_secret = ''; // Add when running, new
var baseEndPoint = "https://api.spotify.com/v1";
var userId = "ovvi";
var authHeader = 'Basic ' + buffer_1.Buffer.from(client_id + ':' + client_secret).toString('base64');
var authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams({
        'grant_type': 'client_credentials'
    })
};
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
// Make all requests
(0, axios_1.default)(authOptions)
    .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var token, playlists, _i, playlists_1, playlist, year, tracksAPIHref, filePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = response.data.access_token;
                console.log('Access Token:', token);
                return [4 /*yield*/, fetchMusikhjalpenPlaylists(token, baseEndPoint, userId)];
            case 1:
                playlists = _a.sent();
                _i = 0, playlists_1 = playlists;
                _a.label = 2;
            case 2:
                if (!(_i < playlists_1.length)) return [3 /*break*/, 6];
                playlist = playlists_1[_i];
                return [4 /*yield*/, sleep(10000)];
            case 3:
                _a.sent(); // Pause for ten seconds to make sure all calls will go through
                year = playlist.year;
                tracksAPIHref = playlist.tracks_api_href;
                filePath = createTracksFile(year);
                return [4 /*yield*/, fetchAllTracks(token, tracksAPIHref, filePath)];
            case 4:
                _a.sent();
                console.log("Finished this year");
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/];
        }
    });
}); })
    .catch(function (error) {
    console.error('Failed to retrieve access token:', error.response ? error.response.data : error.message);
});
function fetchMusikhjalpenPlaylists(token, baseEndPoint, user) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, endPoint, playlistObjects;
        return __generator(this, function (_a) {
            filePath = path.join(__dirname, '..', 'data', 'musikhjalpenYears.json');
            endPoint = "".concat(baseEndPoint, "/users/").concat(user, "/playlists");
            playlistObjects = [];
            return [2 /*return*/, axios_1.default
                    .get(endPoint, {
                    headers: {
                        Authorization: "Bearer ".concat(token),
                    },
                })
                    .then(function (response) {
                    var _a;
                    var playlists = response.data.items;
                    for (var _i = 0, playlists_2 = playlists; _i < playlists_2.length; _i++) {
                        var playlist = playlists_2[_i];
                        if (playlist.name.substring(0, 12) === 'Musikhjälpen') {
                            playlistObjects.push({
                                id: 0,
                                year: playlist.name.substring(13),
                                collected: 0,
                                startdatetime: "",
                                enddatetime: "",
                                theme: "",
                                city: "",
                                hosts: [],
                                travelling_hosts: [],
                                image: {
                                    src: "",
                                    copyright: "",
                                },
                                most_wished_artists: [],
                                most_wished_songs: [],
                                playlist_external_url: playlist.external_urls.spotify,
                                playlist_name: playlist.name,
                                playlist_id: playlist.id,
                                playlist_images: playlist.images,
                                total_tracks: playlist.tracks.total,
                                tracks_api_href: playlist.tracks.href,
                            });
                        }
                    }
                    var jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    (_a = jsonData.years).push.apply(_a, playlistObjects);
                    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
                    console.log('Fetched playlists!');
                    return playlistObjects;
                })
                    .catch(function (err) {
                    console.error(err);
                    return [];
                })];
        });
    });
}
function fetchTracksOfPlaylist(token, playlistEndPoint, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var trackObjects;
        return __generator(this, function (_a) {
            trackObjects = [];
            return [2 /*return*/, axios_1.default
                    .get(playlistEndPoint, {
                    headers: {
                        Authorization: "Bearer ".concat(token)
                    }
                })
                    .then(function (response) {
                    var _a;
                    var tracks = response.data.items;
                    for (var _i = 0, tracks_1 = tracks; _i < tracks_1.length; _i++) {
                        var trackResponse = tracks_1[_i];
                        var track = trackResponse.track;
                        trackObjects.push({
                            album_id: track.album.id,
                            album_name: track.album.name,
                            album_release_date: track.album.release_date,
                            album_uri: track.album.uri,
                            album_images: track.album.images,
                            album_external_urls: track.album.external_urls.spotify,
                            artists: track.artists,
                            duration_ms: track.duration_ms,
                            external_url: track.external_urls.spotify,
                            id: track.id,
                            name: track.name,
                            preview_url: track.preview_url,
                            uri: track.uri,
                        });
                    }
                    var jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    (_a = jsonData.tracks).push.apply(_a, trackObjects);
                    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
                    return response.data.next; // Return the next URL
                })
                    .catch(function (err) {
                    console.error(err);
                    return '';
                })];
        });
    });
}
function fetchAllTracks(token, playlistEndPoint, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var endPoint, nextEndPoint, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endPoint = "".concat(playlistEndPoint, "?market=SE&limit=50&offset=0");
                    _a.label = 1;
                case 1:
                    if (!(endPoint !== null)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fetchTracksOfPlaylist(token, endPoint, filePath)];
                case 3:
                    nextEndPoint = _a.sent();
                    endPoint = nextEndPoint;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 6];
                case 5: return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function createTracksFile(year) {
    var directoryPath = path.join(__dirname, '..', 'data');
    var fileName = "tracks".concat(year, ".json");
    var filePath = path.join(directoryPath, fileName);
    var data = {
        tracks: []
    };
    // Kontrollera om katalogen finns, annars skapa den
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log("File created at: ".concat(filePath));
    return filePath;
}
/*
To run in VS code:
tsc fetchPlaylistsandTracks.ts
node fetchPlaylistsandTracks.js
*/ 
