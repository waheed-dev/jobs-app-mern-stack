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

const Hero = () => {
  return (
    <Flex mt={"6rem"} mx={"auto"} justifyContent={"center"} px={6}>
      <div>
        <Heading fontSize={"6xl"}>Job Tracking App</Heading>
        <Text my={6} fontSize={"lg"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          deleniti illum laborum modi nobis numquam recusandae repellat
          reprehenderit tempore veritatis.
        </Text>

        <Button
          p={4}
          bg="teal.300"
          _dark={{ bg: "teal.500" }}
          variant={"outlined"}
        >
          Login / Sign up
        </Button>
      </div>
    </Flex>
  );
};
export default Hero;
