import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email | !password || (alreadyRegistered && !name)) {
      return toast({
        title: "Please provide all values!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // Your login logic goes here
    console.log(`Email: ${email}, Password: ${password}`);
    // Show a success message
    toast({
      title: "Logged in successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setEmail("");
    setPassword("");
  };

  function alreadyRegisteredHandler(e) {
    e.preventDefault();
    setAlreadyRegistered(!alreadyRegistered);
  }

  console.log(alreadyRegistered);
  return (
    <VStack spacing={4}>
      {alreadyRegistered && (
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
      )}
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      {alreadyRegistered ? (
        <Text>
          Already a member?{" "}
          <a
            href=""
            style={{ color: "blue" }}
            onClick={alreadyRegisteredHandler}
          >
            {" "}
            Login{" "}
          </a>
        </Text>
      ) : (
        <Text>
          Not a member yet?{" "}
          <a
            href=""
            style={{ color: "blue" }}
            onClick={alreadyRegisteredHandler}
          >
            {" "}
            Register{" "}
          </a>
        </Text>
      )}
      {alreadyRegistered ? (
        <Button colorScheme="blue" onClick={handleLogin}>
          Register
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      )}
    </VStack>
  );
};

export default Register;
