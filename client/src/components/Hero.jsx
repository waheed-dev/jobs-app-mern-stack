import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
  Image,
} from "@chakra-ui/react";
import Register from "../pages/Register.jsx";


const Hero = () => {
  return (
      <Box textAlign="center" padding="40px">
        <Heading as="h1" size="2xl" mb="4">
            Welcome to Jobify
        </Heading>
        <Text fontSize="xl" mb="8">
            Track your job applications and manage your progress with ease
        </Text>
        <Flex justify="center" gap="4">
          <Register/>
        </Flex>

      </Box>
  );
};
export default Hero;
