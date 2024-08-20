import { Box, HStack, Text, VStack } from "@chakra-ui/react";
//import { motion } from "framer-motion";
import { fetchTrackData } from "../../state-management/fetchAndProcessFunctions";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}

const VerticalBarChart = ({ id }: Props) => {
  const [data, setData] = useState<Map<string, number>>(new Map());
  useEffect(() => {
    const fetchData = async () => {
      const years = Array.from({ length: 16 }, (_, index) =>
        (2008 + index).toString()
      );
      const yearCountMap = new Map(
        Array.from({ length: years.length }, (_, index) => [
          (2008 + index).toString(),
          0,
        ])
      );
      for (const year of years) {
        const tracks: Track[] = await fetchTrackData(year);
        const count: number = tracks.filter((track) => track.id === id).length;
        yearCountMap.set(year, count);
      }
      setData(yearCountMap);
    };
    fetchData();
  });

  const maxCount = Math.max(...Array.from(data.values()));

  return (
    <HStack h="400px" gap={5} alignItems="flex-end" overflow="hidden">
      {Array.from(data.entries()).map(([name, count]) => (
        <VStack key={name} h="100%" spacing={1} justifyContent="flex-end">
          {count > 0 ? <Text>{count}</Text> : <Text></Text>}
          <Box
            bg="#159E80"
            h={`${(count / maxCount) * 100}%`}
            w="20px"
            borderRadius="md"
          />
          <Text>{name}</Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default VerticalBarChart;
