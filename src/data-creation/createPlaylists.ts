import axios from "axios";
import { stringSimilarity } from "string-similarity-js";

const clientId = "a23ba4c1f71d4732aa1fbcc5f765203b"; // Original, switching between two due to error 429. Choose one when running
//const clientId = "5e60e02709bb4696b4a676be1f635b9e"; // New

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

const baseEndPoint = "https://api.spotify.com/v1";
const userId = "ovvi";

// Do four at time, all years can be found in the bottom of this document
const musikhjalpen: Musikhjalpen[] = [
    {
        year: "2020",
        startdatetime: "2020-12-14T20:02:00Z",
        enddatetime: "2020-12-20T21:00:00Z",
    },
    {
        year: "2021",
        startdatetime: "2021-12-13T19:02:00Z",
        enddatetime: "2021-12-19T21:00:00Z",
    },
    {
        year: "2022",
        startdatetime: "2022-12-12T20:10:00Z",
        enddatetime: "2022-12-18T21:00:00Z",
    },
    {
        year: "2023",
        startdatetime: "2023-12-11T20:10:00Z",
        enddatetime: "2023-12-17T21:00:00Z",
    }
]

// When the page loads, check if there is a code in the callback query string
if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);

    for (const musikhjalpenYear of musikhjalpen) {

        const songList = await getAllSongs(musikhjalpenYear.startdatetime, musikhjalpenYear.enddatetime);

        const playlistId = await createPlaylist(accessToken, baseEndPoint, userId, musikhjalpenYear.year); // Create playlist

        const uriResult = await searchSongs(accessToken, baseEndPoint, songList, musikhjalpenYear.year);

        const chunkedUriResult = divideIntoChunks(uriResult, 100);
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        if (playlistId) {
            for (const chunk of chunkedUriResult) {
                await addSongs(accessToken, baseEndPoint, chunk, playlistId);
                await sleep(10000);  // Pause for ten seconds to make sure all calls will go through
            }
        }
    }
}
// FUNCTIONS USED IN THIS SCRIPT
// SPOTIFY AUTH FUNCTIONS
export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId: string, code: string): Promise<string> {

    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;

}


// FUNCTIONS TALKING TO THE SPOTIFY API TO CREATE PLAYLISTS, SEARCH SONGS, AND ADD SONGS
async function createPlaylist(token: string, baseEndPoint: string, userId: string, year: string): Promise<string | null> {
    const endPoint = `${baseEndPoint}/users/${userId}/playlists`;
    const data = {
        name: `Musikhjälpen ${year}`,
        public: true,
        description: `Playlist for the songs played during the radio and tv show Musikhjälpen ${year}`,
    };

    return axios.post(endPoint, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
    })
    .then(response => {
        const playlistId: string = response.data.id;
        console.log("Playlist created")
        return playlistId;
    })
    .catch(error => {
        console.error('Error creating playlist:', error);
        return null;
    });
}

async function searchSongs(token: string, baseEndPoint: string, songs: string[], year: string): Promise<string[]> {
    console.log("Search songs")
    const songURIs: string[] = [];

    for (const song of songs) {
        const editedSR = SREditSearchString(song, year);
        const artist = editedSR[0];
        const title = editedSR[1];
        const searchUri: string = encodeURIComponent(title + " " + artist.split('(')[0].trim() );
        const endPoint: string = `${baseEndPoint}/search?q=${searchUri}&type=track&market=SE&limit=3`;

        await axios.get<SearchResponse>(endPoint, {headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }}).then((response) => {
            const topTracks = response.data.tracks.items;
            const trackUri : string | undefined = selectTrackURI(topTracks, artist, title);
            if (trackUri) {
                songURIs.push(trackUri);
            } else {
                console.log('The following track not found: ' + song);
            }

        }).catch(error => console.log('ERROR fetching data:', error))
    }
    return songURIs;
}
// Can only add 100 songs at a time to a playlist, so divided the songs into chunks 
function divideIntoChunks(array: string[], size: number): string[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

async function addSongs(token: string, baseEndPoint: string, songsURIs: string[], playlistId: string): Promise<void> {
    const endPoint = baseEndPoint+ "/playlists/" + playlistId + "/tracks";
    console.log("Add songs");

    const data = JSON.stringify({
        uris: songsURIs
      });

        axios.post(endPoint, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error adding songs to playlist:', error);
        });
}

