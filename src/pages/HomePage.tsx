import { Center, Flex, Heading } from "@chakra-ui/react";
import Landing from "../components/Landing";
import TopYears from "../components/TopYears";
import {
  sideMargins,
  bottomMarginHeading,
  bottomMarginSection,
} from "../constants";
import HorizontalBarChart from "../components/Charts/HorizontalBarChart";
import ChartLabel from "../components/Charts/ChartLabel";
import useAllTracksArtists from "../state-management/useAllTracksArtists";

const HomePage = () => {
  const { trackData, artistData } = useAllTracksArtists();
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
