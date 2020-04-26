import fetch from 'cross-fetch'

export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_ADMIN = 'RECEIVE_ADMIN'
export const LOGOUT_USER = 'LOGOUT_USER'
export const ERROR = 'ERROR'
export const CLOSE_ERROR = 'CLOSE_ERROR'
export const CHANGE_LOAD = 'CHANGE_LOAD'

export function receiveUser(user, admin) {
  return {
    type: RECEIVE_USER,
    user,
    admin
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}

export function fetchLogoutUser() {
  return dispatch => {
    dispatch(changeLoad(1))
    return fetch('/logout')
    .then((response) => response.json())
    .then((result) => {
      dispatch(changeLoad(0))
      if(!result.error) {
        dispatch(logoutUser());
      } else {
        dispatch(sendError(result.error));
      }
    })
  }
}

export function fetchUser() {
  return dispatch => {
    dispatch(changeLoad(1))
    return fetch('/getuser')
      .then((response) => response.json())
      .then((result) => {
        dispatch(changeLoad(0))
        if(!result.error) {
          dispatch(receiveUser(result.user, result.admin));
        } else {
          dispatch(sendError(result.error));
        }
      }); 
  }
}

export function sendError(error) {
  return {
    type: ERROR,
    error
  }
}

export function closeError() {
  return {
    type: CLOSE_ERROR
  }
}

export function changeLoad(load) {
  return {
    type: CHANGE_LOAD,
    load
  }
}