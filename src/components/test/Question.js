import React, { Component } from "react";
import { connect } from 'react-redux'

import {
  selectAnswer
}from '../../actions/test/question'

function Question({ dispatch, id, title, img, answers, select, last, handleClick }) {
  answers = answers.map((answer, index) => (
    <button
      className={`answer ${select == index ? 'select' : 'notselect'}`}
      key={index}
      onClick={() => dispatch(selectAnswer(index, id))}>
      {answer.answer}
    </button>
  ));

  return (
    <div className='question'>
      <img src={img} />
      <h1>{title}</h1>
      <div className='answers'>
        {answers}
      </div>
      {select != -1 ?
        <button onClick={handleClick}>
          {last ? 'Показать результаты' : 'Следующий'}
        </button> :
        null}
    </div>
  )
}

export default connect()(Question);