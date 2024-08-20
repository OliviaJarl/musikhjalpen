import { HStack, Text } from "@chakra-ui/react";

interface Props {
  index: number;
  name: string;
}

const WishedItem = ({ index, name }: Props) => {
  return (
    <HStack alignItems="center" gap={4} justifyContent="flex-start" w="100%">
      <Text fontSize="2xl">{index + 1}</Text>
      <Text fontSize="xl">{name}</Text>
    </HStack>
  );
};

export default WishedItem;
