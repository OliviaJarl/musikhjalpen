import {
  Box,
  Table,
  Tbody,
  Td,
  Tr,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import data from "../../../public/data/musikhjalpenYears.json";

interface Host {
  name: string;
  count: number;
}

const BarChartHosts = () => {
  const hostCountMap = new Map<string, number>();
  data.years.forEach((year: MusikhjalpenYear) => {
    year.hosts.forEach((host: string) => {
      if (hostCountMap.has(host)) {
        hostCountMap.set(host, hostCountMap.get(host)! + 1);
      } else {
        hostCountMap.set(host, 1);
      }
    });
  });

  const hostsArray: Host[] = Array.from(hostCountMap.entries()).map(
    ([name, count]) => ({
      name,
      count,
    })
  );

  const hosts = hostsArray.sort((a, b) => b.count - a.count).slice(0, 7);

  const maxCount: number = Math.max(...hosts.map((host) => host.count));

  return (
    <Table variant="unstyled" size="md" width="90%">
      <Tbody>
        {hosts.map((host) => (
          <Tr key={host.name}>
            <Td w={{ base: "10%" }} paddingLeft={0}>
              <VStack alignItems="flex-end" width="100%" textAlign="right">
                <Text>{host.name}</Text>
              </VStack>
            </Td>
            <Td paddingRight={0}>
              <HStack>
                <Box
                  as={motion.div}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(host.count / maxCount) * 100}%`,
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
                  {host.count}
                </Box>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BarChartHosts;
