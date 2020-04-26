import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import {
  changeShowPassword
} from '../../../actions/login/register'

function PasswordInfo({ dispatch, password, problems }) {
  function onEnter() {
    dispatch(changeShowPassword(true));
  }

  function onLeave() {
    dispatch(changeShowPassword(false));
  }

  return (
    <Fragment>
      <div className='info' onMouseEnter={onEnter} onMouseLeave={onLeave} />
      {password ?
        <div className='problems'>
          {problems}
        </div> :
        null
      }
    </Fragment>
  )
}

function mapStateToProps(state) {
  const { password } = state.login.register.show
  return { password };
}

export default connect(mapStateToProps)(PasswordInfo);