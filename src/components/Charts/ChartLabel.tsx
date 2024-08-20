import { Flex, Image, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ChartLabelProps {
  data: TrackPlot | ArtistPlot | Host | City;
}

const ChartLabel = ({ data }: ChartLabelProps) => {
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="center"
      gap={3}
    >
      <VStack alignItems="flex-end" width="100%" textAlign="right">
        {isTrackPlot(data) && (
          <>
            <Link to={`/tracks/${data.id}`}>{data.name}</Link>
            <Link to={`/artists/${data.artists[0].id}`}>
              {data.artists[0].name}
            </Link>
          </>
        )}

        {isArtistPlot(data) && (
          <Link to={`/artists/${data.id}`}>{data.name}</Link>
        )}

        {isHostOrCity(data) && <Text>{data.name}</Text>}
      </VStack>

      {isTrackPlot(data) && (
        <Image
          src={data.album_images}
          alt={data.name}
          boxSize="50px"
          objectFit="cover"
          ml="auto"
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
