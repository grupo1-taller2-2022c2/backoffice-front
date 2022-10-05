import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const centered_style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

class GetUsers extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    var url = process.env.REACT_APP_BACKEND_DIRECTION + "/users/";
    console.log("variable:" +url)
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.text())
      .catch((error) => console.error(error))
      .then((response_text) =>
        alert(
          response_text
        )
      );
  };

  render() {
    return (
      <button onClick={this.handleSubmit}>
        <div style={centered_style}>
          Get Users
        </div>
      </button>
    );
  }
}

class NameForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    var url = process.env.REACT_APP_BACKEND_DIRECTION + "/users/signin";
    var data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.text())
      .catch((error) => console.error(error))
      .then((response_text) =>
        alert(
          "Response: " +
            response_text +
            "\nEmail: " +
            data.email +
            "\nPassword: " +
            data.password
        )
      );
      
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={centered_style}>
          E-mail:
          <input type="text" name="email" />
        </div>
        <div style={centered_style}>
          Password:
          <input type="password" name="password"></input>
        </div>
        <div style={centered_style}>
          <button type="submit">Sign in</button>
        </div>
      </form>
    );
  }
}

root.render(
  <>
    <h1>Welcome to FI-UBER v0.0.1</h1>
    <GetUsers/>
    <NameForm />
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
