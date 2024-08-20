import { Center, Heading, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useData from "../state-management/useData";
import { bottomMarginSection, bottomMarginHeading } from "../constants";
import YearCard from "./YearCard";
import Collected from "./Collected";

const TopYears = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
  };

  const { yearData } = useData();

  if (!yearData || yearData.length === 0) {
    return (
      <>
        <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
          Top years
        </Heading>
        <Center height="300px">Loading...</Center>
      </>
    );
  }

  const sortedYears = [...yearData].sort((a, b) => b.collected - a.collected);

  return (
    <>
      <Heading fontSize="xl" marginBottom={bottomMarginHeading}>
        Top years
      </Heading>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={8}
        justifyContent="center"
        marginBottom={bottomMarginSection}
        as={motion.div}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {sortedYears.slice(0, 4).map((year, index) => (
          <YearCard data={year} key={index}>
            <Collected money={year.collected} />
          </YearCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default TopYears;
