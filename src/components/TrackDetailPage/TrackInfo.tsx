import {
  Button,
  Center,
  Image,
  Link,
  TableContainer,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { formatNames } from "../formatNames";

interface Props {
  data: TrackPlot;
}
const TrackInfo = ({ data }: Props) => {
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
        w={{ base: "100%", md: "90%", lg: "400px", xl: "30%" }}
        alignItems="left"
        maxW={{ xl: "800px" }}
      >
        <Image
          alt={"Thumbnail for the project "}
          src={data.album_images}
          aspectRatio="1/1 auto"
        />
        <Text>Image from Spotify's API</Text>
      </VStack>
      <TableContainer whiteSpace="normal">
        <Table variant="unstyled">
          <Tbody fontSize="lg">
            <Tr>
              <Td
                colSpan={2}
                textAlign={{ base: "center", md: "left" }}
                fontSize={{
                  base: "2xl",
                  sm: "3xl",
                  md: "4xl",
                  lg: "4xl",
                  xl: "5xl",
                }}
              >
                {data.name}
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Artists
              </Td>
              <Td>{formatNames(data.artists.map((artist) => artist.name))}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Album
              </Td>
              <Td>{data.album_name}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Played in total
              </Td>
              <Td>{data.count} times</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top" colSpan={2}>
                <Link href={data.external_url} isExternal>
                  <Button>Link to Spotify</Button>
                </Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};

export default TrackInfo;
