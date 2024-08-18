import { Box } from "@chakra-ui/react";

interface Props {
  id: string;
  externalURL: string;
}
const PlaylistDisplay = ({ id, externalURL }: Props) => {
  return (
    <>
      <Box
        as="iframe"
        src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator`}
        w="100%"
        h={{ base: "450px", md: "550px", lg: "750px" }}
        borderRadius="14px"
        title="The playlist of all played songs during this year's edition of Musikhjälpen."
      />
    </>
  );
};

export default PlaylistDisplay;
