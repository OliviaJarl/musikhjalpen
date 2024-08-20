import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Box, Center, Heading, Flex, Text } from "@chakra-ui/react";
//import TrackInfo from "../components/TrackDetailPage/TrackInfo";
import {
  bottomMarginSection,
  bottomMarginHeading,
  sideMargins,
} from "../constants";
import { fetchTrackData } from "../state-management/fetchAndProcessFunctions";
//import useData from "../state-management/useData";
//import VerticalBarChart from "../components/Charts/VerticalBarChart";
const ArtistDetailPage = () => {
  const { id } = useParams<{ id?: string }>();

  const [artistCountPerYear, setArtistCountPerYear] = useState<
    Map<string, number>
  >(new Map());

  useEffect(() => {
    const fetchData = async () => {
      const years = Array.from({ length: 16 }, (_, index) =>
        (2008 + index).toString()
      );

      const artistCountMap = new Map<string, number>(
        years.map((year) => [year, 0])
      );

      for (const year of years) {
        const tracks: Track[] = await fetchTrackData(year);

        for (const track of tracks) {
          for (const artist of track.artists) {
            if (id === artist.id) {
              const currentCount = artistCountMap.get(id) || 0;
              artistCountMap.set(year, currentCount + 1);
            }
          }
        }
      }
      setArtistCountPerYear(artistCountMap);
    };

    fetchData();
  }, [id]);

  if (!id) {
    return <Text>Error: ID not found</Text>;
  }

  return (
    <>
      <Flex flexDir="column" marginLeft={sideMargins} marginRight={sideMargins}>
        <Center
          marginBottom={bottomMarginSection}
          marginTop={{ base: "20px", md: "40px" }}
        >
          <Box
            as="iframe"
            src={`https://open.spotify.com/embed/artist/${id}?utm_source=generator`}
            w={{ base: "100%", md: "60%" }}
            height="352"
            borderRadius={14}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </Center>
        <Heading marginBottom={bottomMarginHeading} fontSize="xl">
          Number of plays each year
        </Heading>
        <Center marginBottom={bottomMarginSection}></Center>
      </Flex>
    </>
  );
};
export default ArtistDetailPage;
