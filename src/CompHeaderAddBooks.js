import React from 'react'
import { Link } from 'react-router-dom'

function CompHeaderAddBooks(props) {
  return (
    <header className="headerAddBooks">
      <div id="heroAddBooks">
        <Link to="/" className="back">Back</Link>
        <p className="titleThree">add Books</p>
      </div>
    </header>
  )
}

export default CompHeaderAddBooks;