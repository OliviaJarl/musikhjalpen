import { Icon, Text } from "@chakra-ui/react";
import { BsPinMap } from "react-icons/bs";
interface Props {location: string;}
    

const Location = ({location}: Props) => {
  return (
    <>
      <Icon as={BsPinMap} boxSize={{ base: 3, sm: 6 }} />
      <Text fontSize={{ base: "xs", sm: "md", md: "xl" }}>{location}</Text>
    </>
  );
};

export default Location;
