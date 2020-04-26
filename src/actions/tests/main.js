import fetch from 'cross-fetch'

import {
  changeLoad,
  sendError
} from '../main'

export const SET_TESTS = 'SET_TESTS'
export const ADD_TESTS = 'ADD_TESTS'
export const SET_LAST = 'SET_LAST'

export function setTests(tests) {
  return {
    type: SET_TESTS,
    tests
  }
}

export function addTests(tests) {
  return {
    type: ADD_TESTS,
    tests
  }
}

export function setLast(last) {
  return {
    type: SET_LAST,
    last
  }
}

export function fetchTests(page) {
  return dispatch => {
    dispatch(changeLoad(0));
    fetch(`/gettests/${page}`)
      .then((response) => response.json())
      .then((result) => {
        dispatch(changeLoad(0))
        if(!result.error) {
          dispatch(setTests(result.tests));
        } else {
          dispatch(sendError(result.error));
        }
    })
  }
}

export function fetchAddTests(page) {
  return dispatch => {
    dispatch(changeLoad(0));
    fetch(`/gettests/${page}`)
      .then((response) => response.json())
      .then((result) => {
        dispatch(changeLoad(0))
        if(!result.error) {
          if(result.last) {
            dispatch(setLast(true));
          }
          dispatch(addTests(result.tests));
        } else {
          dispatch(sendError(result.error));
        }
    })
  }
}