import React from 'react'
import { Link } from 'react-router-dom'

function HeaderAddBooks(props) {
  return (
    <header className="headerAddBooks">
      <div id="heroAddBooks">
        <Link to={process.env.PUBLIC_URL + '/'} className="back">Back</Link>
        <p className="titleThree">add Books</p>
      </div>
    </header>
  )
}

export default HeaderAddBooks;