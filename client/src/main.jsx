import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {},
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <Box marginTop={"12px"} paddingX={"30px"}>
          <Navbar />
          <App />
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
