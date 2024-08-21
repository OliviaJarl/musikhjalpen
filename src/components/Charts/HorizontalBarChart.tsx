import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Props<T> {
  data: T[];
  children: (item: T) => React.ReactNode;
}

const HorizontalBarChart = <T extends { name: string; count: number }>({
  data,
  children,
}: Props<T>) => {
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <VStack width={{ base: "100%" }} alignItems="left">
      {data.map((item) => (
        <Flex
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 7 }}
          marginBottom={5}
          key={item.name}
        >
          <Box w={{ base: "100%", md: "25%", lg: "20%" }} paddingLeft={0}>
            {children(item)}
          </Box>
          <HStack paddingRight={0} w={{ base: "100%", md: "70%" }}>
            <Box
              as={motion.div}
              initial={{ width: 0 }}
              whileInView={{
                width: `${(item.count / maxCount) * 100}%`,
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
              {item.count}
            </Box>
          </HStack>
        </Flex>
      ))}
    </VStack>
  );
};

export default HorizontalBarChart;
