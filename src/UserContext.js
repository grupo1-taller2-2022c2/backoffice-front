import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function GetUserContext() {
  return useContext(UserContext);
}

export function UserStatusProvider({ children }) {
  const token = "token";
  const isLoggedIn = "isLoggedIn";
  const [localLoggedIn, setLocalLoggedIn] = useState(parse(sessionStorage.getItem(isLoggedIn)))
  const [atSignIn, setAtSignIn] = useState(true)

  function parse(i){
    return JSON.parse(i)
  }

  //FIXME: maybe delete alert when token cant be deleted
  return (
    <UserContext.Provider
      value={{
        /*token: {
          value: parse(sessionStorage.getItem(token)),
        },*/
        atSignIn: {value: atSignIn, set: (v) => {setAtSignIn(v)}},
        userStatus: {
          isLoggedIn: localLoggedIn,
          logIn: () => {
            //sessionStorage.setItem(token, JSON.stringify(newToken));
            sessionStorage.setItem(isLoggedIn, JSON.stringify(true));
            setLocalLoggedIn(true)
          },
          logOut: () => {
            //sessionStorage.setItem(token, JSON.stringify(""));
            sessionStorage.setItem(isLoggedIn, JSON.stringify(false));
            setLocalLoggedIn(false)
          },
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
