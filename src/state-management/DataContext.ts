import { createContext } from "react";

interface ContextType {
    trackData: TrackPlot[];
    artistData: ArtistPlot[];
    yearData: MusikhjalpenYear[];
    isLoading: boolean;
  }

const DataContext = createContext<ContextType>({} as ContextType);

export default DataContext;