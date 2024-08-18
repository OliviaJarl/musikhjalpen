import {
  Flex,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Props {
  data: MusikhjalpenYear;
  children: React.ReactNode;
}


const YearCard = ({ data, children }: Props) => {
  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <>
      <Link to={`/years/${data.id}`}>
        <Card
          borderRadius={10}
          overflow="hidden"
          direction={{ base: "row", md: "column" }}
          as={motion.div}
          whileHover={{ scale: 1.02 }}
          backgroundColor="#0C7760"
          variants={item}
        >
          <Flex flexDir={{ base: "row", md: "column" }}>
            <Image
              alt={"Thumbnail for the project "}
              src={data.image.src}
              aspectRatio="768/581 auto"
              objectFit="cover"
              w={{ base: "40%", md: "100%" }}
              overflow="hidden"
              h="full"
            />
            <CardBody w={{ base: "60%", md: "100%" }} p={4}>
              <Heading fontSize={{ base: "xs", sm: "md", md: "lg" }}>{data.year}</Heading>
              <Text
                marginTop={2}
                fontSize={{ base: "xs", sm: "md", md: "lg" }}
                fontStyle="italic"
                h={{ base: "60px", sm: "50%", md: "90px" }}
              >
                "{data.theme}"
              </Text>
              <HStack>
                {children}
              </HStack>
            </CardBody>
          </Flex>
        </Card>
      </Link>
    </>
  );
};

export default YearCard;
