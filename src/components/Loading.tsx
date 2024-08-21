import { Center, Spinner } from "@chakra-ui/react";
const Loading = () => {
  return (
    <Center height={{ base: "400px", md: "600px" }}>
      <Spinner />
    </Center>
  );
};

export default Loading;
