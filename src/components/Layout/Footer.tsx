import { Center, Link, Text, VStack } from "@chakra-ui/react";

export function Footer() {
  return (
    <Center>
      <footer style={{ marginTop: "auto" }}>
        <VStack margin={{ base: "20px", md: "40px", lg: "60px" }}>
          <Text align="center">MHStats, 2024</Text>
          <Text align="center">
            Song lists from the{" "}
            <Link
              href="https://api.sr.se/api/documentation/v2/index.html"
              isExternal
            >
              SR-API
            </Link>{" "}
            and playlists made by using the{" "}
            <Link href="https://developer.spotify.com/" isExternal>
              Spotify-API
            </Link>{" "}
          </Text>
        </VStack>
      </footer>
    </Center>
  );
}
