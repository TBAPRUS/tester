import {
  SET_TEST,
  CHANGE_QUESTION,
  SET_RESULT
} from '../../actions/test/main'

import {
  SELECT_ANSWER
} from '../../actions/test/question'

function test(state = {}, action) {
  switch (action.type) {
    case SET_TEST:
      return {...action.test, question: -1, select: -1, result: []}
    case CHANGE_QUESTION:
      return {...state, question: action.question}
    case SELECT_ANSWER:
      return {...state, questions: state.questions.map((question, index) => 
              action.id == index ? {...question, select: action.index} : question)
             }
    case SET_RESULT:
      return {...state, result: action.result}
    default:
      return state;
  }
}

export default test;