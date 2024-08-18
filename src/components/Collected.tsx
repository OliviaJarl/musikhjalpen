import { Icon, Text } from "@chakra-ui/react";
import { TbMoneybag } from "react-icons/tb";

interface Props {
    money: number;
}

const Collected = ({money}: Props) => {
  return (
    <>
      <Icon as={TbMoneybag} boxSize={{ base: 3, sm: 6 }} />
      <Text fontSize={{ base: "xs", sm: "md", md: "xl" }}>
        {money.toLocaleString("sv-SE")} SEK
      </Text>
    </>
  );
};

export default Collected;
