
import {
  SET_TESTS,
  ADD_TESTS,
  SET_LAST
} from '../../actions/tests/main'

function tests(state = {}, action) {
  switch (action.type) {
    case SET_TESTS:
      return {...state, tests: action.tests}
    case ADD_TESTS:
      return {...state, tests: [...state.tests, ...action.tests]}
    case SET_LAST:
      return {...state, last: action.last}
    default:
      return state;
  }
}

export default tests;