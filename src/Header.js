import React from 'react'
import { Link } from 'react-router-dom'
import payaso from './assets/images/char.svg'
import bookmark from './assets/images/bmark.svg'

function Header(props) {
  return (
    <header>
      <div id="hero">
        <div className="char"><img src={payaso} alt="Hello"/></div>
        <div className="logo">
          <p className="titleOne">My</p>
          <p className="titleTwo">Reads</p>
        </div>
        <div className="mark">
          <Link to={process.env.PUBLIC_URL + '/addBooks'}>
            <img src={bookmark} alt="Add Books"/>
          </Link>
        </div>
      </div>
      <Link to={process.env.PUBLIC_URL + '/addBooks'} className="add">Add Books</Link>
    </header>
  )
}

export default Header;

