import { Flex, Image, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ChartLabelProps {
  data: TrackPlot | ArtistPlot | Host | City;
}

const ChartLabel = ({ data }: ChartLabelProps) => {
  return (
    <Flex flexDirection="row" alignItems="center" gap={3}>
      {isTrackPlot(data) && (
        <VStack
          alignItems={{ base: "flex-start", md: "flex-end" }}
          width="100%"
          textAlign={{ base: "left", md: "right" }}
          order={{ base: 2, md: 1 }}
        >
          <Link to={`/tracks/${data.id}`}>{data.name}</Link>
          <Link to={`/artists/${data.artists[0].id}`}>
            {data.artists[0].name}
          </Link>
        </VStack>
      )}

      {isArtistPlot(data) && (
        <Flex ml={{md: "auto"}}>
          <Link to={`/artists/${data.id}`}>{data.name}</Link>
        </Flex>
      )}

      {isHostOrCity(data) && <Text ml={{md: "auto"}}>{data.name}</Text>}

      {isTrackPlot(data) && (
        <Image
          src={data.album_images}
          alt={data.name}
          boxSize="50px"
          objectFit="cover"
          ml="auto"
          order={{ base: 1, md: 2 }}
        />
      )}
    </Flex>
  );
};

// Type guards
function isTrackPlot(
  data: TrackPlot | ArtistPlot | Host | City
): data is TrackPlot {
  return "artists" in data && "album_images" in data;
}

function isArtistPlot(
  data: TrackPlot | ArtistPlot | Host | City
): data is ArtistPlot {
  return "external_url" in data && !("artists" in data);
}

function isHostOrCity(
  data: TrackPlot | ArtistPlot | Host | City
): data is Host | City {
  return !("external_url" in data) && !("artists" in data);
}

export default ChartLabel;

// <Link href={data.artists[0].external_urls.spotify} isExternal>
