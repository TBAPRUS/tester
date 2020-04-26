import React from 'react'
import { Link } from 'react-router-dom'

function Test({ test }) {
  const { img, title, id } = test;

  return (
    <div className='test'>
      <Link to={`/test/${id}`}>
        <img src={img} />
        <h2>
          {title}
        </h2>
      </Link>
    </div>
  )
}

export default Test