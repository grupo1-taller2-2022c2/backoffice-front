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

    var url = 'https://fi-uber-test.free.beeceptor.com/users'
    var data = {email: event.target.email.value,
    password: event.target.password.value}

    fetch(url, { 
      method: "POST", 
      body: JSON.stringify(data), 
      headers: {
      'Content-Type': 'application/json'
    }})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error(error))
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


