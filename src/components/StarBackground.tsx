import { Box } from "@chakra-ui/react";
import Star from "./Star";
const StarBackground = () => {
  return (
    <Box w="100%" h="400px" zIndex={1} position="absolute" top={0} left={0}>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      
    </Box>
  );
};

export default StarBackground;
