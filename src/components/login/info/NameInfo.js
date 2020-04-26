import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import {
  changeShowName
} from '../../../actions/login/register'

function NameInfo({ dispatch, name, problems }) {
  function onEnter() {
    dispatch(changeShowName(true));
  }

  function onLeave() {
    dispatch(changeShowName(false));
  }

  return (
    <Fragment>
      <div className='info' onMouseEnter={onEnter} onMouseLeave={onLeave} />
      {name ?
        <div className='problems'>
          {problems}
        </div> :
        null
      }
    </Fragment>
  )
}

function mapStateToProps(state) {
  const { name } = state.login.register.show
  return { name };
}

export default connect(mapStateToProps)(NameInfo);