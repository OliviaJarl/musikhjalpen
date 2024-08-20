import { useState, useEffect, ReactNode } from 'react';
import AllTracksAndArtistContext from './AllTracksArtistsContext';
import { artistOccurence, fetchTracksAllYears, getSortedTracks, sortArtistsByCount, trackOccurrence } from './fetchAndProcessFunctions';


interface Props {
  children: ReactNode;
}

const AllTracksArtistsProvider = ({children} : Props) => {
  const [trackData, setTrackData] = useState<TrackPlot[]>([]);
  const [artistData, setArtistData] = useState<ArtistPlot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tracks: Track[] = await fetchTracksAllYears();

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
    };
    fetchData();
  }, []);
  return (
    <AllTracksAndArtistContext.Provider value={{trackData, artistData}}>{children}</AllTracksAndArtistContext.Provider>
  )
}

export default AllTracksArtistsProvider


