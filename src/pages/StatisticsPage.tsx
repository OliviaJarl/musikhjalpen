import { Center, Heading, VStack } from "@chakra-ui/react";
import {
  sideMargins,
  bottomMarginHeading,
  bottomMarginSection,
} from "../constants";
import CollectedYears from "../components/Charts/CollectedYears";
import BarChartArtists from "../components/Charts/BarChartArtists";
import BarChartTracks from "../components/Charts/BarChartTracks";

import { useEffect, useState } from "react";
import {
  getSortedTracks,
  trackOccurrence,
  artistOccurence,
  sortArtistsByCount,
  fetchTracksAllYears,
} from "../components/Charts/fetchAndProcessFunctions";
import BarChartHosts from "../components/Charts/BarChartHosts";
import BarChartCities from "../components/Charts/BarChartCities";
//import BarChartCollected from "../components/Charts/BarChartCollected";

const StatisticsPage = () => {
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
      <VStack flexDir="column" margin={sideMargins} alignItems={"left"}>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Money collected
        </Heading>
        <Center marginBottom={bottomMarginSection}>
          <CollectedYears />
        </Center>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Top cities
        </Heading>
        <Center marginBottom={bottomMarginSection}>
          <BarChartCities />
        </Center>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Recurring hosts
        </Heading>
        <Center marginBottom={bottomMarginSection}>
          <BarChartHosts />
        </Center>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Top tracks of all years
        </Heading>
        <Center marginBottom={bottomMarginSection}>
          <BarChartTracks data={trackData} />
        </Center>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Top artists of all years
        </Heading>
        <Center>
          <BarChartArtists data={artistData} />
        </Center>
      </VStack>
    </>
  );
};

export default StatisticsPage;
