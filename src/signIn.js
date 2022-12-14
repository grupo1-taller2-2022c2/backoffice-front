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
  Text
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
      console.log("Logging in with email: " + email + " and password: " + password);
      let response = await trySignIn(email, password);
      let token_data = response.data["access_token"];
      context.userStatus.logIn(token_data);
      console.log(token_data)
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

  return (<form>
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
      <div style={centered_style}>
        <Button onClick={handleSubmit}>Sign in</Button>
      </div>
      </form>
  );
}

//FIXME should use callback hook
export default function LoginScreen() {
  const navigate = useNavigate();

  function handleSignUpClick() {
    navigate("/signup");
  }
  return (
    <>
      <Center marginTop={10}>
        <Text fontSize={20} fontWeight="bold" marginBottom={6}>
          FI-UBER Transport Service - User Administration
        </Text>
      </Center>
      <Center>
        <SignInForm />
      </Center>
      <Center marginTop={3}>
        <Button onClick={handleSignUpClick}>Sign up</Button>
      </Center>
    </>
  );
}
