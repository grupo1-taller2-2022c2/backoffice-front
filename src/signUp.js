import React, { useState } from "react";
import axios from "axios";
import { centered_style } from "./styles";
import { useNavigate } from "react-router-dom";
import { GATEWAY_URL } from "./Constants";

export default function SignUpScreen() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 style={centered_style}>Please enter your data for Sign Up</h1>
      <SignUpForm navigate={navigate} />
    </div>
  );
}

function trySignUp(email, password, name, surname) {
  var url = GATEWAY_URL + "/admins/signup";
  console.log(url);
  var user_info = {
    email: email,
    password: password,
    username: name,
    surname: surname,
  };
  return axios.post(url, user_info);
}

function SignUpForm({ navigate }) {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordRepeat, onChangePasswordRepeat] = useState("");
  const [name, onChangeName] = useState("");
  const [surname, onChangeSurname] = useState("");

  async function handleSubmit(event, navigate) {
    if (password != passwordRepeat){
      alert("You must enter matching passwords")
      return
    }
    event.preventDefault();
    try {
      let response = trySignUp(email, password, name, surname);
      console.log("Got response at Admin Sign Up!");
      alert("Successfully signed up!");
      navigate("/");
    } catch (error) {
      console.log("Did not get response at Admin Sign Up");
      console.log(error);
      alert("Could not sign up :(", "Please enter valid credentials");
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
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div style={centered_style}>
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div style={centered_style}>
        <input
          placeholder="Repeat password"
          type="password"
          name="repeatPassword"
          value={passwordRepeat}
          onChange={handlePasswordRepeatChange}
        />
      </div>
      <div style={centered_style}>
        <input
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div style={centered_style}>
        <input
          placeholder="Surname"
          type="text"
          name="surname"
          value={surname}
          onChange={handleSurnameChange}
        />
      </div>
      <div style={centered_style}>
        <button type="submit" style={{ marginTop: 15 }}>
          Sign up
        </button>
      </div>
    </form>
  );
}
