export const SELECT_ANSWER = 'SELECT_ANSWER'

export function selectAnswer(index, id) {
  return {
    type: SELECT_ANSWER,
    index,
    id
  }
}