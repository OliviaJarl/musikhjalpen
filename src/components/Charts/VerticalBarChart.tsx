import { Box, HStack, Text, VStack } from "@chakra-ui/react";
//import { motion } from "framer-motion";

interface Props {
  data: PlotItem[];
}

const VerticalBarChart = ({ data }: Props) => {
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <HStack h="400px" gap={5} alignItems="flex-end" overflow="hidden">
      {data.map((item) => (
        <VStack key={item.name} h="100%" spacing={1} justifyContent="flex-end">
          {item.count > 0 ? <Text>{item.count}</Text> : <Text></Text>}
          <Box
            bg="#159E80"
            h={`${(item.count / maxCount) * 100}%`}
            w="20px"
            borderRadius="md"
          />
          <Text>{item.name}</Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default VerticalBarChart;
