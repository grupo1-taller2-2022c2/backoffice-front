import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function GetUserContext() {
  return useContext(UserContext);
}

export function UserStatusProvider({ children }) {
  const token = "token";
  const isLoggedIn = "isLoggedIn";
  const [localLoggedIn, setLocalLoggedIn] = useState(parse(localStorage.getItem(isLoggedIn)))
  const [atSignIn, setAtSignIn] = useState(false)

  function parse(i){
    return JSON.parse(i)
  }

  //FIXME: maybe delete alert when token cant be deleted
  return (
    <UserContext.Provider
      value={{
        token: {
          value: () => {
            return sessionStorage.getItem(token)}
        },
        atSignIn: {value: atSignIn, set: (v) => {setAtSignIn(v)}},
        userStatus: {
          isLoggedIn: localLoggedIn,
          logIn: (newToken) => {
            sessionStorage.setItem(token, JSON.stringify(newToken));
            localStorage.setItem(isLoggedIn, JSON.stringify(true));
            setLocalLoggedIn(true)
          },
          logOut: () => {
            sessionStorage.setItem(token, JSON.stringify(""));
            localStorage.setItem(isLoggedIn, JSON.stringify(false));
            setLocalLoggedIn(false)
          },
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
