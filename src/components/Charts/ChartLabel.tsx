import { Flex, Image, Link, VStack, Text } from "@chakra-ui/react";

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
            <Link href={data.external_url} isExternal>
              {data.name}
            </Link>
            <Link href={data.artists[0].external_urls.spotify} isExternal>
              {data.artists[0].name}
            </Link>
          </>
        )}

        {isArtistPlot(data) && (
          <Link href={data.external_url} isExternal>
            {data.name}
          </Link>
        )}

        {isHost(data) && <Text>{data.name}</Text>}
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

function isArtistPlot(data: TrackPlot | ArtistPlot | Host): data is ArtistPlot {
  return "external_url" in data && !("artists" in data);
}

function isHost(data: TrackPlot | ArtistPlot | Host): data is Host {
  return !("external_url" in data) && !("artists" in data);
}

export default ChartLabel;
