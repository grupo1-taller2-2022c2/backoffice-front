import React, { useContext, useState } from "react";
//import * as SecureStore from "expo-secure-store";

const UserTokenContext = React.createContext();

export function GetUserToken() {
  return useContext(UserTokenContext);
}

export function UserStatusProvider({ children }) {
    const [userToken, setUserToken] = useState(null);

  //FIXME: maybe delete alert when token cant be deleted
  return (
      <UserTokenContext.Provider
        value={{
          value: userToken,
          set: function (value) {
            setUserToken(value)}
          }
        }
      >
        {children}
      </UserTokenContext.Provider>
  );
}
