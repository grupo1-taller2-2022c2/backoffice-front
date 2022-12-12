import {
  USERS_EP,
  GATEWAY_URL,
  BLOCK_USER_EP,
  UNBLOCK_USER_EP,
  ACCESS_EP,
  METRICS_BLOCKED_EP
} from "./Constants";

import axios from "axios";

export async function tryGetUsers() {
  var url = GATEWAY_URL + USERS_EP;
  return axios.get(url);
}

export async function tryBlockUser(email) {
  var url = GATEWAY_URL + BLOCK_USER_EP + email;
  return axios.post(url);
}

export async function tryUnblockUser(email) {
  var url = GATEWAY_URL + UNBLOCK_USER_EP + email;
  return axios.post(url);
}

export async function trySignIn(email, password) {
  var url = GATEWAY_URL + ACCESS_EP;
  var user_info = {
    email: email,
    password: password,
  };
  return axios.post(url, user_info);
}

export function trySignUp(email, password, name, surname) {
  var url = GATEWAY_URL + "/admins/signup";
  console.log(url);
  var user_info = {
    email: email,
    password: password,
    username: name,
    surname: surname,
  };
  return axios.post(url, user_info);
}


export function tryGetAmountBlockedUsers(){
  return axios.get(GATEWAY_URL + METRICS_BLOCKED_EP)
}
  