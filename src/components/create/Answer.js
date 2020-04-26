import React from 'react'
import { connect } from 'react-redux'

import {
  changeAnswer,
  deleteAnswer,
  setCorrect
} from '../../actions/create/questions'

function Answer({ dispatch, id, index, answer, correct }) {
  function hangleChangeAnswer(e) {
    dispatch(changeAnswer(index, id, e.target.value.slice(0, 200)));
  }

  function handleClickDelete() {
    dispatch(deleteAnswer(id, index));
    if(correct == index) {
      dispatch(setCorrect(id, -1))
    }
  }

  return (
    <div className='answer'>
      <textarea
        className={`answer${correct == index}`}
        type='text'
        placeholder={`#${index} ответ`}
        value={answer}
        autoComplete='off'
        onChange={hangleChangeAnswer} />
      <button onClick={handleClickDelete}>
        Удалить вариант ответа
      </button>
      {correct != index ?
        <button onClick={() => dispatch(setCorrect(id, index))}>
          Сделать этот вариант ответа верным
        </button> :
        null }
    </div>
  )
}

export default connect()(Answer)