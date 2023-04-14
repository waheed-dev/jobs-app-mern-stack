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
import initialState from "../../store/store.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(true);
  const toast = useToast();
  const {isLoading,registerUser,token,user,showAlert,loginUser,alertText} = initialState()
  const navigate = useNavigate()
  useEffect(() => {
    if (showAlert === true && user) {
      toast({
        title : `${alertText}`,
        status : 'success',
        isClosable : true,
        duration : 3000
      })
        setTimeout(() => {
          navigate('/')
        },3000)
    }  else if (showAlert === false && !user) {
      toast({
        title : `${alertText}`,
        status : 'error',
        isClosable : true,
        duration : 3000
      })
    }
  },[showAlert,user,navigate])
  useEffect(() => {

  },[user,navigate])
  const handleLogin = async  (e) => {
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
    if (alreadyRegistered) {
      await loginUser(currentUser)
    } else {
       await registerUser(currentUser)
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
