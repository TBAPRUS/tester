import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  changeName,
  changePassword,
  fetchForm
} from '../../actions/login/register'

import NameInfo from './info/NameInfo'
import PasswordInfo from './info/PasswordInfo'

function Register({ dispatch, name, password }) {
  function handleChangeName(e) {
    dispatch(changeName(e.target.value.slice(0, 24)));
  }

  function handleChangePassword(e) {
    dispatch(changePassword(e.target.value.slice(0, 24)));
  }

  function fetchData(e) {
    e.preventDefault();
    dispatch(fetchForm(name, password));
  }

  let nameState = 'false';

  if(/^[a-zA-Z]{4,24}$/.test(name)) {
    nameState = 'true'
  }

  let passwordState = 'false';

  if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/.test(password)) {
    passwordState = 'true'
  }

  let inputState = false;

  if(nameState[0] == 't' && nameState == passwordState) {
    inputState = true;
  }

  let nameProblems = [];

  if(/[^a-zA-Z]/gm.test(name)) {
    nameProblems.push(<span key='string'>Только латинские символы.</span>);
  }
  if(name.length < 4 || 23 < name.length) {
    nameProblems.push(<span key='length'>От 4 до 24 символов.</span>);
  }

  var passwordProblems = [];

  if(password.length < 6 || 23 < password.length) {
    passwordProblems.push(<span key='length'>От 6 до 24 символов.</span>);
  }
  if(!(/[\d]/gm.test(password))) {
    passwordProblems.push(<span key='number'>Минимум 1 цифра.</span>);
  }
  if(!(/[a-z]/gm.test(password))) {
    passwordProblems.push(<span key='down'>Минимум 1 строчная буква на латинице.</span>);
  }
  if(!(/[A-Z]/gm.test(password))) {
    passwordProblems.push(<span key='up'>Минимум 1 заглавная буква на латинице.</span>);
  }

  return (
    <div className='formIn'>
      <h1>Зарегистрироваться</h1>
      <Link to = '/login'>
        У меня уже есть аккаунт
      </Link>
      <form>
        <div className='inputbox'>
          <input
            className={nameState}
            type='text'
            name='user[name]'
            placeholder='Имя'
            value={name}
            autoComplete='off'
            onChange={handleChangeName} />
            {nameProblems.length > 0 ? <NameInfo problems={nameProblems} /> : null}
        </div>
        <div className='inputbox'>
          <input
            className={passwordState}
            type='password'
            name='user[pass]'
            placeholder='Пароль'
            value={password}
            autoComplete='off'
            onChange={handleChangePassword} />
            {passwordProblems.length > 0 ? <PasswordInfo problems={passwordProblems} /> : null}
        </div>
        <p>
          <input
            type='submit'
            value='Войти'
            className={inputState + 'Submit'}
            disabled={!inputState}
            onClick={fetchData} />
        </p>
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  const { name, password } = state.login.register;
  return { name, password }
}

export default connect(mapStateToProps)(Register)