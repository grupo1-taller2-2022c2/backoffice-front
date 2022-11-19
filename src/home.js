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
    return (<div>

        <li>{users[0].email}</li>
        <li>{users[1].email}</li>
        <li>{users[2].email}</li>
        <li>{users[3].email}</li>
        
    </div>)
}

export default function HomeScreen() {
    const token = GetUserToken()
    const [usersListed, setUsersListed] = useState(false);
    const [users, setUsers] = useState(false);
    async function handleListUsers() {
        if(usersListed){
            setUsersListed(false)
            return
        }
        setUsersListed(true)
        try{
            let userToken = token.value
            let response = await tryGetUsers(userToken);
            setUsers(response.data)
        }
        catch(e){
            console.log(e)
            setUsersListed(false)
        }
    }
    
    return (<div>
        <h1>Welcome to Home!</h1>
        <button onClick={handleListUsers}>List Users</button>
        {usersListed && <UsersList users={users} />}
    </div>)
}