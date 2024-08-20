import { useEffect, useState } from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import {
  sideMargins,
  bottomMarginHeading,
  bottomMarginSection,
} from "../constants";
import CollectedYears from "../components/Charts/CollectedYears";
import HorizontalBarChart from "../components/Charts/HorizontalBarChart";
import ChartLabel from "../components/Charts/ChartLabel";
import {
  getSortedTracks,
  trackOccurrence,
  artistOccurence,
  sortArtistsByCount,
  fetchTracksAllYears,
} from "../components/Charts/fetchAndProcessFunctions";
import {
  processCityData,
  processHostData,
} from "../components/Charts/processCityHostData";

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
          <HorizontalBarChart data={processCityData()}>
            {(city) => <ChartLabel data={city} />}
          </HorizontalBarChart>
        </Center>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Recurring hosts
        </Heading>
        <Center marginBottom={bottomMarginSection}>
          <HorizontalBarChart data={processHostData()}>
            {(host) => <ChartLabel data={host} />}
          </HorizontalBarChart>
        </Center>
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
        <Center>
          <HorizontalBarChart data={artistData}>
            {(artist) => <ChartLabel data={artist} />}
          </HorizontalBarChart>
        </Center>
      </VStack>
    </>
  );
};

export default StatisticsPage;