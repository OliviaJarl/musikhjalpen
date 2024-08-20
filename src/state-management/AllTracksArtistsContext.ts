import { createContext } from "react";

interface ContextType {
    trackData: TrackPlot[];
    artistData: ArtistPlot[];
  }

const AllTracksAndArtistContext = createContext<ContextType>({} as ContextType);

export default AllTracksAndArtistContext;