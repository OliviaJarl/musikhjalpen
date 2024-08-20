import { useMemo } from "react";
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
  processCityData,
  processHostData,
} from "../state-management/processCityHostData";
import useAllTracksArtists from "../state-management/useAllTracksArtists";

const StatisticsPage = () => {
  const { trackData, artistData } = useAllTracksArtists();

  const cityData = useMemo(() => processCityData(), []);
  const hostData = useMemo(() => processHostData(), []);

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
          <HorizontalBarChart data={cityData}>
            {(city) => <ChartLabel data={city} />}
          </HorizontalBarChart>
        </Center>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Recurring hosts
        </Heading>
        <Center marginBottom={bottomMarginSection}>
          <HorizontalBarChart data={hostData}>
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
