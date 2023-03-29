import { Box, Container } from "@chakra-ui/react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Dashboard,Error,Landing,Register} from './pages'
function App() {
  return (
    <Box>
      <Box mt={"4rem"} px={"2rem"}>
        <Routes>
          <Route path={"/"} element={<Dashboard/>} />
          <Route path={"/landing"} element={<Landing/>} />
          <Route path={"/register"} element={<Register/>} />
          <Route path={"*"} element={<Error/>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
