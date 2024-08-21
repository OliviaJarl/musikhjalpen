import axios from 'axios';
import { Buffer } from 'buffer';
import * as fs from 'fs';
import * as path from 'path';


const client_id = 'a23ba4c1f71d4732aa1fbcc5f765203b'; // original
//const client_id = "5e60e02709bb4696b4a676be1f635b9e"; // new
const client_secret = '8b72a6405e194d689d065828dc4352d3'; // Ta bort sedan inför github, original
//const client_secret = 'c83ff3a1f3fa4ba096571c5f5814246d'; // new


const baseEndPoint = "https://api.spotify.com/v1";
const userId = "ovvi";

// Create the authorization header value
const authHeader = 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64');

// Define the request configuration for Axios
const authOptions = {
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

// Make all requests
axios(authOptions)
  .then(async response => {
    const token = response.data.access_token;
    console.log('Access Token:', token);
    const playlists = await fetchMusikhjalpenPlaylists(token, baseEndPoint, userId );
    for (const playlist of playlists) {
        const year: string = playlist.year;
        const tracksAPIHref = playlist.tracks_api_href;
        const filePath = createTracksFile(year);
        await fetchAllTracks(token, tracksAPIHref, filePath);
        console.log("Finished this year")
    }    
  })
  .catch(error => {
    console.error('Failed to retrieve access token:', error.response ? error.response.data : error.message);
});

async function fetchMusikhjalpenPlaylists(token: string, baseEndPoint: string, user: string): Promise<MusikhjalpenYear[]> {
    //const filePath = path.join(__dirname, 'data', 'musikhjalpenYears.json');
    const directoryPath = path.join(__dirname, '..', 'public', 'data');
    const fileName = 'musikhjalpenYears.json';
    const filePath = path.join(directoryPath, fileName);
    const endPoint = `${baseEndPoint}/users/${user}/playlists`;
    const playlistObjects: MusikhjalpenYear[] = [];
  
    return axios
      .get<PlaylistResponse>(endPoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const playlists: SimplifiedPlaylistObject[] = response.data.items;
        for (const playlist of playlists) {
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
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        jsonData.years.push(...playlistObjects);
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log('Fetched playlists!');
        return playlistObjects;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }
  


 async function fetchTracksOfPlaylist(token: string, playlistEndPoint: string,  filePath: string): Promise<string> {
    const trackObjects: Track[] = [];
  
    return axios
      .get<TrackResponse>(playlistEndPoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const tracks: PlaylistTrackObject[] = response.data.items;
        for (const trackResponse of tracks) {
          const track = trackResponse.track as TrackObject;
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
  
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        jsonData.tracks.push(...trackObjects);
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        return response.data.next; // Return the next URL
      })
      .catch((err) => {
        console.error(err);
        return '';
      });
  }


  async function fetchAllTracks(token: string, playlistEndPoint: string, filePath: string) {
    let endPoint: string | null = `${playlistEndPoint}?market=SE&limit=50&offset=0`;

    while (endPoint !== null) {
        try {
            const nextEndPoint = await fetchTracksOfPlaylist(token, endPoint, filePath);
            endPoint = nextEndPoint;
            
        } catch (error) {
            console.log(error);
            break;
        }
    }
  }

  function createTracksFile(year: string): string {
    const directoryPath = path.join(__dirname, '..', 'public', 'data');
    const fileName = `tracks${year}.json`;
    const filePath = path.join(directoryPath, fileName);
    
    const data = {
      tracks: []
    };
  
    // Kontrollera om katalogen finns, annars skapa den
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`File created at: ${filePath}`);
    return filePath;
  }
  
// TYPES
interface Image {
  height: number;
  url: string;
  width: number;
}
  interface PlaylistResponse {
    href: string, 
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: SimplifiedPlaylistObject[],
}

interface SimplifiedPlaylistObject {
    collaborative: boolean,
    description: string,
    external_urls: {spotify: string},
    href: string,
    id: string,
    images:  Image[],
    name: string,
    owner:
    {
        external_urls: {
          spotify: string,
        },
        followers: {
          href: string,
          total: number
        },
        href: string,
        id: string,
        type: string,// user
        uri: string,
        display_name: string
    } 
    public: boolean,
    snapshot_id: string,
    tracks: { 
        href: string,
        total: number,
      },
    type: string,
    uri: string,

}

interface MusikhjalpenYear {
        id: number,
        year: string,
        collected: number,
        startdatetime: string,
        enddatetime: string,
        theme: string,
        city: string,
        hosts: string[],
        travelling_hosts: string[],  
        image: {
          src: string,
          copyright: string
        },
        most_wished_songs: string[],
        most_wished_artists: string[],
        playlist_external_url: string,
        playlist_name: string,
        playlist_id: string,
        playlist_images:  Image[],
        total_tracks: number,
        tracks_api_href: string,
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

interface TrackResponse {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: PlaylistTrackObject[],

}

interface PlaylistTrackObject {
    added_at: string,
    added_by: {
        external_urls: {
          spotify: string,
        },
        href: string,
        id: string,
        type: string,
        uri: string
      },
    is_local: boolean,
    track: TrackObject | EpisodeObject
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
      images:  Image[],
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

  interface EpisodeObject {
    audio_preview_url: string,
    description: string,
    html_description: string,
    duration_ms: number,
    explicit: boolean,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images:  Image[],
    is_externally_hosted: boolean,
    is_playable: boolean,
    languages: string[],
    name: string,
    release_date: string,
    release_date_precision: string,
    resume_point: {
        fully_played: boolean,
        resume_position_ms: number,
    }
    type: string,
    uri: string,
    restrictions: {
        reason: string,
    }
    show: {
        available_markets: string[],
        copyrights: CopyrightObject[],
        description: string,
        html_description: string,
        explicit: boolean,
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        images:  Image[],
        is_externally_hosted: boolean,
        languages: string[],
        media_type: string,
        name: string,
        publisher: string,
        type: string,
        uri: string,
        total_episodes: number
    }
  }

  interface CopyrightObject {
    text: string,
    type: string
  }

  interface Track {
    album_id: string,
    album_name: string,
    album_release_date: string,
    album_uri: string,
    album_images: Image[],
    album_external_urls: string,
    artists: SimplifiedArtistObject[],
    duration_ms: number,
    external_url: string,
    id: string,
    name: string,
    preview_url: string,
    uri: string,
  }


  /*
  To run in VS code:
  tsc fetchPlaylistsandTracks.ts
  node fetchPlaylistsandTracks.js 
  */