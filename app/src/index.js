import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const centered_style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

class NameForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.username.value);
    console.log(event.target.password.value);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={centered_style}>
          E-mail:
          <input type="text" name="username" />
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
