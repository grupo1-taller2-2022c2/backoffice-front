import {USERS_EP, GATEWAY_URL} from './Constants'
import React, { useState } from "react";
import axios from "axios";
import { centered_style } from "./styles";
import { useNavigate } from "react-router-dom";
import { GetUserToken } from "./UserContext";
async function tryGetUsers(token) {
    var url = GATEWAY_URL + USERS_EP;
    return axios.get(url, {
        headers: { Authorization: "Bearer " + token },
      });
  }

function UsersList(list){
    const users = list.users

    return(<></>)
    /*return (<div>

        <li>{users[0].email}</li>
        <li>{users[1].email}</li>
        <li>{users[2].email}</li>
        <li>{users[3].email}</li>
        
    </div>)*/
}

export default function HomeScreen() {
    const token = GetUserToken()
    const [users, setUsers] = useState(false);
    async function handleListUsers() {
        try{
            let userToken = token.value
            let response = await tryGetUsers(userToken);
            console.log(response)
            setUsers(response.data)
        }
        catch(e){
            console.log(e)
        }
    }
    
    return (<div>
        <h1>Welcome to Home!</h1>
        <button onClick={handleListUsers}>List Users</button>
        <UsersList users={users} />
    </div>)
}