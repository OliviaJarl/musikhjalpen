import {
  Button,
  Center,
  Image,
  TableContainer,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  Skeleton,
} from "@chakra-ui/react";

const TrackInfoSkeleton = () => {
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
        w={{ base: "100%", sm: "90%", md: "70%", lg: "400px", xl: "30%" }}
        alignItems="left"
        maxW={{ xl: "800px" }}
      >
        <Image
          alt={"Placeholder image "}
          src="/placeholder_square.svg"
          aspectRatio="1/1 auto"
        />
        <Skeleton startColor={startColor} endColor={endColor} w="80%">
          <Text fontStyle="italic">Image from Spotify's API</Text>
        </Skeleton>
      </VStack>
      <TableContainer whiteSpace="normal">
        <Table variant="unstyled">
          <Tbody fontSize="lg">
            <Tr>
              <Td
                colSpan={2}
                textAlign={{ base: "center", md: "left" }}
                fontSize={{
                  base: "lg",
                  sm: "xl",
                  md: "2xl",
                  lg: "2xl",
                  xl: "3xl",
                }}
              >
                <Skeleton startColor={startColor} endColor={endColor}>
                  <Text>Title of this </Text>
                </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Artists
              </Td>
              <Td>
                <Skeleton startColor={startColor} endColor={endColor}>
                  <Text>Artist 1, artist 2</Text>
                </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Album
              </Td>
              <Td>
              <Skeleton startColor={startColor} endColor={endColor}>
                    <Text>Album name</Text>
                  </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Played in total
              </Td>
                <Td>
                  <Skeleton startColor={startColor} endColor={endColor}>
                    <Text>XX times</Text>
                  </Skeleton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top" colSpan={2}>
                <Button>Listen at Spotify</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};

export default TrackInfoSkeleton;
