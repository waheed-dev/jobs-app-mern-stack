import {
  Box,
  Button,
  Flex,
  Heading,
  Highlight,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex>
      <Box>
        <Heading lineHeight="tall">
          <Link to={"/"}>
            <Highlight
              query="jobify"
              styles={{ px: "4", py: "1", rounded: "full", bg: "teal.100" }}
            >
              Jobify
            </Highlight>
          </Link>
        </Heading>
      </Box>
      <Spacer />
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Navbar;
