import {
  USERS_EP,
  GATEWAY_URL,
  BLOCK_USER_EP,
  UNBLOCK_USER_EP,
  ACCESS_EP,
  METRICS_BLOCKED_EP,
  METRICS_LOGINS_EP,
  METRICS_REGISTRATIONS_EP
} from "./Constants";

import axios from "axios";

export async function tryGetUsers(token) {
  var url = GATEWAY_URL + USERS_EP;
  return axios.get(url, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function tryBlockUser(token, email) {
  var url = GATEWAY_URL + BLOCK_USER_EP + email;
  return axios.post(url, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function tryUnblockUser(token, email) {
  var url = GATEWAY_URL + UNBLOCK_USER_EP + email;
  return axios.post(url, {
    headers: { Authorization: "Bearer " + token },
  });
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

export function tryGetAmountBlockedUsers(token) {
  return axios.get(GATEWAY_URL + METRICS_BLOCKED_EP, {
    headers: { Authorization: "Bearer " + token },
  });
}

export function tryGetAmountLogins(token, method, date) {
  console.log(method)
  console.log(date)
  return axios.get(GATEWAY_URL + METRICS_LOGINS_EP, {
    params: {method: method, from_date:date},
    headers: { Authorization: "Bearer " + token },
  });
}



export function tryGetAmountRegisters(token, method, date) {
  return axios.get(GATEWAY_URL + METRICS_REGISTRATIONS_EP, {
    params: {method: method, from_date:date},
    headers: { Authorization: "Bearer " + token },
  });
}
