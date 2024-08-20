interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

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
    images: typeof Image[],
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
    tracks: { // A collection containing a link ( href ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the total number of tracks in the playlist. 
        href: string,
        total: number,
      },
    type: string, // playlist
    uri: string,

}

interface PlaylistJSon {
    external_url: string,
    description: string,
    name: string,
    id: string,
    images: typeof Image[],
    total_tracks: number,
    href_tracks: string,
    uri: string, // kanske ta bort
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
      images: typeof Image[],
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
    images: typeof Image[],
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
        images: typeof Image[],
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

  interface TrackJSON {
    album_id: string,
    album_name: string,
    album_release_date: string,
    album_uri: string,
    album_images: typeof Image[],
    album_external_urls: string,
    artists: SimplifiedArtistObject[],
    duration_ms: number,
    external_url: string,
    id: string,
    name: string,
    preview_url: string,
    uri: string,
  }




interface Musikhjalpen {
    year: string,
    startdatetime: string,
    enddatetime: string,
}
/*
interface MusikhjalpenYear {
    id: number,
    year: string;
    startdatetime: string;
    enddatetime: string;
    theme: string;
    city: string;
    hosts: string[];
    collected: number;
    playlist_url: string;
    tracklist_url: string;
    image: string;
    most_wished_songs: string[];
  }
*/
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
  playlist_images: Image[],
  total_tracks: number,
  tracks_api_href: string,
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

// PLOT TYPES
interface TrackPlot {
  count: number;
  name: string;
  artists: SimplifiedArtistObject[];
  external_url: string;
  album_images: string;
}


interface ArtistPlot {
  count: number;
  name: string;
  external_url: string;
}

interface Host {
  name: string;
  count: number;
}

interface City {
  name: string;
  count: number;
}