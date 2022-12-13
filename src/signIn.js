import React, { useState, useContext, useEffect } from "react";
import { centered_style } from "./styles";
import { useNavigate } from "react-router-dom";
import { GetUserContext } from "./UserContext";
import { trySignIn } from "./Backend";

function SignInForm() {
  const navigate = useNavigate();
  const context = GetUserContext();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  useEffect(() => {
    context.atSignIn.set(true);
    context.userStatus.logOut()
  }, []);

  async function handleSubmit(event, navigate) {
    event.preventDefault();
    try {
      let response = await trySignIn(email, password);
      let token_data = response.data["access_token"];
      context.userStatus.logIn(token_data);
    } catch (error) {
      console.log("Did not get response at Admin Sign In");
      console.log(error);
      alert("Por favor ingrese datos validos");
      return;
    }
    navigate("../usuarios");
    context.atSignIn.set(false)
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
        context.atSignIn.set(false);
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
