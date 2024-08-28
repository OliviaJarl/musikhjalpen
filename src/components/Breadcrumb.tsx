import { HStack, Icon } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

interface Props {
  lastPathName: string;
}

const Breadcrumb = ({ lastPathName }: Props) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const fullURL = location.pathname
    .split("/")
    .filter((x) => x)
    .join("/");

  return (
    <HStack fontSize={{base: "xs", sm: "sm", md: "md"}}>
      <Link to="/">Home</Link>
      <Icon as={FaChevronRight} h={3}></Icon>
      {pathnames.map((path, index) => {
        if (index !== pathnames.length - 1) {
          return (
            <>
              <Link to={`/${path}`}>
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
              <Icon as={FaChevronRight} h={3}></Icon>
            </>
          );
        }
      })}
      <Link to={`/${fullURL}`}>{lastPathName}</Link>
    </HStack>
  );
};

export default Breadcrumb;
