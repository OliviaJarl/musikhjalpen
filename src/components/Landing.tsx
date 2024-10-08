import { Center, Text } from "@chakra-ui/react";
import CountUp from "react-countup";

const Landing = () => {
  return (
    <Center
      flexDir={"column"}
      marginTop={{ base: "20px", sm: "40px", lg: "100px" }}
      marginLeft={{ base: "5px", sm: "15px", lg: "110px" }}
      marginRight={{ base: "5px", sm: "15px", lg: "110px" }}
      marginBottom={{ base: "20px", sm: "40px", lg: "130px" }}
    >
      <Text fontSize={{ base: "5xl", md: "7xl" }} textAlign="center">
        <CountUp
          start={200}
          end={593.37}
          decimals={2}
          delay={0.3}
          duration={3}
          suffix=" MSEK"
          useEasing={true}
        />
      </Text>
      <Text
        fontSize="3xl"
        marginBottom={{ base: "10px", lg: "20px" }}
        textAlign="center"
      >
        has Musikhjälpen collected so far
      </Text>
      <Text fontSize="lg" textAlign="center">
        Musikhjälpen, under the slogan "Your music saves lives," involves the
        entire nation of Sweden in combating human disasters. Three hosts
        broadcast live for 144 hours from a glass cage, where they are visited
        by guests and performances by Swedish artists. The audience can request
        songs and donate money, participate in fundraisers, auctions, and
        competitions. Musikhjälpen unites people through music and engagement,
        aiming to support those fighting for the right to a dignified life.
      </Text>
    </Center>
  );
};

export default Landing;
