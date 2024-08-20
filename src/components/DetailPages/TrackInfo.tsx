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
import { Link as RouterLink } from "react-router-dom";
import { Fragment } from "react"; // Import Fragment

interface Props {
  data: TrackPlot;
}

const TrackInfo = ({ data }: Props) => {
  const artistArray: { id: string; name: string }[] = [];
  data.artists.forEach((artist) =>
    artistArray.push({ id: artist.id, name: artist.name })
  );

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
                  base: "lg",
                  sm: "xl",
                  md: "2xl",
                  lg: "2xl",
                  xl: "3xl",
                }}
              >
                {data.name}
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Artists
              </Td>
              <Td>
                {data.artists.map((artist, index) => (
                  <Fragment key={artist.id}>
                    <RouterLink to={`/artists/${artist.id}`}>
                      {artist.name}
                    </RouterLink>
                    {index < data.artists.length - 1 && ", "}
                  </Fragment>
                ))}
              </Td>
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
