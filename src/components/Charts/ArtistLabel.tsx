import { Link, VStack } from "@chakra-ui/react";

interface Props {
  artist: ArtistPlot;
}

const ArtistLabel = ({ artist }: Props) => {
  return (
    <VStack alignItems="flex-end" width="100%" textAlign="right" >
      <Link href={artist.external_url} isExternal>
        {artist.name}
      </Link>
    </VStack>
  );
};

export default ArtistLabel;
