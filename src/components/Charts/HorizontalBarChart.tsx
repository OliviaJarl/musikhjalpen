import { Box, Table, Tbody, Td, Tr, HStack } from "@chakra-ui/react";
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
    <Table variant="unstyled" size="md" width={{ base: "100%", md: "90%" }}>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.name}>
            <Td w={{ base: "20%" }} paddingLeft={0}>
              {children(item)}
            </Td>
            <Td paddingRight={0}>
              <HStack>
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
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default HorizontalBarChart;