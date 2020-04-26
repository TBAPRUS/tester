import { combineReducers } from 'redux'

import questions from './questions'

import {
  CHANGE_TITLE,
  CHANGE_IMG
} from '../../actions/create/main'

function title(state = '', action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return action.title
    default:
      return state;
  }
}

function img(state = '', action) {
  switch (action.type) {
    case CHANGE_IMG:
      return action.img
    default:
      return state;
  }
}

export default combineReducers({
  title,
  img,
  questions
});