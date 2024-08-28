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



export function getSortedTracks(trackCount: Map<string, TrackPlot>): TrackPlot[] {
  const sortedArray = Array.from(trackCount.entries()).sort((a, b) => b[1].count - a[1].count);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return sortedArray.map(([_, trackPlot]) => trackPlot);
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
  return sortedArray;
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

export async function fetchAndProcessArtistData(id: string) : Promise<PlotItem[]> {
    const years = Array.from({ length: 16 }, (_, index) =>
      (2008 + index).toString()
    );
    const artistCountArray: PlotItem[] = years.map((year) => ({
      year: year,
      count: 0,
    }));

    for (const year of years) {
      const tracks: Track[] = await fetchTrackData(year);

      for (const track of tracks) {
        for (const artist of track.artists) {
          if (id === artist.id) {
            const yearItem = artistCountArray.find(
              (item) => item.year === year
            );
            if (yearItem) {
              yearItem.count += 1;
            }
          }
        }
      }
    }
    return artistCountArray;
}

export async function fetchAndProcessTrackData(id: string) : Promise<PlotItem[]> {
  const years = Array.from({ length: 16 }, (_, index) =>
    (2008 + index).toString()
  );

  // Initialize the array of PlotItems with year and count 0
  const yearCountArray: PlotItem[] = years.map((year) => ({
    year: year,
    count: 0,
  }));

  for (const year of years) {
    const tracks: Track[] = await fetchTrackData(year);

    const count = tracks.filter((track) => track.id === id).length;

    const yearItem = yearCountArray.find((item) => item.year === year);
    if (yearItem) {
      yearItem.count = count;
    }
  }
  return yearCountArray;
}

export function processCityData(data: MusikhjalpenYear[]) : City[] {
  const cityCountMap = new Map<string, number>();
  
  data.forEach((year: MusikhjalpenYear) => {
  const currentCity = year.city;
  if (cityCountMap.has(currentCity)) {
    cityCountMap.set(currentCity, cityCountMap.get(currentCity)! + 1);
  } else {
    cityCountMap.set(currentCity, 1);
  }
});

const citiesArray: City[] = Array.from(cityCountMap.entries()).map(
  ([name, count]) => ({
    name,
    count,
  })
);
const cities = citiesArray
  .sort((a, b) => b.count - a.count)
  .slice(0, citiesArray.length);

  return cities;
}


export function processHostData(data: MusikhjalpenYear[]) : Host[] {
const hostCountMap = new Map<string, number>();
data.forEach((year: MusikhjalpenYear) => {
  year.hosts.forEach((host: string) => {
    if (hostCountMap.has(host)) {
      hostCountMap.set(host, hostCountMap.get(host)! + 1);
    } else {
      hostCountMap.set(host, 1);
    }
  });
});

const hostsArray: Host[] = Array.from(hostCountMap.entries()).map(
  ([name, count]) => ({
    name,
    count,
  })
);

const hosts = hostsArray.sort((a, b) => b.count - a.count).slice(0, 7);
return hosts;
}