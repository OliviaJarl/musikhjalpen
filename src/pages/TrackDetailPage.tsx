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
import { fetchAndProcessTrackData } from "../state-management/fetchAndProcessFunctions";
import VerticalBarChart from "../components/Charts/VerticalBarChart";

const TrackDetailPage = () => {
  const [data, setData] = useState<PlotItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id?: string }>();
  const { trackData } = useData();
  const currentTrack = trackData.find((track) => track.id === id) as TrackPlot;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const trackCountData = await fetchAndProcessTrackData(id);
      setData(trackCountData);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (!id) {
    console.log("ID not found");
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
                  <Text fontSize={{ base: "sm", lg: "md" }}>{item.count}</Text>
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
