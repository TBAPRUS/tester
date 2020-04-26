import {
  CHANGE_LOGIN_NAME,
  CHANGE_LOGIN_PASSWORD, 
} from '../../actions/login/login'

function login(state = {
  name: '',
  password: ''
}, action) {
  switch (action.type) {
    case CHANGE_LOGIN_NAME:
      return {...state, name: action.name}
    case CHANGE_LOGIN_PASSWORD:
      return {...state, password: action.password}
    default:
      return state;
  }
}

export default login;