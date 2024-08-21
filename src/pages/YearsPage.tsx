import YearCard from "../components/YearCard";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { sideMargins } from "../constants";
import Loading from "../components/Loading";
import Location from "../components/Location";
import useData from "../state-management/useData";

const YearsPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const { yearData, isLoading } = useData();

  return (
    <Box
      marginLeft={sideMargins}
      marginRight={sideMargins}
      marginTop={{ base: "20px", md: "50px", lg: "70px" }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 4, xl: 5 }}
          spacing={8}
          justifyContent="center"
          as={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {yearData.map((year, index) => (
            <YearCard key={index} data={year}>
              <Location location={year.city} />
            </YearCard>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default YearsPage;
