import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Props<T> {
  data: T[];
  children: (item: T) => React.ReactNode;
}

const VerticalBarChart = <T extends { year: string; count: number }>({
  data,
  children,
}: Props<T>) => {
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <HStack
      h="400px"
      gap={{ base: 3, sm: 3, md: 0 }}
      overflowX="auto"
      w="100%"
      justifyContent="center"
    >
      {data.map((item) => (
        <VStack
          key={item.year}
          h="100%"
          justifyContent="flex-end"
          alignItems="center"
          spacing={{ base: 2, md: 0 }}
        >
          {children(item)}
          <Box
            bg="#159E80"
            w={{ base: "10px", sm: "15px", md: "20px" }}
            borderRadius="md"
            as={motion.div}
            initial={{ height: 0 }}
            whileInView={{
              height: `${(item.count / maxCount) * 100}%`,
              transition: { duration: 1.5 },
            }}
            viewport={{ once: true }}
          />
          <Text
            transform={{ base: "rotate(-90deg)", md: "rotate(0deg)" }}
            marginTop={{ base: "20px", md: "4px" }}
            w={{
              base: "10px",
              sm: "15px",
              md: "42px",
              lg: "50px",
              xl: "60px",
            }}
            whiteSpace="nowrap"
            textAlign={{ base: "left", md: "center" }}
            fontSize={{ base: "sm", lg: "md" }}
          >
            {item.year}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default VerticalBarChart;
