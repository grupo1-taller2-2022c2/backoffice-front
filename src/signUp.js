import React, { useState } from "react";
import axios from "axios";
import { centered_style } from "./styles";
import { useNavigate } from "react-router-dom";
import { trySignUp } from "./Backend";
import {
  Box,
  Center,
  Button,
  FormLabel,
  Input,
  Text,
  Flex,
  Stack,
  Heading,
  FormControl,
} from "@chakra-ui/react";
export default function SignUpScreen() {
  const navigate = useNavigate();
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"#CFD8DC"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading alignItems={"center"} fontSize={"3xl"}>
              Administrator Sign Up
            </Heading>
            <Heading alignItems={"center"} fontSize={"2xl"}>
              Please enter your credentials
            </Heading>
          </Stack>
          <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl>
                <SignUpForm navigate={navigate} />
              </FormControl>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

function SignUpForm({ navigate }) {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordRepeat, onChangePasswordRepeat] = useState("");
  const [name, onChangeName] = useState("");
  const [surname, onChangeSurname] = useState("");

  async function handleSubmit(event, navigate) {
    if (password != passwordRepeat) {
      alert("Las contraseñas no coinciden");
      return;
    }
    event.preventDefault();
    try {
      let response = await trySignUp(email, password, name, surname);
      console.log("Got response at Admin Sign Up!");
      alert("Se ha creado una cuenta con exito!");
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("Did not get response at Admin Sign Up");
      console.log(error);
      if (error.response && error.response.status == 409) {
        alert("Ya existe un usuario con ese email!");
        return;
      }
      alert("No se pudo completar el registro");
    }
  }

  function handleEmailChange(event) {
    onChangeEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    onChangePassword(event.target.value);
  }

  function handlePasswordRepeatChange(event) {
    onChangePasswordRepeat(event.target.value);
  }

  function handleNameChange(event) {
    onChangeName(event.target.value);
  }

  function handleSurnameChange(event) {
    onChangeSurname(event.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, navigate);
      }}
    >
      <div style={centered_style}>
        <Input
          bg="white"
          type="text"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div style={centered_style}>
        <Input
          bg="white"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div style={centered_style}>
        <Input
          bg="white"
          placeholder="Repeat password"
          type="password"
          name="repeatPassword"
          value={passwordRepeat}
          onChange={handlePasswordRepeatChange}
        />
      </div>
      <div style={centered_style}>
        <Input
          bg="white"
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div style={centered_style}>
        <Input
          bg="white"
          placeholder="Surname"
          type="text"
          name="surname"
          value={surname}
          onChange={handleSurnameChange}
        />
      </div>
      <div style={centered_style}>
        <Button
          type="submit"
          style={{ marginTop: 15 }}
          width={"full"}
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}
