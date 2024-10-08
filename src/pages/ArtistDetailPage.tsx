import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Box, Center, Heading, Flex, Text } from "@chakra-ui/react";
import {
  bottomMarginSection,
  bottomMarginHeading,
  sideMargins,
} from "../constants";
import { artistOccurence, fetchAndProcessArtistData, fetchTracksAllYears } from "../state-management/fetchAndProcessFunctions";
import VerticalBarChart from "../components/Charts/VerticalBarChart";
import Breadcrumb from "../components/Breadcrumb";
import Loading from "../components/Loading";

const ArtistDetailPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [artistCountPerYear, setArtistCountPerYear] = useState<PlotItem[]>([]);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [currentArtist, setCurrentArtist] = useState<ArtistPlot>();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const artistCountData = await fetchAndProcessArtistData(id);
        const tracks: Track[] = await fetchTracksAllYears();
        const artists = artistOccurence(tracks);

        setCurrentArtist (Array.from(artists.values()).find((artist) => artist.id === id))
        setArtistCountPerYear(artistCountData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLocalLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (!id) {
    console.log("ID not found");
  }

  return (
    <>
      {(isLocalLoading || !currentArtist) ? (
        <Loading />
      ) : (
        <Flex
          flexDir="column"
          marginLeft={sideMargins}
          marginRight={sideMargins}
        >
          <Breadcrumb lastPathName={currentArtist.name} />
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
          <Center marginBottom={bottomMarginSection} h="400px">
            <VerticalBarChart data={artistCountPerYear}>
              {(item) =>
                item.count > 0 ? (
                  <Text fontSize={{ base: "sm", lg: "md" }}>{item.count}</Text>
                ) : (
                  <Text></Text>
                )
              }
            </VerticalBarChart>
          </Center>
        </Flex>
      )}
    </>
  );
};
export default ArtistDetailPage;
