import React, { useRef } from 'react'
import { connect } from 'react-redux'

import Answer from './Answer'

import {
  changeTitle,
  changeImg,
  deleteQuestion,
  addAnswer
} from '../../actions/create/questions'

function Question({ dispatch, id, title, img, answers, correct }) {
  let imgRef = useRef(null);

  let showAnswers = answers.map((answer, index) => {
    return <Answer
      key={index}
      id={id}
      index={index}
      answer={answer}
      correct={correct} />
  });

  function hangleChangeTitle(e) {
    dispatch(changeTitle(id, e.target.value.slice(0, 200)));
  }

  function handleClickChangeImg() {
    imgRef.current.click();
  }

  function handleChangeImg(e) {
    const file = e.target.files[0];
    if(file && file.size / (1024 ** 2) < 3) {
      var reader = new FileReader(file);
      reader.onload = function (e) {
        dispatch(changeImg(id, e.target.result));
      }
      reader.readAsDataURL(file);
    } else {
      dispatch(sendError(3));
    }
  }

  return (
    <div className='question'>
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
        className='question'
        type='text'
        placeholder={`Вопрос #${id}`}
        value={title}
        autoComplete='off'
        onChange={hangleChangeTitle} />
      <button onClick={() => dispatch(deleteQuestion(id))}>
        Удалить вопрос
      </button>
      {answers.length <= 20 ? 
        <button onClick={() => dispatch(addAnswer(id))}>
          Добавить вариант ответа
        </button> :
        null}
      <div className='answers'>
        {showAnswers}
      </div>
    </div>
  )
}

export default connect()(Question)