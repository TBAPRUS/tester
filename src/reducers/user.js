import {
  RECEIVE_USER, 
  LOGOUT_USER 
} from '../actions/main'

function user(state = {
  user: false,
  admin: false,
  receive: false
}, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        user: false,
        admin: false,
        receive: true
      }
    case RECEIVE_USER:
      return {
        user: action.user,
        admin: action.admin,
        receive: true
      }
    default:
      return state;
  }
}

export default user;