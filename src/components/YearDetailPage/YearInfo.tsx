import {
  Center,
  Image,
  TableContainer,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { hostsString } from "./hostsString";
import { dateString } from "./dateString";
import { travelingHostsString } from "./travelingHostsString";

const YearInfo = ({ data }: { data: MusikhjalpenYear }) => {
  return (
    <Center
      marginTop={{ base: "20px", sm: "40px", lg: "70px" }}
      marginLeft={{base: "20px", md: "40px", lg: "30px", xl: "100px"}}
      marginRight={{ base: "20px", md: "40px", lg: "30px", xl: "100px" }}
      marginBottom={{ base: "20px", sm: "40px", lg: "70px" }}
      gap={{ base: "5px", md: "30px" }}
      flexDir={{ base: "column", lg: "row" }}
    >
      <VStack w={{ base: "100%", md: "90%", lg: "800px", xl: "50%" }} alignItems="left" maxW={{xl: "800px"}}>
        <Image
          alt={"Thumbnail for the project "}
          src={data.image.src}
          aspectRatio="768/581 auto"
        />
        <Text>{data.image.copyright}</Text>
      </VStack>
      <TableContainer whiteSpace="normal" >
        <Table variant="unstyled">
          <Tbody fontSize="lg">
            <Tr>
              <Td
                colSpan={2}
                textAlign={{ base: "center", md: "left" }}
                fontSize={{base: "2xl", sm: "3xl", md: "4xl", lg: "4xl", xl: "5xl"}}
              >{`Musikhjälpen ${data.year}`}</Td>
            </Tr>
            <Tr>
              <Td colSpan={2} fontStyle="italic">
                {data.theme}
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                City
              </Td>
              <Td>{data.city}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Hosts
              </Td>
              <Td>{hostsString(data.hosts)}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Traveling hosts
              </Td>
              <Td>{travelingHostsString(data.travelling_hosts)}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Period
              </Td>
              <Td>{dateString(data.startdatetime, data.enddatetime)}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Collected
              </Td>
              <Td>{data.collected.toLocaleString("sv-SE")} SEK</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};

export default YearInfo;
