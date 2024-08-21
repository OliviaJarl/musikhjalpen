import { useMemo } from "react";
import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import {
  sideMargins,
  bottomMarginHeading,
  bottomMarginSection,
} from "../constants";
import HorizontalBarChart from "../components/Charts/HorizontalBarChart";
import VerticalBarChart from "../components/Charts/VerticalBarChart";
import ChartLabel from "../components/Charts/ChartLabel";
import {
  processCityData,
  processHostData,
} from "../state-management/fetchAndProcessFunctions";
import useData from "../state-management/useData";
import Loading from "../components/Loading";

const StatisticsPage = () => {
  const { trackData, artistData, yearData, isLoading } = useData();

  const cityData = useMemo(() => processCityData(yearData), [yearData]);
  const hostData = useMemo(() => processHostData(yearData), [yearData]);
  const collectedData: PlotItem[] = useMemo(() => {
    return yearData.map((item) => ({
      year: item.year,
      count: item.collected,
    }));
  }, [yearData]);

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <VStack flexDir="column" margin={sideMargins} alignItems={"left"}>
          <Heading marginBottom={bottomMarginHeading} fontSize="xl">
            Million SEK collected
          </Heading>
          <Center marginBottom={bottomMarginSection}>
            <VerticalBarChart data={collectedData.reverse()}>
              {(item) => (
                <Text
                  transform={{ base: "rotate(-90deg)", md: "rotate(0deg)" }}
                  fontSize={{ base: "sm", lg: "md" }}
                  w={{
                    base: "10px",
                    sm: "15px",
                    md: "42px",
                    lg: "50px",
                    xl: "60px",
                  }}
                  whiteSpace="nowrap"
                  textAlign={{ base: "left", md: "center" }}
                  marginTop={10}
                >
                  {(item.count / 1000000).toFixed(2)}
                </Text>
              )}
            </VerticalBarChart>
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
      )}
    </>
  );
};

export default StatisticsPage;
