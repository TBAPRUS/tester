import {
  ADD_QUESTION,
  DELETE_QUESTION,
  CHANGE_QUESTION_TITLE,
  CHANGE_QUESTION_IMG,
  ADD_QUESTION_ANSWER,
  CHANGE_QUESTION_ANSWER,
  DELETE_QUESTION_ANSWER,
  SET_QUESTION_CORRECT
} from '../../actions/create/questions'

function questions(state = [], action) {
  switch (action.type) {
    case ADD_QUESTION:
      return [...state, {
        title: '',
        img: '',
        answers: [],
        correct: -1
      }];
    case CHANGE_QUESTION_TITLE:
      return state.map((result, index) => {
        if(index == action.id) {
          return {...result, title: action.title}
        }
        return result
      })
    case CHANGE_QUESTION_IMG:
      return state.map((result, index) => {
        if(index == action.id) {
          return {...result, img: action.img}
        }
        return result
      })
    case SET_QUESTION_CORRECT:
      return state.map((result, index) => {
        if(index == action.id) {
          return {...result, correct: action.index}
        }
        return result
      })
    case ADD_QUESTION_ANSWER:
      return state.map((result, index) => {
        if(index == action.id) {
          return {...result, answers: [...result.answers, '']}
        }
        return result
      })
    case CHANGE_QUESTION_ANSWER:
      return state.map((result, index) => {
        if(index == action.id) {
          return {...result, answers: result.answers.map((result, index) => {
            if(index == action.index) {
              return action.answer
            }
            return result
          })}
        }
        return result
      })
    case DELETE_QUESTION_ANSWER:
      return state.map((result, index) => {
        if(index == action.id) {
          return {...result, answers: result.answers.filter((result, index) => {
            return index != action.index
          })}
        }
        return result
      })
    case DELETE_QUESTION:
      return state.filter((result, index) => {
        return index != action.id
      })
    default:
      return state;
  }
}

export default questions;