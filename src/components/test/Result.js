import React, { Fragment } from "react";
import { Link } from 'react-router-dom'

function Result({ result, title, img, questions }) {
  let right = 0;

  let showQuestions = questions.map((question, id) => (
    <div className='question' key={id}>
      <img src={question.img} />
      <h2>{question.title}</h2>
      <div className='answers'>
        {question.answers.map((answer, index) => (
          <p
            key={index}
            className={`answer ${result[id].correct == index ? right++ != 'a' && 'true' : question.select == index ? right-- != 'a' && 'false' : 'neutral'}`}>
            {answer.answer}
          </p>
        ))}
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className='questions'>
        <div className='question'>
          <img src={img} />
          <h1>{title}</h1>
        </div>
        {showQuestions}
        <p className='counttrue'>Правильно {right} из {questions.length}</p>
      </div>
      <Link to='/tests'>
        К списку тестов
      </Link>
    </Fragment>
  )
}

export default Result;