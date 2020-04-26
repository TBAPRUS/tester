import fetch from 'cross-fetch'

import {
  changeLoad,
  sendError
} from '../main'

export const SET_TEST = 'SET_TEST'
export const CHANGE_QUESTION = 'CHANGE_QUESTION'
export const SET_RESULT = 'SET_RESULT'

export function setTest(test) {
  return {
    type: SET_TEST,
    test
  }
}

export function changeQuestion(question) {
  return {
    type: CHANGE_QUESTION,
    question
  }
}

export function setResult(result) {
  return {
    type: SET_RESULT,
    result
  }
}

export function fetchTest(id) {
  return dispatch => {
    dispatch(changeLoad(1));
    fetch(`/gettest/${id}`)
      .then((response) => response.json())
      .then((result) => {
        dispatch(changeLoad(0))
        if(!result.error) {
          dispatch(setTest({...result.test, questions: result.test.questions.map((question) => ({...question, select: -1}))}));
        } else {
          dispatch(sendError(result.error));
        }
    })
  }
}

export function fetchAnswer(index, id, answers) {
  return dispatch => {
    dispatch(changeLoad(1));
    return fetch('/answer',
      {method: 'POST',
      body: JSON.stringify({ answers }),
      headers:{'content-type': 'application/json'}})
      .then((response) => response.json())
      .then((result) => {
        dispatch(changeLoad(0))
        if(!result.error) {
          dispatch(setResult(result.result));
          dispatch(changeQuestion(index + 1));
        } else {
          dispatch(sendError(result.error));
        }
      })
  }
}