import { useParams } from "react-router";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import TrackInfo from "../components/TrackDetailPage/TrackInfo";
import {
  bottomMarginSection,
  bottomMarginHeading,
  sideMargins,
} from "../constants";
import useData from "../state-management/useData";
import VerticalBarChart from "../components/Charts/VerticalBarChart";
const TrackDetailPage = () => {
  const { id } = useParams<{ id?: string }>();
  const { trackData } = useData();
  const currentTrack = trackData.find(track => track.id === id) as TrackPlot;


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
        <Center marginBottom={bottomMarginSection}>
          <VerticalBarChart id={id} />
        </Center>
      </Flex>
    </>
  );
};

export default TrackDetailPage;
