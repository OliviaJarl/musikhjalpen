import { Box, Table, Tbody, Td, Tr, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import TrackLabel from "./TrackLabel";

interface Props {
  data: TrackPlot[];
}

const BarChartTracks = ({ data }: Props) => {
  const maxCount = Math.max(...data.map((track) => track.count));

  

  return (
    <Table variant="unstyled" size="md" width={{ base: "100%", md: "90%" }}>
      <Tbody>
        {data.map((track) => (
          <Tr key={track.name}>
            <Td w={{ base: "20%" }} paddingLeft={0}>
              <TrackLabel track={track} />
            </Td>
            <Td paddingRight={0}>
              <HStack>
                <Box
                  as={motion.div}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(track.count / maxCount) * 100}%`,
                    transition: {
                      duration: 1,
                    },
                  }}
                  viewport={{ once: true }}
                  height="20px"
                  bg="#159E80"
                  borderRadius="md"
                />
                <Box as="span" ml={2}>
                  {track.count}
                </Box>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BarChartTracks;
