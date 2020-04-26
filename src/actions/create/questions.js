import fetch from 'cross-fetch'

import { 
  changeLoad,
  sendError
} from '../main'

export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'
export const CHANGE_QUESTION_TITLE = 'CHANGE_QUESTION_TITLE'
export const CHANGE_QUESTION_IMG = 'CHANGE_QUESTION_IMG'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const CHANGE_QUESTION_ANSWER = 'CHANGE_QUESTION_ANSWER'
export const DELETE_QUESTION_ANSWER = 'DELETE_QUESTION_ANSWER'
export const SET_QUESTION_CORRECT = 'SET_QUESTION_CORRECT'

export function addQuestion() {
  return {
    type: ADD_QUESTION
  }
}

export function deleteQuestion(id) {
  return {
    type: DELETE_QUESTION,
    id
  }
}

export function changeTitle(id, title) {
  return {
    type: CHANGE_QUESTION_TITLE,
    id,
    title
  }
}

export function changeImg(id, img) {
  return {
    type: CHANGE_QUESTION_IMG,
    id,
    img
  }
}

export function addAnswer(id) {
  return {
    type: ADD_QUESTION_ANSWER,
    id
  }
}

export function changeAnswer(index, id, answer) {
  return {
    type: CHANGE_QUESTION_ANSWER,
    answer,
    id,
    index
  }
}

export function deleteAnswer(id, index) {
  return {
    type: DELETE_QUESTION_ANSWER,
    id,
    index
  }
}

export function setCorrect(id, index) {
  return {
    type: SET_QUESTION_CORRECT,
    id,
    index
  }
}

export function fetchTest(title, img, questions) {
  return dispatch => {
    dispatch(changeLoad(1))
    return fetch('/addtest',
      {method: 'POST',
      body: JSON.stringify({
        test: {
          title,
          img,
          questions
        }
      }),
      headers:{'content-type': 'application/json'}})
      .then((response) => response.json())
      .then((result) => {
        dispatch(changeLoad(0))
        if(!result.error) {
          dispatch(sendError(-1));
        } else {
          dispatch(sendError(result.error));
        }
      })
  }
}