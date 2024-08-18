import { Flex, Image, Link, VStack } from "@chakra-ui/react";

interface Props {
  track: TrackPlot;
}

const TrackLabel = ({ track }: Props) => {
  return (
    <Flex
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="center"
      gap={3}
    >
      <VStack alignItems="flex-end" width="100%" textAlign="right"> 
        <Link href={track.track_url} isExternal >
          {track.name}
        </Link>
        <Link href={track.artists[0].external_urls.spotify} isExternal >
          {track.artists[0].name}
        </Link>
      </VStack>
      <Image
        src={track.album_images}
        alt={track.name}
        boxSize="50px"
        objectFit="cover"
        ml="auto"  
      />
    </Flex>
  );
};

export default TrackLabel;
