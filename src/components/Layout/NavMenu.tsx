import { Flex, Text, Button, IconButton } from "@chakra-ui/react";
import { useState, CSSProperties } from "react";
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const [displayMenu, setDisplayMenu] =
    useState<CSSProperties["display"]>("none");

  return (
    <Flex justifyContent="space-between">
      <Flex display={{ base: "none", md: "flex" }} align={"center"}>
        <NavLink to="/years">
          <Text
            fontSize="xl"
            marginRight="40px"
            _hover={{
              fontWeight: "bold",
            }}
          >
            Years
          </Text>
        </NavLink>
        <NavLink to="/statistics">
          <Text
            fontSize="xl"
            _hover={{
              fontWeight: "bold",
            }}
          >
            Statistics
          </Text>
        </NavLink>
      </Flex>
      <IconButton
        bg="none"
        aria-label="Hamburger menu"
        fontSize={40}
        display={{ base: "flex", md: "none" }}
        icon={<IoMenu />}
        onClick={() => setDisplayMenu("flex")}
      />
      <Flex
        w="100vw"
        display={displayMenu}
        bg="black"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justifyContent="flex-end">
          <IconButton
            aria-label="Close-button"
            bg="none"
            marginTop="10px"
            marginRight="16px"
            fontSize={40}
            display={{ base: "flex", md: "none" }}
            icon={<IoClose />}
            onClick={() => setDisplayMenu("none")}
          />
        </Flex>
        <Flex flexDir="column" align="center">
          <Button
            bg="none"
            fontSize="xl"
            onClick={() => setDisplayMenu("none")}
          >
            Years
          </Button>
          <Button
            bg="none"
            fontSize="xl"
            onClick={() => setDisplayMenu("none")}
          >
            Statistics
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavMenu;
