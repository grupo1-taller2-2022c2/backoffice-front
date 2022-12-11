import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function GetUserContext() {
  return useContext(UserContext);
}

export function UserStatusProvider({ children }) {
  const token = "token";
  const isLoggedIn = "isLoggedIn";

  function parse(i){
    return JSON.parse(i)
  }

  //FIXME: maybe delete alert when token cant be deleted
  return (
    <UserContext.Provider
      value={{
        token: {
          value: parse(localStorage.getItem(token)),
        },
        userStatus: {
          isLoggedIn: parse(localStorage.getItem(isLoggedIn)),
          logIn: (newToken) => {
            localStorage.setItem(token, JSON.stringify(newToken));
            localStorage.setItem(isLoggedIn, JSON.stringify(true));
          },
          logOut: () => {
            localStorage.setItem(token, JSON.stringify(""));
            localStorage.setItem(isLoggedIn, JSON.stringify(false));
          },
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
