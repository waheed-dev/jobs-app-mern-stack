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
import {useStore} from "zustand";
import initialState from "../../store/store.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(true);
  const toast = useToast();
  const {isLoading,registerUser,token,user} = initialState()
  const handleLogin =  (e) => {
    e.preventDefault();
    if (!email | !password || (!alreadyRegistered && !name)) {
      return toast({
        title: "Please provide all values!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const currentUser = {name,password,email}
    console.log(currentUser,alreadyRegistered)
    if (alreadyRegistered) {
      console.log('already a member')
    } else {
       initialState.getState().registerUser(currentUser)
    }
  };

  function alreadyRegisteredHandler(e) {
    e.preventDefault();
    setAlreadyRegistered(!alreadyRegistered);
  }

  return (
    <VStack spacing={4}>
      {!alreadyRegistered && (
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
      {!alreadyRegistered ? (
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
      {!alreadyRegistered ? (
        <Button colorScheme="blue" onClick={handleLogin} isDisabled={isLoading}>
          Register
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={handleLogin} isDisabled={isLoading}>
          Login
        </Button>
      )}
    </VStack>
  );
};

export default Register;
