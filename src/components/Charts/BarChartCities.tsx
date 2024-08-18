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

interface City {
  name: string;
  count: number;
}

const BarChartCities = () => {
  const cityCountMap = new Map<string, number>();
  data.years.forEach((year: MusikhjalpenYear) => {
    const currentCity = year.city;
    if (cityCountMap.has(currentCity)) {
      cityCountMap.set(currentCity, cityCountMap.get(currentCity)! + 1);
    } else {
      cityCountMap.set(currentCity, 1);
    }
  });

  const citiesArray: City[] = Array.from(cityCountMap.entries()).map(
    ([name, count]) => ({
      name,
      count,
    })
  );

  const cities = citiesArray
    .sort((a, b) => b.count - a.count)
    .slice(0, citiesArray.length);

  const maxCount: number = Math.max(...cities.map((city) => city.count));

  return (
    <Table variant="unstyled" size="md" width="90%">
      <Tbody>
        {cities.map((city) => (
          <Tr key={city.name}>
            <Td w={{ base: "10%" }} paddingLeft={0}>
              <VStack alignItems="flex-end" width="100%" textAlign="right">
                <Text>{city.name}</Text>
              </VStack>
            </Td>
            <Td paddingRight={0}>
              <HStack>
                <Box
                  as={motion.div}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(city.count / maxCount) * 100}%`,
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
                  {city.count}
                </Box>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BarChartCities;
