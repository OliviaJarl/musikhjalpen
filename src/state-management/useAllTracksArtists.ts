import { useContext } from "react";
import AllTracksAndArtistContext from './AllTracksArtistsContext';

const useAllTracksArtists = () => useContext(AllTracksAndArtistContext);

export default useAllTracksArtists;