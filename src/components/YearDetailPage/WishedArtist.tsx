import { HStack, Text } from "@chakra-ui/react";

interface Props {
  index: number;
  artist: string;
}

const WishedArtist = ({ index, artist }: Props) => {
  return (
    <HStack alignItems="center" gap={4} justifyContent="flex-start" w="100%">
      <Text fontSize="2xl">{index + 1}</Text>
      <Text fontSize="xl">{artist}</Text>
    </HStack>
  );
};

export default WishedArtist;
