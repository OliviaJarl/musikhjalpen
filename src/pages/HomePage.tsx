import { Center, Flex, Heading } from "@chakra-ui/react";
import Landing from "../components/Landing";
import TopYears from "../components/TopYears";
import {
  sideMargins,
  bottomMarginHeading,
  bottomMarginSection,
} from "../constants";
import { useEffect, useState } from "react";
import {
  getSortedTracks,
  trackOccurrence,
  artistOccurence,
  sortArtistsByCount,
  fetchTracksAllYears,
} from "../components/Charts/fetchAndProcessFunctions";

import HorizontalBarChart from "../components/Charts/HorizontalBarChart";
import ChartLabel from "../components/Charts/ChartLabel";

const HomePage = () => {
  // Fetch and process relevant data needed for the track and artist bar charts
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
    <>
      <Flex flexDir="column" marginLeft={sideMargins} marginRight={sideMargins}>
        <Landing />
        <TopYears />
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Top tracks of all years
        </Heading>
        <Center marginBottom={bottomMarginSection}>
          <HorizontalBarChart data={trackData}>
            {(track) => <ChartLabel data={track} />}
          </HorizontalBarChart>
        </Center>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Top artists of all years
        </Heading>
        <Center marginBottom={bottomMarginSection}>
          <HorizontalBarChart data={artistData}>
            {(artist) => <ChartLabel data={artist} />}
          </HorizontalBarChart>
        </Center>
      </Flex>
    </>
  );
};

export default HomePage;
