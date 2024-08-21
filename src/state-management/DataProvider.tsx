import { useState, useEffect, ReactNode } from "react";
import DataContext from "./DataContext";
import {
  artistOccurence,
  fetchTracksAllYears,
  getSortedTracks,
  sortArtistsByCount,
  trackOccurrence,
  fetchYearData,
} from "./fetchAndProcessFunctions";

interface Props {
  children: ReactNode;
}

const DataProvider = ({ children }: Props) => {
  const [trackData, setTrackData] = useState<TrackPlot[]>([]);
  const [artistData, setArtistData] = useState<ArtistPlot[]>([]);
  const [yearData, setYearData] = useState<MusikhjalpenYear[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tracks: Track[] = await fetchTracksAllYears();
        const years: MusikhjalpenYear[] = await fetchYearData();

        const trackCount = trackOccurrence(tracks);
        const artistCount = artistOccurence(tracks);

        const sortedTracks = getSortedTracks(trackCount);
        const sortedArtists = sortArtistsByCount(
          Array.from(artistCount.values())
        );

        if (sortedTracks) {
          setTrackData(sortedTracks);
        }
        if (sortedArtists) {
          setArtistData(sortedArtists);
        }
        if (years) {
          setYearData(years);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ trackData, artistData, yearData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
