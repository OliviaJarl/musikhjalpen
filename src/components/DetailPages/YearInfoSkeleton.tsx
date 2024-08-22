import {
  Center,
  Image,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";


const YearInfoSkeleton = () => {
  const startColor = "#BBE5DC";
  const endColor = "#70C2B0";
  return (
    <Center
      marginTop={{ base: "20px", sm: "40px", lg: "70px" }}
      marginLeft={{ base: "0px", md: "40px", lg: "30px", xl: "100px" }}
      marginRight={{ base: "0px", md: "40px", lg: "30px", xl: "100px" }}
      marginBottom={{ base: "20px", sm: "40px", lg: "70px" }}
      gap={{ base: "5px", md: "30px" }}
      flexDir={{ base: "column", lg: "row" }}
    >
      <VStack
        w={{ base: "100%", md: "90%", lg: "800px", xl: "50%" }}
        alignItems="left"
        maxW={{ xl: "800px" }}
      >
        <Image
          alt={"Placeholder image"}
          src={"/placeholder.svg"}
          aspectRatio="768/581 auto"
        />
        <Skeleton startColor={startColor} endColor={endColor} w={{base: "100%", md: "60%"}}>
          <Text>Text about the image source</Text>
        </Skeleton>
      </VStack>
      <TableContainer whiteSpace="normal">
        <Table variant="unstyled">
          <Tbody fontSize="lg">
            <Tr>
              <Td
                colSpan={2}
                textAlign={{ base: "center", lg: "left" }}
                fontSize={{
                  base: "2xl",
                  sm: "3xl",
                  md: "4xl",
                  lg: "4xl",
                  xl: "5xl",
                }}
              >
                <Skeleton startColor={startColor} endColor={endColor} h="55px">
                  <Text>Musikhjälpen 20XX</Text>
                </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td
                colSpan={2}
                fontStyle="italic"
                textAlign={{ base: "center", md: "left" }}
              >
                <Skeleton startColor={startColor} endColor={endColor}>
                  <Text>
                    Text about the theme of the year which can be long
                  </Text>
                </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                City
              </Td>
              <Td>
                <Skeleton startColor={startColor} endColor={endColor}>
                  <Text>City name</Text>
                </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Hosts
              </Td>
              <Td>
                <Skeleton startColor={startColor} endColor={endColor}>
                  <Text>Aaaaaa bbbbbbb, ccccccc dddddd & eeeeee fffffff</Text>
                </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Traveling hosts
              </Td>
              <Td>
                <Skeleton startColor={startColor} endColor={endColor}>
                  <Text>Traveling host 1 name</Text>
                </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Period
              </Td>
              <Td>
                <Skeleton startColor={startColor} endColor={endColor}>
                  <Text>XX December to YY December</Text>
                </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Collected
              </Td>
              <Td>
                <Skeleton startColor={startColor} endColor={endColor}>
                  <Text>YY UUU XXX SEK</Text>
                </Skeleton>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};

export default YearInfoSkeleton;
