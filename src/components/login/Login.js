import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  changeName,
  changePassword,
  fetchForm
} from '../../actions/login/login'

function Login({ dispatch, name, password }) {

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

  return (
    <div className='formIn'>
      <h1>Войти</h1>
      <Link to = "/register">
        Создать аккаунт
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
  const { name, password } = state.login.login;
  return { name, password }
}

export default connect(mapStateToProps)(Login)