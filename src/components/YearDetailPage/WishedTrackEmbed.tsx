import { Box, HStack, Text } from "@chakra-ui/react";

interface Props {
  index: number;
  src: string;
}

const WishedTrack = ({ index, src }: Props) => {
  return (
    <HStack alignItems="center" gap={4} w="50%">
      <Text fontSize="3xl">{index}</Text>
      <Box
        as="iframe"
        src={src}
        width="100%"
        title="Spotify track"
        border="none"
        h="80px"
        borderRadius="16px"
      />
    </HStack>
  );
};

export default WishedTrack;
