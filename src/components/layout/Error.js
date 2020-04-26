import React from 'react'
import { connect } from 'react-redux'

import { closeError } from '../../actions/main'

function CustomError({ error, dispatch }) {
  let text = ''

  if(error == -1) {
    text = 'Операция выполнена успешно'
  }

  if(error == 1) {
    text = 'Такой пользователь уже существует'
  }

  if(error == 2) {
    text = 'Введены неправильные данные'
  }

  if(error == 3) {
    text = 'Размер изображения не должен превышать 3 Мб'
  }

  if(error == 4) {
    text = 'Вы должны загрузить главное изображение'
  }

  if(error == 5) {
    text = 'Вы должны написать название теста'
  }

  if(error == 6) {
    text = 'Количество вопросов должно быть больше 4'
  }

  if(error == 7) {
    text = 'Вы должны написать каждый вопрос'
  }

  if(error == 8) {
    text = 'Вариантов ответа должно быть больше одного'
  }

  if(error == 9) {
    text = 'Вы должны указать правильные варианты ответа'
  }

  if(error == 10) {
    text = 'Вы должны указать правильные варианты ответа'
  }

  if(error == 11) {
    text = 'Что то пошло не так'
  }


  return (
    <div className='error'>
      <button onClick={() => dispatch(closeError())}>
        Закрыть
      </button>
      {error == -1 ?
        <h2>Успех</h2> :
        <h2>Ошибка</h2>
      }
      <p>{text}</p>
    </div>
  )
}

function mapStateToProps(state) {
  const { error } = state
  return { error };
}

export default connect(mapStateToProps)(CustomError);