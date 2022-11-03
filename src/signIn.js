import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { centered_style } from "./styles";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "./UserContext";

async function trySignIn(email, password) {
  var url = process.env.REACT_APP_BACKEND_DIRECTION + "/token";
  var user_info = {
    username: email,
    password: password,
  };
  return axios.post(url, qs.stringify(user_info));
}

function SignInForm() {
  const navigate = useNavigate();
  const userToken = getUserToken();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  async function handleSubmit(event, navigate) {
    event.preventDefault();
    try {
      let response = await trySignIn(email, password);
      let token_data = response.data["access_token"];
      userToken.set(token_data);
    } catch (error) {
      console.log("Did not get response at Admin Sign In");
      console.log(error);
      alert("Please enter valid credentials");
      return;
    }

  }

  function handleEmailChange(event) {
    onChangeEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    onChangePassword(event.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, navigate);
      }}
    >
      <div style={centered_style}>
        <input
          placeholder="E-mail"
          type="text"
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
        <button type="submit">Sign in</button>
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
      <h1>FI-UBER v0.0.1 - User Administration</h1>
      <SignInForm />
      <div style={centered_style}>
        <p> Go to sign up</p>
        <button onClick={handleSignUpClick}>Sign up</button>
      </div>
    </>
  );
}