// Function to select the track with the highest correctness, if the correctness is high enough
function selectTrackURI(topTracks: TrackObject[], artist: string, title: string) : string | undefined{
    if (topTracks.length === 0) {
        return undefined;
    }
    adjustArtistLength(artist, topTracks[0].artists.length)
    let trackUri: string | undefined = topTracks[0].uri;
    let topCorrectness: number = checkSongCorrectness(adjustArtistLength(artist, topTracks[0].artists.length), title, joinArtists(topTracks[0].artists), topTracks[0].name);
        
    for (let i = 1; i < topTracks.length; i++) {
        if (topTracks[i].artists) {
            const currentCorrectness = checkSongCorrectness(adjustArtistLength(artist, topTracks[i].artists.length), title, joinArtists(topTracks[i].artists), topTracks[i].name);
            if (currentCorrectness > topCorrectness) {
                topCorrectness = currentCorrectness;
                trackUri = topTracks[i].uri;
            }
        }
    }
    if (topCorrectness > 0.6) {
        return trackUri;
    } else {
        return undefined;
    }
}
// Compares how well the SR response aligns with a Spotify search response
function checkSongCorrectness(artist: string, title: string, searchArtist: string, searchTitle: string): number {
    // Spotify and SR add feat and with differently for the same song, so remove this for a more fair comparsion
    const searchTitleEdited = searchTitle.split(/(\s?\[.*|\s?\(feat\.|\s?\(with).*/)[0].trim();
    const titleEdited = title.split(/(\s?\[.*|\s?\(feat\.|\s?\(with).*/)[0].trim();
    const artistEdited = artist.split('(')[0].trim(); // SR sometimes add (SV) or similar to the artists

    const artistSimilarity = stringSimilarity(artistEdited, searchArtist.toLowerCase());
    const titleSimilarity = stringSimilarity(titleEdited, searchTitleEdited.toLowerCase());

    return ((artistSimilarity * 0.5 + titleSimilarity * 0.5)); 
}

function joinArtists(searchArtists: SimplifiedArtistObject[]) : string {
    if (searchArtists.length === 0) return "";
    return searchArtists.map(artist => artist.name).join(", ");
}

// Since SR sometimes writes all the involved people in the artist field, artist sometimes needs to be adjusted to make a good comparsion more likley
function adjustArtistLength(artistString: string, artistLength: number): string {
    const artistsArray = artistString.split(", ");

    // If artistLength is bigger than the number of artist in artistString, return all of them
    if (artistLength >= artistsArray.length) {
        return artistString;
    }
    const truncatedArtists = artistsArray.slice(0, artistLength);
    return truncatedArtists.join(", ");
}


// This function edits the artist and title from SR since they sometimes write their data in a way that make the search more difficult
function SREditSearchString(song: string, year: string) : string[] {
    // The artist and title are split with a hyphen, but sometimes there is also a hyphen between the artist. Therefore, split at the last hyphen
    const unEditedArtists = song.substring(0, song.lastIndexOf(" - ")).toLowerCase(); // Lower case to make the comparsions more smooth
    let title = song.substring(song.lastIndexOf(" - ") + 3).toLowerCase();
    
    // Some titles between the years 2008-2009 are written in different ways, seperated by a comma
    if (year === ("2008" || "2009" || "2010")) {
        title = title.split(',')[0].trim();
    }
    // If the artist is several artists are they divided by either with ",", "&", "/ ", "featuring" eller "|"
    const artists: string[] = unEditedArtists.toLowerCase().split(/, | & | \/ | featuring | \| /);
    
    // Some artist contains content in parentheses that needs to be removed, for example "THE STREETS (GB) (2)"
    const removeParentheses = (artist: string) => {
        return artist.replace(/\s*\([^)]*\)/g, '').trim();
    };

    const artistNoParentheses: string[] = artists.map(artist => removeParentheses(artist));
    let artist = artistNoParentheses.join(","); // Make it to one string again witht the same divider ","

    // Special cases that have been discovered by controlling the error output
    if (artist === "sven melander, åke cato" ) {
        artist = "werner & werner"
    } else if (artist === "darin zanyar") {
        artist = "darin"
    } else if ((artist === "anna järvinen, melody mlub") || (artist === "anna järvinen" && title === "i don't believe in angels")) {
        artist = "melody club"
    } else if (artist === "björk gudmundsdottir") {
        artist = "björk"
    } else if (title === "tnt") {
        title = "t.n.t"
    } else if (artist === "justice" && title === "dance") {
        title = "d.a.n.c.e"
    } else if (artist === "magnus tingsek") {
        artist = "tingsek"
    } else if (artist === "pink") {
        artist = "p!nk"
    } else if (artist === "nerd") {
        artist = "n.e.r.d"
    } else if (artist === "rem") {
        artist = "r.e.m."
    } else if (artist === "tatu") {
        artist = "t.a.t.u"
    }  else if (artist === "mia" && (title === "bucky done gun" || title === "paper planes")) {
        artist = "m.i.a."
    } else if (artist === "varanteatern" && title === "achtung x-mas") {
        artist = "tyskarna från lund"
    } else if ((artist === "john jacobson" && title === "scene 1") || (artist === "general sounds") && title === "doorbell 1") {
        artist = "The ringbell of the door";
        title = "Ringbell sound, ignore"
    } else if ( title === "seitenwechsel!"|| artist === "kommissar kugelblitz") {
        artist = "The ringbell of the door";
        title = "Another ringbell sound, ignore"
    }

    return [artist.trim(), title.trim()]
}


// SR SONG LISTS FETCHING FUNCTIONS
async function fetchSongsSR(currentTime: Date, showStopTime: string) {

    const id = 164; // The id of the channel P3
    const format = "json";
    const size = 200;
    
    const endDateTimeCondition = new Date(currentTime.getTime() + 18 * 60 * 60 * 1000);
    const showStopCondition = new Date(showStopTime.substring(0,10) + "T00:01:00Z");


    const params = {
        id: id,
        startdatetime: currentTime.toISOString().slice(0, -5) + "Z",
        enddatetime: endDateTimeCondition.toISOString(),
        size: size,
        format: format,
    };
    
    if (currentTime > showStopCondition) {
        params.enddatetime = showStopTime;
    } 
    
    return axios.get<SRResponse>("https://api.sr.se/api/v2/playlists/getplaylistbychannelid", { params: params })
    .then(response => {

        const fetchSongs = response.data.song;

        const allSongs = fetchSongs.flat();

        const descriptions = allSongs.map((song: SongResponse) => song.description);


        const latestSongEndTime = fetchSongs[0].stoptimeutc;
        const milliseconds = parseInt(latestSongEndTime.substring(6, latestSongEndTime.length - 2));

        currentTime.setTime(milliseconds + 60 * 60 * 1000); 
        return {
            currentTime,
            descriptions
        };
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
}


async function getAllSongs(showStartTime: string, showStopTime: string): Promise<string[]> {
    let currentTime = new Date(showStartTime);
    const endTime = new Date(showStopTime);

    const songArray: string[][] = [];

    while (currentTime.getTime() + (60 * 60 * 1000) < endTime.getTime()) {
        try {
            const result = await fetchSongsSR(currentTime, showStopTime);
            currentTime = result.currentTime;
            songArray.unshift(result.descriptions);

        } catch (error) {
            console.log(error);
            break;
        }
    }
    console.log(songArray.flat().length);
    return songArray.flat();
}

// TYPES IN THIS SCRIPT
interface Musikhjalpen {
    year: string,
    startdatetime: string,
    enddatetime: string,
}
// SR TYPES
interface SRResponse {
    copyright: string,
    song: SongResponse[],
}
interface SongResponse {
    title: string,
    description: string,
    artist: string,
    composer: string,
    conductor: string,
    albumname: string,
    recordlabel: string,
    lyricist: string,
    producer: string,
    starttimeutc: string,
    stoptimeutc: string
}


// SPOTIFY TYPES
interface Image {
    height: number;
    url: string;
    width: number;
}

interface TrackObject {
    album: {
      album_type: string,
      total_tracks: number,
      available_markets: string[],
      external_urls: {
        spotify: string,
      },
      href: string,
      id: string,
      images: Image[],
      name: string,
      release_date: string,
      release_date_precision: string,
      restrictions: {
        reason: string,
      },
      type: string,
      uri: string,
      artists: SimplifiedArtistObject[],
    },
    artists: SimplifiedArtistObject[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
      isrc: string,
      ean: string,
      upc: string
    },
    external_urls: {
      spotify: string
    },
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: {
        external_urls: {
            spotify: string
          },
          href: string,
          id: string,
          type: string,
          uri: string          
    },
    restrictions: {
      reason: string
    },
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string,
    is_local: boolean
  }

interface SearchResponse {
    tracks: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: TrackObject[],
    },
    artists: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: TrackObject[],
    },
    albums: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: TrackObject[],
    },
    playlists: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: TrackObject[],
    },
    shows: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: TrackObject[],
    },
    episodes: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: TrackObject[],
    },
    ausioBooks: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: TrackObject[],
    }
}

