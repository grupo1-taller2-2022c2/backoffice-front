import React, { useState, useContext, useEffect } from "react";
import { centered_style } from "./styles";
import { useNavigate } from "react-router-dom";
import { GetUserContext } from "./UserContext";
import { trySignIn } from "./Backend";
import {
  Box,
  Center,
  Button,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  Flex,
  Stack,
  Heading,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
function SignInForm() {
  const navigate = useNavigate();
  const context = GetUserContext();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  useEffect(() => {
    context.atSignIn.set(true);
    context.userStatus.logOut();
  }, []);

  async function handleSubmit() {
    try {
      console.log(
        "Logging in with email: " + email + " and password: " + password
      );
      let response = await trySignIn(email, password);
      let token_data = response.data["access_token"];
      context.userStatus.logIn(token_data);
      console.log(token_data);
    } catch (error) {
      console.log("Did not get response at Admin Sign In");
      console.log(error);
      alert("Por favor ingrese datos validos");
      return;
    }
    navigate("../usuarios");
    context.atSignIn.set(false);
  }

  function handleEmailChange(event) {
    onChangeEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    onChangePassword(event.target.value);
  }

  return (<>
    <form>
      <div style={centered_style}>
        <Input
          placeholder="E-mail"
          type="text"
          name="email"
          bg="white"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div style={centered_style}>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          bg="white"
          value={password}
          onChange={handlePasswordChange}
          marginBottom={5}
        />
      </div>
     
    </form>
     <div style={centered_style}>
     <Button
     width={"full"}
       onClick={handleSubmit}
       bg={"blue.400"}
       color={"white"}
       _hover={{
         bg: "blue.500",
       }}
     >
       Sign in
     </Button>
   </div></>
  );
}

//FIXME should use callback hook
export default function LoginScreen() {
  const navigate = useNavigate();

  function handleSignUpClick() {
    navigate("/signup");
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"#CFD8DC"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading alignItems={"center"} fontSize={"4xl"}>
            FI-UBER Transport Service
          </Heading>
          <Heading alignItems={"center"} fontSize={"3xl"}>
            User Administration
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl>
              <SignInForm />
            </FormControl>
            <Center marginTop={3}>
              <Button onClick={handleSignUpClick} width={"full"} bg="gray.300" >Sign up</Button>
            </Center>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}