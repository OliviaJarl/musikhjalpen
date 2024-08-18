import { Box, Table, Tbody, Td, Tr, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ArtistLabel from "./ArtistLabel";

interface Props {
  data: ArtistPlot[];
}

const BarChartArtists = ({ data }: Props) => {
  const maxCount = Math.max(...data.map((artist) => artist.count));

  return (
    <Table variant="unstyled" size="md" width="90%">
      <Tbody>
        {data.map((artist) => (
          <Tr key={artist.name}>
            <Td w={{ base: "20%" }} paddingLeft={0}>
              <ArtistLabel artist={artist} />
            </Td>
            <Td paddingRight={0}>
              <HStack>
                <Box
                  as={motion.div}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(artist.count / maxCount) * 100}%`,
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
                  {artist.count}
                </Box>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BarChartArtists;
