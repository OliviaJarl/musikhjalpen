import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Box, Center, Heading, Flex, Text } from "@chakra-ui/react";
import {
  bottomMarginSection,
  bottomMarginHeading,
  sideMargins,
} from "../constants";
import { fetchTrackData } from "../state-management/fetchAndProcessFunctions";
import VerticalBarChart from "../components/Charts/VerticalBarChart";

const ArtistDetailPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [artistCountPerYear, setArtistCountPerYear] = useState<PlotItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const years = Array.from({ length: 16 }, (_, index) =>
        (2008 + index).toString()
      );

      // Initialize array of PlotItem objects with year and count set to 0
      const artistCountArray: PlotItem[] = years.map((year) => ({
        year: year,
        count: 0,
      }));

      for (const year of years) {
        const tracks: Track[] = await fetchTrackData(year);

        for (const track of tracks) {
          for (const artist of track.artists) {
            if (id === artist.id) {
              const yearItem = artistCountArray.find(
                (item) => item.year === year
              );
              if (yearItem) {
                yearItem.count += 1;
              }
            }
          }
        }
      }

      setArtistCountPerYear(artistCountArray);
      setIsLoading(false);
    };

    if (id) {
      fetchData();
    }
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
        <Center h="400px">
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <VerticalBarChart data={artistCountPerYear} />
          )}
        </Center>
      </Flex>
    </>
  );
};
export default ArtistDetailPage;
