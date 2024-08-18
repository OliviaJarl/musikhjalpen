import YearCard from "../components/YearCard";
import data from "../../public/data/musikhjalpenYears.json";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { sideMargins } from "../constants";
import Location from "../components/Location";

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

  const musikhjalpenArray: MusikhjalpenYear[] = data.years;

  return (
    <Box marginLeft={sideMargins} marginRight={sideMargins} marginTop={{base: "20px", md: "50px", lg: "70px"}}>
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
        {musikhjalpenArray.map((yearData, index) => (
          <YearCard key={index} data={yearData}>
            <Location location={yearData.city}/>
          </YearCard>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default YearsPage;
