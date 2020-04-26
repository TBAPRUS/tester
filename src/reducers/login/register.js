import {
  CHANGE_REGISTER_NAME,
  CHANGE_REGISTER_PASSWORD,
  CHANGE_REGISTER_SHOW_NAME,
  CHANGE_REGISTER_SHOW_PASSWORD
} from '../../actions/login/register'

function register(state = {
  name: '',
  password: '',
  show: {
    name: false,
    password: false
  }
}, action) {
  switch (action.type) {
    case CHANGE_REGISTER_NAME:
      return {...state, name: action.name}
    case CHANGE_REGISTER_PASSWORD:
      return {...state, password: action.password}
    case CHANGE_REGISTER_SHOW_NAME:
      return {...state, show: {...state.show, name: action.show}}
    case CHANGE_REGISTER_SHOW_PASSWORD:
      return {...state, show: {...state.show, password: action.show}}
    default:
      return state;
  }
}

export default register;