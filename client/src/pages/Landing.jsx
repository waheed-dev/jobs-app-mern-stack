import { Box } from "@chakra-ui/react";
import Hero from "../components/Hero.jsx";
import useTestStore from "../../store/store.js";

const Landing = () => {
  const test = useTestStore((state) => state.aim);
  return (
    <Box>
      {test.aim}
      <Hero />
    </Box>
  );
};

export default Landing;
