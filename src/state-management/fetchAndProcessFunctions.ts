import axios from "axios";


export async function fetchTrackData(year: string) : Promise<Track[]>{
  try {
    const response = await axios.get(`/data/tracks${year}.json`);
    const jsonData = response.data;
    const tracks: Track[] = jsonData.tracks;
    return tracks;
    
  } catch (error) {
    console.log(`Error loading data for the year ${year}:`, error);
    return [];
  }
}


export function trackOccurrence(tracks: Track[]): Map<string, TrackPlot> {
  const trackCount = new Map<string, TrackPlot>();

  tracks.forEach(track => {
    const existingEntry = trackCount.get(track.id);

    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      trackCount.set(track.id, {
        count: 1,
        name: track.name,
        id: track.id,
        artists: track.artists,
        external_url: track.external_url,
        album_images: track.album_images.length > 0 ? track.album_images[0].url : '',
        album_name: track.album_name,
      });
    }
  });

  return trackCount;
}



export function getSortedTracks(trackCount: Map<string, TrackPlot>, limit: number = 10): TrackPlot[] {
  const sortedArray = Array.from(trackCount.entries()).sort((a, b) => b[1].count - a[1].count);
  const limitedArray = sortedArray.slice(0, limit);
  
  // Returnerar en array av TrackPlot objekt
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return limitedArray.map(([_, trackPlot]) => trackPlot);
}


export function artistOccurence(tracks: Track[]): Map<string, ArtistPlot> {
  const artistCount = new Map<string, ArtistPlot>();

  tracks.forEach((track) => {
      track.artists.forEach((artist) => {
        if (artistCount.has(artist.id)) {
          const artistData = artistCount.get(artist.id)!;
          artistData.count += 1;
        } else {
          artistCount.set(artist.id, {
            count: 1,
            name: artist.name,
            id: artist.id,
            external_url: artist.external_urls.spotify
          });
        }
      });
    });
return artistCount;
}

export function sortArtistsByCount(artists: ArtistPlot[]): ArtistPlot[]  {
  const sortedArray = artists.sort((a, b) => b.count - a.count)
  return sortedArray.slice(0, 10);
}

export async function fetchTracksAllYears(): Promise<Track[]> {
  const years = [
    "2023", "2022", "2021", "2020", "2019", "2018",
    "2017", "2016", "2015", "2014", "2013", "2012",
    "2011", "2010", "2009", "2008",
  ];

  let allTracks: Track[] = [];

  for (const year of years) {
    try {
      const response = await axios.get(`/data/tracks${year}.json`);
      const jsonData = response.data;
      allTracks = allTracks.concat(jsonData.tracks);

    } catch (error) {
      console.error(`Error loading data for the year ${year}:`, error);
    }
  }

  return allTracks;
}

export async function fetchYearData() : Promise<MusikhjalpenYear[]>{
  try {
    const response = await axios.get(`/data/musikhjalpenYears.json`);
    const jsonData = response.data;
    const years: MusikhjalpenYear[] = jsonData.years;
    return years;
    
  } catch (error) {
    console.log(`Error loading data for the year:`, error);
    return [];
  }
}