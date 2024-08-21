interface Image {
    height: number;
    url: string;
    width: number;
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
  id: string,
  artists: SimplifiedArtistObject[];
  external_url: string;
  album_images: string;
  album_name: string;
}

interface PlotItem {
  count: number;
  year: string;
}

interface ArtistPlot {
  count: number;
  name: string;
  id: string;
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