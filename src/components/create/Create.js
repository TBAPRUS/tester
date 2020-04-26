import React, { useRef } from "react";
import { connect } from 'react-redux'

import Question from './Question'

import {
  changeTitle,
  changeImg
} from '../../actions/create/main'

import {
  addQuestion,
  fetchTest
} from '../../actions/create/questions'

import {
  sendError
} from '../../actions/main'

function Create({ dispatch, title, img, questions }) {
  const imgRef = useRef(null);

  const showQuestions = questions.map((question, index) => {
    const { title, img, answers, correct } = question
    return <Question
      key={index}
      id={index}
      title={title}
      img={img}
      answers={answers}
      correct={correct} />
  });

  function hangleChangeTitle(e) {
    dispatch(changeTitle(e.target.value.slice(0, 200)));
  }

  function handleClickChangeImg() {
    imgRef.current.click();
  }

  function handleChangeImg(e) {
    const file = e.target.files[0];
    if(file && file.size / (1024 ** 2) < 3) {
      const reader = new FileReader(file);
      reader.onload = function (e) {
        dispatch(changeImg(e.target.result));
      }
      reader.readAsDataURL(file);
    } else {
      dispatch(sendError(3));
    }
  }

  function handleAddQuestion() {
    dispatch(addQuestion());
  }

  function handleFetchTest() {
    if(img) {
      if(title) {
        if(questions.length > 4) {
          if(questions.filter((question) => !question.title).length == 0) {
            if(questions.filter((question) => question.answers.length < 2).length == 0) {
              if(questions.filter((question) => question.answers.filter((answer) => answer.length < 1).length != 0).length == 0) {
                if(questions.filter((question) => question.correct == -1).length == 0) {
                  dispatch(fetchTest(title, img, questions));
                } else {
                  dispatch(sendError(10));
                }
              } else {
                dispatch(sendError(9));
              }
            } else {
              dispatch(sendError(8));
            }
          } else {
            dispatch(sendError(7));
          }
        } else {
          dispatch(sendError(6));
        }
      } else {
        dispatch(sendError(5));
      }
    } else {
      dispatch(sendError(4));
    }
  }
  
  return (
    <div className='create'>
      <input 
        accept="image/*"
        className="img"
        style={{display: 'none'}}
        type="file"
        ref={imgRef}
        onChange={handleChangeImg} />
      <p onClick={handleClickChangeImg}>Выбрать изображение</p>
      <img style={{maxWidth: '80%'}} src={img} />
      <textarea
        className='title'
        type='text'
        name='test[title]'
        placeholder='Название'
        value={title}
        autoComplete='off'
        onChange={hangleChangeTitle} />
      <div className='questions'>
        {showQuestions}
      </div>
      {questions.length <= 50 ?
        <button onClick={handleAddQuestion}>
          Добавить вопрос
        </button> :
        null}
      <button onClick={handleFetchTest}>
        Готово
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  const { title, img, questions } = state.create
  return { title, img, questions };
}

export default connect(mapStateToProps)(Create);