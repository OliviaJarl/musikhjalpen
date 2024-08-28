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
import { Fragment } from "react";

interface Props {
  data: Track | undefined;
  total: number;
}

const TrackInfo = ({ data, total }: Props) => {
  if (data === undefined) {
    return <Text>Track not found</Text>;
  }

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
          alt={"Album image"}
          src={data.album_images[0].url}
          aspectRatio="1/1 auto"
        />
        <Text fontStyle="italic">Image from Spotify's API</Text>
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
                lineHeight={{base: "25px", md: "30px", lg: "35px", xl: "40px"}}
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
                      <Text
                        _hover={{
                          textDecor: "underline",
                        }}
                      >
                        {artist.name}
                      </Text>
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
              <Td>
                <Link href={data.album_external_urls} isExternal>
                  {data.album_name}
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top">
                Played in total
              </Td>
              <Td>{total} times</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold" verticalAlign="top" colSpan={2}>
                <Link href={data.external_url} isExternal>
                  <Button>Listen at Spotify</Button>
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
