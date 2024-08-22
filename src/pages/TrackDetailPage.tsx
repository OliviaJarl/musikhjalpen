import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import TrackInfo from "../components/DetailPages/TrackInfo";
import {
  bottomMarginSection,
  bottomMarginHeading,
  sideMargins,
} from "../constants";
import {
  fetchAndProcessTrackData,
  fetchTracksAllYears,
} from "../state-management/fetchAndProcessFunctions";
import VerticalBarChart from "../components/Charts/VerticalBarChart";
import Loading from "../components/Loading";
import TrackInfoSkeleton from "../components/DetailPages/TrackInfoSkeleton";

const TrackDetailPage = () => {
  const [data, setData] = useState<PlotItem[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [isLocalLoading, setLocalLoading] = useState(true);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const trackCountData = await fetchAndProcessTrackData(id);
        const tracks: Track[] = await fetchTracksAllYears();
        const thisTrack = tracks.find((track) => track.id === id) as Track;
        setData(trackCountData);
        setCurrentTrack(thisTrack);
      } catch (error) {
        console.log(error);
      } finally {
        setLocalLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (!id) {
    console.log("ID not found");
  }

  return (
    <>
      <Flex flexDir="column" marginLeft={sideMargins} marginRight={sideMargins}>
        {isLocalLoading ? (
          <>
            <TrackInfoSkeleton />
            <Heading marginBottom={bottomMarginHeading} fontSize="xl">
              Number of plays each year
            </Heading>
            <Loading />
          </>
        ) : (
          <>
            <TrackInfo
              data={currentTrack}
              total={data.reduce((sum, item) => sum + item.count, 0)}
            />
            <Heading marginBottom={bottomMarginHeading} fontSize="xl">
              Number of plays each year
            </Heading>
            <Center marginBottom={bottomMarginSection} h="400px">
              <VerticalBarChart data={data}>
                {(item) =>
                  item.count > 0 ? (
                    <Text fontSize={{ base: "sm", lg: "md" }}>
                      {item.count}
                    </Text>
                  ) : (
                    <Text></Text>
                  )
                }
              </VerticalBarChart>
            </Center>
          </>
        )}
      </Flex>
    </>
  );
};

export default TrackDetailPage;
