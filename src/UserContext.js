import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function GetUserContext() {
  return useContext(UserContext);
}

export function UserStatusProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  //FIXME: maybe delete alert when token cant be deleted
  return (
    <UserContext.Provider
      value={{
        token: {
          value: userToken,
        },
        userStatus: {
          isLoggedIn: isLoggedIn,
          logIn: (token) => {
            setUserToken(token)
            setIsLoggedIn(true);
          },
          logOut: () => {
            setUserToken("");
            setIsLoggedIn(false)
          },
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
