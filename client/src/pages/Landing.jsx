import { Box } from "@chakra-ui/react";
import Hero from "../components/Hero.jsx";
import useTestStore from "../../store/store.js";
import {Register} from "./index.jsx";

const Landing = () => {

  return (
    <Box>
      <Hero />
    </Box>
  );
};

export default Landing;
