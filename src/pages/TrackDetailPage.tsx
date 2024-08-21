import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import TrackInfo from "../components/DetailPages/TrackInfo";
import {
  bottomMarginSection,
  bottomMarginHeading,
  sideMargins,
} from "../constants";
import useData from "../state-management/useData";
import { fetchTrackData } from "../state-management/fetchAndProcessFunctions";
import VerticalBarChart from "../components/Charts/VerticalBarChart";

const TrackDetailPage = () => {
  const [data, setData] = useState<PlotItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id?: string }>();
  const { trackData } = useData();
  const currentTrack = trackData.find((track) => track.id === id) as TrackPlot;

  useEffect(() => {
    const fetchData = async () => {
      const years = Array.from({ length: 16 }, (_, index) =>
        (2008 + index).toString()
      );

      // Initialize the array of PlotItems with year and count 0
      const yearCountArray: PlotItem[] = years.map((year) => ({
        year: year,
        count: 0,
      }));

      for (const year of years) {
        const tracks: Track[] = await fetchTrackData(year);

        const count = tracks.filter((track) => track.id === id).length;

        const yearItem = yearCountArray.find((item) => item.year === year);
        if (yearItem) {
          yearItem.count = count;
        }
      }

      setData(yearCountArray);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (!id) {
    return <Text>Error: ID not found</Text>;
  }

  return (
    <>
      <Flex flexDir="column" marginLeft={sideMargins} marginRight={sideMargins}>
        <TrackInfo data={currentTrack} />
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Number of plays each year
        </Heading>
        <Center marginBottom={bottomMarginSection} h="400px">
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <VerticalBarChart data={data}>
              {(item) =>
                item.count > 0 ? (
                  <Text
                    fontSize={{ base: "sm", lg: "md" }}
                  >
                    {item.count}
                  </Text>
                ) : (
                  <Text></Text>
                )
              }
            </VerticalBarChart>
          )}
        </Center>
      </Flex>
    </>
  );
};

export default TrackDetailPage;
