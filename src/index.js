import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import qs from "qs";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const centered_style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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

function trySignIn(email, password, setToken) {
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
      alert("Succesful Sign In!");
    })
    .catch((error) => {
      console.log("Did not get response at Admin Sign In");
      console.log(error);
      alert("Please enter valid credentials");
    });
}

function LoginForm () {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [token, setToken] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    trySignIn(email, password,setToken);
  }

  function handleEmailChange(event) {
    onChangeEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    onChangePassword(event.target.value);
  }
  
    return (
      <form onSubmit={handleSubmit}>
        <div style={centered_style}>
          E-mail:
          <input type="text" name="email" value={email} onChange={handleEmailChange} />
        </div>
        <div style={centered_style}>
          Password:
          <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <div style={centered_style}>
          <button type="submit">Sign in</button>
        </div>
      </form>
    );

}

root.render(
  <>
    <h1>FI-UBER v0.0.1 - User Administration</h1>
    <GetUsers />
    <LoginForm />
    <div style={centered_style}>
      <p> Not yet registered? Sign up now for free!</p>
      <button
        onClick={() => {
          alert("Not yet implemented :p");
        }}
      >
        Sign up
      </button>
    </div>
  </>
);
