import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchLogoutUser } from '../../actions/main'

function Menu({ user, admin, dispatch }) {
  return (
    <header id='menu'>
      {user &&
        <React.Fragment>
          <Link className='link' to = "/tests">
            Тесты
          </Link>
          {admin ? 
          <Link className='link' to = "/create">
            Создать тест
          </Link> :
          null }
          <Link className='link' to = "/login" onClick={() => dispatch(fetchLogoutUser())}>
            Выйти
          </Link>
        </React.Fragment>
      }
    </header>
  )
}

function mapStateToProps(state) {
  const { user, admin } = state.user
  return { user, admin };
}

export default connect(mapStateToProps)(Menu);