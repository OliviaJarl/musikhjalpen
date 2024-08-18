import { HStack, Text } from "@chakra-ui/react";

interface Props {
  index: number;
  track: string;
}

const WishedTrack = ({ index, track }: Props) => {
  return (
    <HStack alignItems="center" gap={4} justifyContent="flex-start" w="100%">
      <Text fontSize="2xl">{index + 1}</Text>
      <Text fontSize="xl">{track}</Text>
    </HStack>
  );
};

export default WishedTrack;