interface SimplifiedArtistObject {
        external_urls: {
          spotify: string
        },
        href: string,
        id: string,
        name: string,
        type: string,
        uri: string
}

// MUSIKHJALPEN-YEARS

/*

const musikhjalpen: Musikhjalpen[] = [
    {
        year: "2008",
        startdatetime: "2008-12-13T19:10:00Z",
        enddatetime: "2008-12-19T19:10:00Z",
        
    },
    {
        year: "2009",
        startdatetime: "2009-12-14T17:00:00Z",
        enddatetime: "2009-12-20T17:00:00Z",
        
    },
    {
        year: "2010",
        startdatetime: "2010-12-13T16:00:00Z",
        enddatetime: "2010-12-19T20:00:00Z",
    },
    {
        year: "2011",
        startdatetime: "2011-12-12T18:00:00Z",
        enddatetime: "2011-12-18T18:11:00Z",
        
    },
    {
        year: "2012",
        startdatetime: "2012-12-10T20:10:00Z",
        enddatetime: "2012-12-16T20:30:00Z",
    },
    {
        year: "2013",
        startdatetime: "2013-12-09T21:30:00Z",
        enddatetime: "2013-12-15T21:00:00Z",
    },
    {
        year: "2014",
        startdatetime: "2014-12-08T22:00:00Z",
        enddatetime: "2014-12-14T22:30:00Z",
    },
    {
        year: "2015",
        startdatetime: "2015-12-13T16:03:00Z",
        enddatetime: "2015-12-19T22:30:00Z",
    },
    {
        year: "2016",
        startdatetime: "2016-12-12T20:03:00Z",
        enddatetime: "2016-12-18T21:00:00Z",
    },
    {
        year: "2017",
        startdatetime: "2017-12-11T20:03:00Z",
        enddatetime: "2017-12-17T20:00:00Z",
    },
    {
        year: "2018",
        startdatetime: "2018-12-10T20:02:00Z",
        enddatetime: "2018-12-16T21:00:00Z",
    },
    {
        year: "2019",
        startdatetime: "2019-12-09T21:03:00Z",
        enddatetime: "2019-12-15T21:00:00Z",
    },
    {
        year: "2020",
        startdatetime: "2020-12-14T20:02:00Z",
        enddatetime: "2020-12-20T21:00:00Z",
    },
    {
        year: "2021",
        startdatetime: "2021-12-13T19:02:00Z",
        enddatetime: "2021-12-19T21:00:00Z",
    },
    {
        year: "2022",
        startdatetime: "2022-12-12T20:10:00Z",
        enddatetime: "2022-12-18T21:00:00Z",
    },
    {
        year: "2023",
        startdatetime: "2023-12-11T20:10:00Z",
        enddatetime: "2023-12-17T21:00:00Z",
    }
]*/