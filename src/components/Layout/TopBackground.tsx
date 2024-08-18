import { Box } from "@chakra-ui/react";

const TopBackground = () => {
  return (
    <Box
      h={{
        base: "70vh",
        sm: "90vh",
        md: " 65vh",
        lg: "75vh",
        xl: "90vh",
        "2xl": "80vh",
      }}
      maxH={{
        base: "400px",
        sm: "500px",
        md: "400px",
        lg: "460px",
        xl: "550px",
        "2xl": "580px",
      }}
      minH={{
        base: "300px",
        sm: "400px",
        md: "350px",
        lg: "430px",
        xl: "500px",
        "2xl": "400px",
      }}
      w="100vw"
      position="absolute"
      top={0}
      left={0}
      zIndex={-2}
      overflow="hidden"
      lineHeight={0}
      backgroundImage="linear-gradient( #411917, #1D4B3D, #0E1D18)"
    />
  );
};

export default TopBackground;
