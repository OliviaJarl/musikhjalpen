import {  Flex } from "@chakra-ui/react";
//import Logo from "/logo.svg";
import { NavLink } from "react-router-dom";
import NavMenu from "./NavMenu";
import { sideMargins } from "../../constants";
import Logo from "./Logo";

export function Header() {
  return (
    <header>
      <Flex
        justifyContent="space-between"
        marginTop={{ base: "10px", md: "15px" }}
        marginBottom={{ base: "10px", md: "15px" }}
        marginLeft={sideMargins}
        marginRight={{
          base: "15px",
          md: sideMargins["md"],
          lg: sideMargins["lg"],
        }}
      >
        <NavLink to="/">
        <Logo />
        </NavLink>
        <NavMenu />
      </Flex>
    </header>
  );
}
