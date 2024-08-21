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
import useData from "../state-management/useData";
import Loading from "../components/Loading";

const HomePage = () => {
  const { trackData, artistData, isLoading } = useData();
  return (
    <>
      <Flex flexDir="column" marginLeft={sideMargins} marginRight={sideMargins}>
        <Landing />
        <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
          Top years
        </Heading>
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
            <Center>
              <HorizontalBarChart data={artistData}>
                {(artist) => <ChartLabel data={artist} />}
              </HorizontalBarChart>
            </Center>
          </>
        )}
      </Flex>
    </>
  );
};

export default HomePage;
