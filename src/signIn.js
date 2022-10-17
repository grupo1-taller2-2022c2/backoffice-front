import React, {useState} from "react";
import axios from "axios";
import qs from "qs";
import {centered_style} from './styles';
import {useNavigate} from 'react-router-dom';


function tryGetUsers() {
  var url = process.env.REACT_APP_BACKEND_DIRECTION + "/users/";
  console.log("variable:" + url);

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .catch((error) => console.error(error))
    .then((response_text) => alert(response_text));
}

//Not tested
function GetUsers() {
  return (
    <button onClick={tryGetUsers}>
      <div style={centered_style}>Get Users</div>
    </button>
  );
}

function trySignIn(email, password, setToken, navigate) {
  var url = process.env.REACT_APP_BACKEND_DIRECTION + "/token";
  var user_info = {
    username: email,
    password: password,
  };
  axios
    .post(url, qs.stringify(user_info))
    .then((response) => {
      let token_data = response.data["access_token"];
      setToken(token_data);
      console.log("Got response at Admin Sign In!");
      navigate("/home");
    })
    .catch((error) => {
      console.log("Did not get response at Admin Sign In");
      console.log(error);
      alert("Please enter valid credentials")
      return;
    })
}

function SignInForm({navigate}) {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [token, setToken] = useState("");

  function handleSubmit(event,navigate) {
    event.preventDefault();
    trySignIn(email, password, setToken, navigate)
  }

  function handleEmailChange(event) {
    onChangeEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    onChangePassword(event.target.value);
  }

  return (
    <form onSubmit={(e) => {handleSubmit(e,navigate)}}>
      <div style={centered_style}>
        E-mail:
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div style={centered_style}>
        Password:
        <input
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
  const navigate = useNavigate()

  function handleSignUpClick(){
    navigate('/signup')
  }
    return (<>
      <h1>FI-UBER v0.0.1 - User Administration</h1>
      <GetUsers />
      <SignInForm navigate={navigate} />
      <div style={centered_style}>
        <p> Not yet registered? Sign up now for free!</p>
        <button
          onClick={handleSignUpClick}
        >
          Sign up
        </button>
      </div>
    </>)
  }
  
