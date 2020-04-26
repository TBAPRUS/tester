import fetch from 'cross-fetch'

import { changeLoad } from '../main'

export const CHANGE_REGISTER_NAME = 'CHANGE_REGISTER_NAME'
export const CHANGE_REGISTER_PASSWORD = 'CHANGE_REGISTER_PASSWORD'
export const CHANGE_REGISTER_SHOW_NAME = 'CHANGE_REGISTER_SHOW_NAME'
export const CHANGE_REGISTER_SHOW_PASSWORD = 'CHANGE_REGISTER_SHOW_PASSWORD'

import {
  receiveUser,
  sendError
} from '../main'

export function changeName(name) {
  return {
    type: CHANGE_REGISTER_NAME,
    name
  }
}

export function changePassword(password) {
  return {
    type: CHANGE_REGISTER_PASSWORD,
    password
  }
}

export function fetchForm(name, password) {
  return dispatch => {
    dispatch(changeLoad(1))
    return fetch('/register',
      {method: 'POST',
      body: JSON.stringify({
        user: {
          name: name,
          pass: password
        }
      }),
      headers:{'content-type': 'application/json'}})
      .then((response) => response.json())
      .then((result) => {
        dispatch(changeLoad(0))
        if(!result.error) {
          dispatch(receiveUser(result.user, result.admin));
          dispatch(changeName(''));
          dispatch(changePassword(''));
        } else {
          dispatch(sendError(result.error));
        }
      })
  }
}

export function changeShowName(show) {
  return {
    type: CHANGE_REGISTER_SHOW_NAME,
    show
  }
}

export function changeShowPassword(show) {
  return {
    type: CHANGE_REGISTER_SHOW_PASSWORD,
    show
  }
}