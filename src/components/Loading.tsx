import { Center, Spinner } from "@chakra-ui/react";
const Loading = () => {
  return (
    <Center height={{ base: "800px", sm: "900px", md: "100px" }}>
      <Spinner />
    </Center>
  );
};

export default Loading;
