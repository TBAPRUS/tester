import { combineReducers } from 'redux'

import user from './user'
import login from './login'
import create from './create'
import tests from './tests'
import test from './test'

import {
  CHANGE_LOAD,
  ERROR,
  CLOSE_ERROR
} from '../actions/main'

function load(state = 0, action) {
  switch (action.type) {
    case CHANGE_LOAD:
      return action.load
    default:
      return state
  }
}

function error(state = 0, action) {
  switch (action.type) {
    case ERROR:
      return action.error
    case CLOSE_ERROR:
      return 0
    default:
      return state
  }
}

export default combineReducers({
  load,
  error,
  user,
  login,
  create,
  tests,
  test
});